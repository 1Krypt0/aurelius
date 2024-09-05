import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createInsertSchema } from 'drizzle-zod';

import db from '../../../database/drizzle';
import { eq } from 'drizzle-orm';
import { userTable } from '../../../database/schema';

import { lucia } from '$lib/server/auth';
import { generateIdFromEntropySize } from 'lucia';
import { hash } from '@node-rs/argon2';

const registerSchema = createInsertSchema(userTable, {
	email: (schema) => schema.email.email()
}).pick({
	name: true,
	email: true,
	password: true
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(registerSchema));

	return {
		form
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(registerSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const data = form.data;

		const email = data.email;
		const name = data.name;
		const password = data.password;

		// 32 character ID (128 bits)
		const id = generateIdFromEntropySize(20);

		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		const alreadyExists = await db
			.select({ email: userTable.email })
			.from(userTable)
			.where(eq(userTable.email, email));

		if (alreadyExists.length !== 0) {
			return setError(form, 'email', 'Email already in use.');
		}

		await db.insert(userTable).values({
			id,
			name,
			email,
			password: passwordHash
		});

		const session = await lucia.createSession(id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		return redirect(302, '/');
	}
} satisfies Actions;
