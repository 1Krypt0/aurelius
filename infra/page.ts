import { bucket } from './storage';
import { secret } from './secret';

const page = new sst.aws.SvelteKit('Aurelius', {
	link: [bucket, secret.NeonUrl, secret.StripeSecret, secret.StripeWebhookSecret],
	buildCommand: 'bun run build',
	dev: {
		command: 'bun run dev'
	},
	server: {
		install: ['@node-rs/argon2']
	}
});

const auctionTracker = new sst.aws.Cron('AuctionTracker', {
	schedule: 'cron(0/15 * * * ? *)',
	job: {
		handler: './src/cron/auction.handler',
		link: [secret.NeonUrl]
	}
});

export const outputs = {
	page,
	auctionTracker
};
