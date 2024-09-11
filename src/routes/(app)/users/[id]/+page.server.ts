import { and, eq, ne } from 'drizzle-orm';
import db from '../../../../database/drizzle';
import { userTable } from '../../../../database/schema';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { createInsertSchema } from 'drizzle-zod';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { hash, verify } from '@node-rs/argon2';

const changePasswordSchema = createInsertSchema(userTable)
	.pick({
		password: true
	})
	.and(z.object({ oldPassword: z.string(), passwordConfirmation: z.string() }));

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		return redirect(302, '/login');
	}

	// Cannot access it if its not your own page
	if (locals.user.id !== params.id) {
		return redirect(302, '/');
	}

	const user = await db.select().from(userTable).where(eq(userTable.id, params.id));

	const updateUserSchema = createInsertSchema(userTable, {
		email: (schema) => schema.email.email().default(user[0].email),
		name: (schema) => schema.name.default(user[0].name)
	}).pick({
		name: true,
		email: true
	});

	const updateUserForm = await superValidate(zod(updateUserSchema));
	const changePasswordForm = await superValidate(zod(changePasswordSchema));

	return {
		user: user[0],
		updateUserForm,
		changePasswordForm
	};
};

export const actions: Actions = {
	updateUser: async (event) => {
		// HACK: This was done so the default value would appear when loading
		const updateUserSchema = createInsertSchema(userTable, {
			email: (schema) => schema.email.email(),
			name: (schema) => schema.name
		}).pick({
			name: true,
			email: true
		});

		const form = await superValidate(event, zod(updateUserSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { name, email } = form.data;

		const emailInUse = await db
			.select()
			.from(userTable)
			.where(and(eq(userTable.email, email), ne(userTable.id, event.params.id)));

		if (emailInUse.length !== 0) {
			return setError(form, 'email', 'Email already in use.');
		}

		await db
			.update(userTable)
			.set({ name: name, email: email })
			.where(eq(userTable.id, event.params.id));

		return message(form, 'Data has been updated!');
	},

	changePassword: async (event) => {
		const form = await superValidate(event, zod(changePasswordSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { password: newPassword, oldPassword, passwordConfirmation } = form.data;

		if (newPassword !== passwordConfirmation) {
			return setError(form, 'passwordConfirmation', 'Passwords must match');
		}

		const user = await db
			.select({ password: userTable.password })
			.from(userTable)
			.where(eq(userTable.id, event.params.id));

		const validPassword = await verify(user[0].password, oldPassword, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		if (!validPassword) {
			return setError(form, 'oldPassword', 'Password does not match');
		}

		const passwordHash = await hash(newPassword, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		await db
			.update(userTable)
			.set({ password: passwordHash })
			.where(eq(userTable.id, event.params.id));

		return message(form, 'Password has been updated!');
	}
};
