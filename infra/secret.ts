export const secret = {
	NeonUrl: new sst.Secret('NeonUrl'),
	StripeSecret: new sst.Secret('StripeSecret'),
	StripeWebhookSecret: new sst.Secret('StripeWebhookSecret')
};

export const allSecrets = Object.values(secret);
