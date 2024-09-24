import { and, eq, lte } from 'drizzle-orm';
import db from '../../database/drizzle';
import { bidTable, productTable } from '../../database/schema';
import { convertAuctionBidQuery } from './utils';

export async function checkAuctions() {
	const now = new Date();
	const finishedAuctions = await db
		.select()
		.from(productTable)
		.leftJoin(bidTable, eq(bidTable.productId, productTable.id))
		.where(and(lte(productTable.endDate, now), eq(productTable.sold, false)));

	const soldProducts = convertAuctionBidQuery(finishedAuctions).filter(
		(entry) => entry.bids.length > 0
	);

	for (const product of soldProducts) {
		const highestBidder = product.bids.sort((a, b) => b.value - a.value)[0];

		await db
			.update(productTable)
			.set({ sold: true, userId: highestBidder.userId })
			.where(eq(productTable.id, product.product.id));
	}
}
