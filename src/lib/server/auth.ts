import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import db from '../../database/drizzle';
import { Lucia, TimeSpan } from 'lucia';
import { dev } from '$app/environment';
import { sessionTable, userTable } from '../../database/schema';

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
	sessionExpiresIn: new TimeSpan(2, 'w'),
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes(databaseUserAttributes) {
		return {
			name: databaseUserAttributes.name,
			isAdmin: databaseUserAttributes.isAdmin
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	name: string;
	isAdmin: boolean;
}
