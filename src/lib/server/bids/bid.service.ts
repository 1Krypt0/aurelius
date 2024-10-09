import { and, desc, eq } from 'drizzle-orm';
import db from '../../../database/drizzle';
import { bidTable, productTable, type InsertBid, type SelectBid } from '../../../database/schema';

export class BidService {
	async create(bid: InsertBid) {
		return db.insert(bidTable).values(bid);
	}

	async getBidsByProductId(productId: string): Promise<SelectBid[]> {
		const bids = await db
			.select()
			.from(bidTable)
			.where(eq(bidTable.productId, productId))
			.orderBy(desc(bidTable.value));

		return bids;
	}

	async getActiveBidsByUserId(userId: string): Promise<{ bid: SelectBid }[]> {
		const bids = await db
			.select({ bid: bidTable })
			.from(bidTable)
			.leftJoin(productTable, eq(productTable.id, bidTable.productId))
			.where(and(eq(productTable.sold, false), eq(bidTable.userId, userId)));

		return bids;
	}
}
