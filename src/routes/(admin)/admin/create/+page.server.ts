import { createInsertSchema } from 'drizzle-zod';
import type { Actions, PageServerLoad } from './$types';
import { imageTable, productTable } from '../../../../database/schema';
import { z } from 'zod';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { generateIdFromEntropySize } from 'lucia';
import db from '../../../../database/drizzle';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Resource } from 'sst';
import { v4 as uuid } from 'uuid';
//
// NOTE: Maybe update the limit if not enough for good quality images
const IMAGE_SIZE_LIMIT = 6_000_000;

const createAuctionSchema = createInsertSchema(productTable, {
	startDate: z.string(),
	endDate: z.string(),
	price: z.coerce.number()
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
				.instanceof(File, { message: 'Please upload the auction images' })
				.refine((f) => f.size < IMAGE_SIZE_LIMIT, 'Max 6 MX upload size')
				.array(),
			startMinutes: z.string().time(),
			endMinutes: z.string().time()
		})
	);

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(createAuctionSchema));

	return {
		form
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(createAuctionSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { name, description, price, startDate, endDate, images, startMinutes, endMinutes } =
			form.data;

		const id = generateIdFromEntropySize(20);

		const alreadyExists = await db
			.select({ name: productTable.name })
			.from(productTable)
			.where(eq(productTable.name, name));

		if (alreadyExists.length !== 0) {
			return setError(form, 'name', 'Name already in use');
		}

		await db.insert(productTable).values({
			id,
			name,
			description,
			price,
			startDate: new Date(`${startDate}T${startMinutes}`),
			endDate: new Date(`${endDate}T${endMinutes}`)
		});

		const imageURLs = [];

		for (const image of images) {
			const command = new PutObjectCommand({
				Key: uuid(),
				Bucket: Resource.FileUploads.name
			});

			const url = await getSignedUrl(new S3Client({}), command);

			const res = await fetch(url, {
				body: image,
				method: 'PUT',
				headers: {
					'Content-Type': image.type,
					'Content-Disposition': `attachment; filename=${image.name}`
				}
			});

			// TODO: Add error handling for when images fail
			const imageURL = res.url.split('?')[0];

			imageURLs.push(imageURL);
		}

		const associatedProduct = imageURLs.map((entry) => {
			return {
				url: entry,
				productId: id
			};
		});

		await db.insert(imageTable).values(associatedProduct);

		return redirect(302, '/admin');
	}
};
