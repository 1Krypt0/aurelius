import type { Actions, PageServerLoad } from './$types';

import { userTable } from '../../../database/schema';
import db from '../../../database/drizzle';
import { eq } from 'drizzle-orm';

import { createSelectSchema } from 'drizzle-zod';
import { zod } from 'sveltekit-superforms/adapters';
import { setError, superValidate } from 'sveltekit-superforms';

import { fail, redirect } from '@sveltejs/kit';
import { verify } from '@node-rs/argon2';
import { lucia } from '$lib/server/auth';

const loginSchema = createSelectSchema(userTable, {
	email: (schema) => schema.email.email()
}).pick({ email: true, password: true });

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(loginSchema));

	return { form };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form, invalid: true, message: 'Invalid Login data' });
		}

		const { email, password } = form.data;

		const user = await db.select().from(userTable).where(eq(userTable.email, email));

		// No user exists
		if (user.length === 0) {
			// TODO:  Compare against dummy password to protect against side-channels

			setError(form, 'password', 'Incorrect email or password');
			return setError(form, 'email', 'Incorrect email or password');
		}

		const validPassword = await verify(user[0].password, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		if (!validPassword) {
			return fail(400, { form, incorrect: true, message: 'Incorrect email or password' });
		}

		const session = await lucia.createSession(user[0].id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		return redirect(302, '/');
	}
};
