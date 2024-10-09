import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import stripe from '$lib/server/stripe';
import { auctionService } from '$lib/server/auctions';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	if (!locals.user) {
		return redirect(302, '/');
	}

	const product = await auctionService.getOneById(params.id);

	if (product == null) {
		return redirect(302, '/');
	}

	if (!product.product.sold || product.product.userId !== locals.user.id) {
		return redirect(302, '/');
	}

	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					currency: 'eur',
					unit_amount: product.product.price * 100,
					product_data: {
						name: product.product.name
					}
				},
				quantity: 1
			}
		],
		metadata: {
			product_id: product.product.id
		},
		mode: 'payment',
		success_url: `${url.origin}/checkout/complete?success=true`,
		cancel_url: `${url.origin}/checkout/complete?canceled=true`
	});

	if (session && session.url) {
		return redirect(303, session.url);
	}

	console.log('Error creating session');
};
