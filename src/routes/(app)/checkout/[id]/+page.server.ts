import type { PageServerLoad } from './$types';
import { Stripe } from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import db from '../../../../database/drizzle';
import { productTable } from '../../../../database/schema';
import { eq } from 'drizzle-orm';

const stripe = new Stripe(SECRET_STRIPE_KEY);

export const load: PageServerLoad = async ({ locals, params, url }) => {
	if (!locals.user) {
		return redirect(302, '/');
	}

	const products = await db.select().from(productTable).where(eq(productTable.id, params.id));

	if (products.length !== 1) {
		return redirect(302, '/');
	}

	const product = products[0];

	if (!product.sold || product.userId !== locals.user.id) {
		return redirect(302, '/');
	}

	console.log('Price', product.price);

	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					currency: 'eur',
					unit_amount: product.price * 100,
					product_data: {
						name: product.name
					}
				},
				quantity: 1
			}
		],
		mode: 'payment',
		success_url: `${url.origin}/checkout/complete?success=true`,
		cancel_url: `${url.origin}/checkout/complete?canceled=true`
	});

	if (session && session.url) {
		return redirect(303, session.url);
	}

	console.log('Error creating session');
};
