import { eq, inArray } from 'drizzle-orm';
import db from '../../../../../database/drizzle';
import { imageTable, productTable } from '../../../../../database/schema';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { convertAuctionImageQuery } from '$lib/server/utils';
import { DeleteObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Resource } from 'sst';
import { v4 as uuid } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const load: PageServerLoad = async ({ params }) => {
	const auctions = await db
		.select()
		.from(productTable)
		.leftJoin(imageTable, eq(imageTable.productId, productTable.id))
		.where(eq(productTable.id, params.id));

	if (auctions.length === 0) {
		return error(404, 'Auction not found');
	}

	const auction = convertAuctionImageQuery(auctions)[0];

	const updateAuctionSchema = createInsertSchema(productTable, {
		name: (schema) => schema.name.default(auction.product.name),
		description: (schema) => schema.description.default(auction.product.description),
		price: z.coerce.number().default(auction.product.price),
		startDate: z.string().default(auction.product.startDate.toISOString()),
		endDate: z.string().default(auction.product.endDate.toISOString())
	})
		.pick({
			name: true,
			description: true,
			price: true,
			startDate: true,
			endDate: true
		})
		.and(
			z.object({
				images: z
					.string()
					.array()
					.default(auction.images.map((entry) => entry.url)),
				newImages: z.instanceof(File).array(),
				startMinutes: z.string().time(),
				endMinutes: z.string().time()
			})
		);

	const form = await superValidate(zod(updateAuctionSchema));

	return {
		auction,
		form
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const updateAuctionSchema = createInsertSchema(productTable, {
			price: z.coerce.number(),
			startDate: z.string(),
			endDate: z.string()
		})
			.pick({
				name: true,
				description: true,
				price: true,
				startDate: true,
				endDate: true
			})
			.and(
				z.object({
					images: z.string().array(),
					newImages: z.instanceof(File).array(),
					startMinutes: z.string().time(),
					endMinutes: z.string().time()
				})
			);

		const form = await superValidate(request, zod(updateAuctionSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const {
			name,
			description,
			price,
			startDate,
			endDate,
			images,
			newImages,
			startMinutes,
			endMinutes
		} = form.data;

		const newStartDate = new Date(`${startDate}T${startMinutes}`);
		const newEndDate = new Date(`${endDate}T${endMinutes}`);

		await db
			.update(productTable)
			.set({
				name,
				description,
				price,
				startDate: newStartDate,
				endDate: newEndDate
			})
			.where(eq(productTable.id, params.id));

		// TODO: Remove old images and import new ones (images, newImages)
		const oldImages = await db.select().from(imageTable).where(eq(imageTable.productId, params.id));

		const client = new S3Client({});

		const IDsToDelete = [];

		for (const oldImage of oldImages) {
			if (!images.includes(oldImage.url)) {
				IDsToDelete.push({ Key: oldImage.id });
			}
		}

		if (IDsToDelete.length > 0) {
			const command = new DeleteObjectsCommand({
				Bucket: Resource.FileUploads.name,
				Delete: {
					Objects: IDsToDelete
				}
			});

			await client.send(command);
			await db.delete(imageTable).where(
				inArray(
					imageTable.id,
					IDsToDelete.map((entry) => entry.Key)
				)
			);
		}

		if (newImages.length > 0) {
			const newURLs = [];
			for (const image of newImages) {
				const imageId = uuid();

				const command = new PutObjectCommand({
					Key: imageId,
					Bucket: Resource.FileUploads.name
				});

				const url = await getSignedUrl(client, command);

				const res = await fetch(url, {
					body: image,
					method: 'PUT',
					headers: {
						'Content-Type': image.type,
						'Content-Disposition': `attachment; filename=${image.name}`
					}
				});

				const imageURL = res.url.split('?')[0];
				newURLs.push({ id: imageId, url: imageURL, productId: params.id });
			}

			await db.insert(imageTable).values(newURLs);
		}

		return redirect(302, '/admin');
	}
};
