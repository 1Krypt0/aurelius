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
		const bucket = new sst.aws.Bucket('Uploads', {
			public: true
		});
		new sst.aws.SvelteKit('Aurelius', {
			link: [bucket],
			environment: {
				NEON_DATABASE_URL: process.env.NEON_DATABASE_URL!
			}
		});
	}
});
