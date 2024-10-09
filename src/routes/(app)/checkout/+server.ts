import type { RequestHandler } from './$types';
import stripe from '$lib/server/stripe';
import { Resource } from 'sst';
import { auctionService } from '$lib/server/auctions';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.text();
		const signature = request.headers.get('stripe-signature') as string;

		const event = stripe.webhooks.constructEvent(
			body,
			signature,
			Resource.StripeWebhookSecret.value
		);

		const data = event.data;
		const eventType = event.type;
		const productId = data.object.metadata.product_id;

		console.log('product_id');
		console.log(productId);

		switch (eventType) {
			case 'checkout.session.completed':
				// NOTE: The system should first respond with 200 and then do the business logic
				console.log('DATA');
				console.log(data);

				await auctionService.update(productId, {
					paid: true
				});
				break;

			default:
				break;
		}
	} catch (err) {
		return new Response(err.message, { status: 400 });
	}

	return new Response('Success!', { status: 200 });
};
