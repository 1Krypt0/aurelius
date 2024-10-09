import { bidTable } from '../../../../database/schema';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { createInsertSchema } from 'drizzle-zod';
import { setError, superValidate, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { auctionService } from '$lib/server/auctions';
import { bidService } from '$lib/server/bids';

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
	const auction = await auctionService.getOneById(params.id);

	if (auction === null) {
		return error(404, 'Auction not found');
	}

	const bids = await bidService.getBidsByProductId(params.id);

	const form = await superValidate(zod(bidSchema));

	return {
		auction,
		user: locals.user,
		bids,
		form,
		priceIncrease: getPriceIncrease(auction.product.price)
	};
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		if (!locals.user) {
			return redirect(302, '/');
		}
		const form = await superValidate(request, zod(bidSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const previousBids = await bidService.getBidsByProductId(params.id);

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
			await bidService.create({
				value,
				userId: locals.user.id,
				productId: params.id
			});

			await auctionService.update(params.id, { price: value });
		}

		return { form };
	}
};
