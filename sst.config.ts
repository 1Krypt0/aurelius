/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
	app(input) {
		return {
			name: 'aurelius',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws'
		};
	},
	async run() {
		const bucket = new sst.aws.Bucket('FileUploads', {
			access: 'public'
		});

		const secret = new sst.Secret('NeonUrl');

		new sst.aws.Cron('AuctionTracker', {
			schedule: 'cron(0/15 * * * ? *)',
			job: {
				handler: './src/cron/auction.handler',
				link: [secret]
			}
		});

		new sst.aws.SvelteKit('Aurelius', {
			link: [bucket, secret],
			buildCommand: 'bun run build',
			dev: {
				command: 'bun run dev'
			},
			server: {
				install: ['@node-rs/argon2']
			}
		});
	}
});
