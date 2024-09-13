import { and, asc, count, desc, eq, gt, lt } from 'drizzle-orm';
import db from '../../database/drizzle';
import { bidTable, productTable } from '../../database/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const SHOWCASE_LIMIT = 3;
	const now = new Date();
	const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
	const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

	const hotProducts = await db
		.select({
			product: productTable,
			bidCount: count(bidTable.id)
		})
		.from(productTable)
		.where(gt(productTable.endDate, now))
		.leftJoin(bidTable, eq(productTable.id, bidTable.productId))
		.groupBy(productTable.id)
		.orderBy((fields) => desc(fields.bidCount))
		.limit(SHOWCASE_LIMIT);

	const lastMinuteDeals = await db
		.select()
		.from(productTable)
		.where(and(gt(productTable.endDate, now), lt(productTable.endDate, twoDaysFromNow)))
		.orderBy(asc(productTable.endDate))
		.limit(SHOWCASE_LIMIT);

	const latestAuctions = await db
		.select()
		.from(productTable)
		.where(
			and(
				lt(productTable.startDate, now),
				gt(productTable.endDate, now),
				gt(productTable.startDate, twoDaysAgo)
			)
		)
		.orderBy(desc(productTable.startDate))
		.limit(SHOWCASE_LIMIT);

	const upcomingAuctions = await db
		.select()
		.from(productTable)
		.where(gt(productTable.startDate, now))
		.orderBy(asc(productTable.startDate))
		.limit(SHOWCASE_LIMIT);

	return {
		hotProducts,
		lastMinuteDeals,
		latestAuctions,
		upcomingAuctions
	};
};
