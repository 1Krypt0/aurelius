import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/database/schema.ts',
	out: './drizzle',
	dialect: 'postgresql',
	migrations: {
		prefix: 'timestamp'
	},
	dbCredentials: {
		url: process.env.XATA_DATABASE_URL!
	}
});
