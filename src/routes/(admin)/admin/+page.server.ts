import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import db from '../../../database/drizzle';
import { productTable, userTable } from '../../../database/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return redirect(302, '/');
	}

	if (!locals.user.isAdmin) {
		return redirect(302, '/');
	}

	// NOTE: Probably a redundant check but one that I'm gonna keep for peace of mind
	const user = await db.select().from(userTable).where(eq(userTable.id, locals.user.id));

	if (user.length === 0) {
		return redirect(302, '/');
	}

	if (!user[0].isAdmin) {
		return redirect(302, '/');
	}

	const auctions = await db
		.select()
		.from(productTable)
		.leftJoin(userTable, eq(productTable.userId, userTable.id));

	return {
		auctions
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		// TODO: Guard this endpoint
		const data = await request.formData();
		const id = data.get('id') as string;

		await db.delete(productTable).where(eq(productTable.id, id));
	}
};
