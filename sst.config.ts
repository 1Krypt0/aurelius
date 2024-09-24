/// <reference path="./.sst/platform/config.d.ts" />
import { readdirSync } from 'fs';

export default $config({
	app(input) {
		return {
			name: 'aurelius',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws'
		};
	},
	async run() {
		const outputs = {};

		for (const value of readdirSync('./infra/')) {
			const res = await import('./infra/' + value);
			if (res.outputs) Object.assign(outputs, res.outputs);
		}

		return outputs;
	}
});
