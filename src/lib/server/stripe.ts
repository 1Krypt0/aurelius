import { SECRET_STRIPE_KEY } from '$env/static/private';
import Stripe from 'stripe';

const stripe = new Stripe(SECRET_STRIPE_KEY, {
	apiVersion: '2024-06-20'
});

export default stripe;
