import { gt } from 'drizzle-orm';
import db from '../../../database/drizzle';
import { productTable } from '../../../database/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const now = new Date();

	const auctions = await db
		.select()
		.from(productTable)
		.where(gt(productTable.endDate, now))
		.orderBy(productTable.endDate);

	console.log(auctions);

	return {
		auctions
	};
};
