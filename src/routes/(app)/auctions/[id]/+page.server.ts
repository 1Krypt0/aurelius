import { eq } from 'drizzle-orm';
import db from '../../../../database/drizzle';
import { productTable } from '../../../../database/schema';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	const auction = await db.select().from(productTable).where(eq(productTable.id, params.id));

	if (auction.length != 1) {
		return redirect(302, '/404');
	}

	return {
		auction: auction.at(0),
		user: locals.user
	};
};
