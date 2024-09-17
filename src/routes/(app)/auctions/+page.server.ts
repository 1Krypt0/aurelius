import { eq, gt } from 'drizzle-orm';
import db from '../../../database/drizzle';
import { imageTable, productTable } from '../../../database/schema';
import type { PageServerLoad } from './$types';
import { convertAuctionImageQuery } from '$lib/server/utils';

export const load: PageServerLoad = async () => {
	const now = new Date();

	const auctions = await db
		.select()
		.from(productTable)
		.leftJoin(imageTable, eq(imageTable.productId, productTable.id))
		.where(gt(productTable.endDate, now))
		.orderBy(productTable.endDate);

	const res = convertAuctionImageQuery(auctions);

	return {
		auctions: res
	};
};
