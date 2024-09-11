import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import db from '../../../database/drizzle';
import { userTable } from '../../../database/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return redirect(302, '/');
	}

	const user = await db.select().from(userTable).where(eq(userTable.id, locals.user.id));

	if (user.length === 0) {
		return redirect(302, '/');
	}

	if (!user[0].isAdmin) {
		return redirect(302, '/');
	}

	// TODO: Return management stuff
	return {};
};
