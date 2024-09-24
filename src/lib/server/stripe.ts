import { Resource } from 'sst';
import Stripe from 'stripe';

const stripe = new Stripe(Resource.StripeSecret.value, {
	apiVersion: '2024-06-20'
});

export default stripe;
