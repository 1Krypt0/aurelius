import { userTable } from '../../../../database/schema';
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { createInsertSchema } from 'drizzle-zod';
import { fail, message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { hash, verify } from '@node-rs/argon2';
import { userService } from '$lib/server/users';

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

	const user = await userService.getOneById(params.id);

	// Sanity check, user should exist here
	if (user === null) {
		return redirect(302, '/');
	}

	const updateUserSchema = createInsertSchema(userTable, {
		email: (schema) => schema.email.email().default(user.email),
		name: (schema) => schema.name.default(user.name)
	}).pick({
		name: true,
		email: true
	});

	const updateUserForm = await superValidate(zod(updateUserSchema));
	const changePasswordForm = await superValidate(zod(changePasswordSchema));

	return {
		user: user,
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

		const emailInUse = await userService.getOneByEmail(email);

		if (emailInUse !== null) {
			return setError(form, 'email', 'Email already in use.');
		}

		await userService.update(event.params.id, {
			name,
			email
		});

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

		const user = await userService.getOneById(event.params.id);

		if (user === null) {
			const errorMsg = 'User not found!';
			setError(form, 'oldPassword', errorMsg);
			setError(form, 'passwordConfirmation', errorMsg);
			return setError(form, 'password', errorMsg);
		}

		const validPassword = await verify(user.password, oldPassword, {
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

		await userService.update(event.params.id, {
			password: passwordHash
		});

		return message(form, 'Password has been updated!');
	}
};
