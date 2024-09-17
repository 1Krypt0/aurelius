import { eq } from 'drizzle-orm';
import db from '../../../../../database/drizzle';
import { productTable } from '../../../../../database/schema';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const auction = await db.select().from(productTable).where(eq(productTable.id, params.id));

	if (auction.length === 0) {
		return error(404, 'Auction not found');
	}

	return {
		auction: auction[0]
	};
};
