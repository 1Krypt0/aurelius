import { desc, eq } from 'drizzle-orm';
import db from '../../../../database/drizzle';
import { bidTable, productTable } from '../../../../database/schema';
import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { createInsertSchema } from 'drizzle-zod';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const bidSchema = createInsertSchema(bidTable, {
	value: z.number({ invalid_type_error: 'Amount must be a number' }).nonnegative()
}).pick({
	value: true
});

export const load: PageServerLoad = async ({ params, locals }) => {
	const auction = await db.select().from(productTable).where(eq(productTable.id, params.id));

	if (auction.length === 0) {
		return error(404, 'Auction not found');
	}

	const bids = await db.select().from(bidTable).where(eq(bidTable.productId, params.id));

	const form = await superValidate(zod(bidSchema));

	return {
		auction: auction.at(0),
		user: locals.user,
		bids,
		form
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
