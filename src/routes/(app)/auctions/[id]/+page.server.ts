import { desc, eq } from 'drizzle-orm';
import db from '../../../../database/drizzle';
import { bidTable, imageTable, productTable } from '../../../../database/schema';
import type { Actions, PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { createInsertSchema } from 'drizzle-zod';
import { setError, superValidate, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { convertAuctionImageQuery } from '$lib/server/utils';

const bidSchema = createInsertSchema(bidTable, {
	value: z
		.number({ invalid_type_error: 'Amount must be a number' })
		.int({ message: 'Amount must not contain cents' })
		.nonnegative()
		.finite()
}).pick({
	value: true
});

const getPriceIncrease = (price: number): number => {
	return Math.round((price * 1.1 + Number.EPSILON) * 100) / 100;
};

export const load: PageServerLoad = async ({ params, locals }) => {
	const auction = await db
		.select()
		.from(productTable)
		.leftJoin(imageTable, eq(imageTable.productId, productTable.id))
		.where(eq(productTable.id, params.id));

	const res = convertAuctionImageQuery(auction);

	if (auction.length === 0) {
		return error(404, 'Auction not found');
	}

	const bids = await db.select().from(bidTable).where(eq(bidTable.productId, params.id));

	const form = await superValidate(zod(bidSchema));

	return {
		auction: res[0],
		user: locals.user,
		bids,
		form,
		priceIncrease: getPriceIncrease(res[0].product.price)
	};
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const form = await superValidate(request, zod(bidSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		// A redundant check but should be ok
		const previousBids = await db
			.select()
			.from(bidTable)
			.where(eq(bidTable.productId, params.id))
			.orderBy(desc(bidTable.value))
			.limit(1);

		let previousValue;

		if (previousBids.length === 0) {
			previousValue = 0;
		} else {
			previousValue = previousBids[0].value;
		}

		const { value } = form.data;

		if (value <= previousValue) {
			return setError(
				form,
				'value',
				`Value must be higher than the ${previousValue === 0 ? 'starting price' : 'previously highest bid'}`
			);
		} else if (value <= getPriceIncrease(previousValue)) {
			return setError(form, 'value', 'Value must be higher than the minimum required increase');
		} else {
			await db.insert(bidTable).values({
				value: value,
				userId: locals.user?.id,
				productId: params.id
			});

			await db.update(productTable).set({ price: value }).where(eq(productTable.id, params.id));
		}

		return { form };
	}
};
