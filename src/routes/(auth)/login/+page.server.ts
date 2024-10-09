import type { Actions, PageServerLoad } from './$types';

import { userTable } from '../../../database/schema';

import { createSelectSchema } from 'drizzle-zod';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, setError, superValidate } from 'sveltekit-superforms';

import { redirect } from '@sveltejs/kit';
import { verify } from '@node-rs/argon2';
import { lucia } from '$lib/server/auth';
import { userService } from '$lib/server/users';

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

		const user = await userService.getOneByEmail(email);

		// No user exists
		if (user === null) {
			// TODO:  Compare against dummy password to protect against side-channels

			setError(form, 'password', 'Incorrect email or password');
			return setError(form, 'email', 'Incorrect email or password');
		}

		const validPassword = await verify(user.password, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		if (!validPassword) {
			setError(form, 'password', 'Incorrect email or password');
			return setError(form, 'email', 'Incorrect email or password');
		}

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		return redirect(302, '/');
	}
};
