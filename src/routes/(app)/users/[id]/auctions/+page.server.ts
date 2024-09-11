import { eq } from 'drizzle-orm';
import db from '../../../../../database/drizzle';
import { userTable } from '../../../../../database/schema';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		return redirect(302, '/login');
	}

	// Cannot access it if its not your own page
	if (locals.user.id !== params.id) {
		return redirect(302, '/');
	}

	const user = await db.select().from(userTable).where(eq(userTable.id, params.id));

	// TODO: Get auctions

	return {
		user: user[0]
	};
};
