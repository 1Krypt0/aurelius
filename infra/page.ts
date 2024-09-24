import { bucket } from './storage';
import { secret } from './secret';

export const page = new sst.aws.SvelteKit('Aurelius', {
	link: [bucket, secret.NeonUrl, secret.StripeSecret, secret.StripeWebhookSecret],
	buildCommand: 'bun run build',
	dev: {
		command: 'bun run dev'
	},
	server: {
		install: ['@node-rs/argon2']
	}
});
