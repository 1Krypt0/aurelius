import { and, asc, count, desc, eq, gt, lt, lte } from 'drizzle-orm';
import db from '../../../database/drizzle';
import {
	bidTable,
	imageTable,
	productTable,
	userTable,
	type InsertProduct,
	type SelectBid,
	type SelectImage,
	type SelectProduct,
	type SelectUser
} from '../../../database/schema';
import { convertAuctionBidQuery, convertAuctionImageQuery } from '../utils';

export class AuctionService {
	async getAll(): Promise<{ product: SelectProduct; images: SelectImage[] }[]> {
		const auctions = await db
			.select()
			.from(productTable)
			.leftJoin(imageTable, eq(imageTable.productId, productTable.id));

		return convertAuctionImageQuery(auctions);
	}

	async getAllWithUserInfo(): Promise<{ product: SelectProduct; user: SelectUser | null }[]> {
		const auctions = await db
			.select()
			.from(productTable)
			.leftJoin(userTable, eq(productTable.userId, userTable.id));

		return auctions;
	}

	async getOneById(id: string): Promise<{ product: SelectProduct; images: SelectImage[] } | null> {
		const auction = await db
			.select()
			.from(productTable)
			.leftJoin(imageTable, eq(imageTable.productId, productTable.id))
			.where(eq(productTable.id, id))
			.limit(1);

		if (auction.length !== 1) {
			return null;
		}

		return convertAuctionImageQuery(auction)[0];
	}

	async getOneByName(
		name: string
	): Promise<{ product: SelectProduct; images: SelectImage[] } | null> {
		const auction = await db
			.select()
			.from(productTable)
			.leftJoin(imageTable, eq(imageTable.productId, productTable.id))
			.where(eq(productTable.name, name))
			.limit(1);

		if (auction.length !== 1) {
			return null;
		}

		return convertAuctionImageQuery(auction)[0];
	}

	async getUnfinishedAuctions(): Promise<{ product: SelectProduct; images: SelectImage[] }[]> {
		const now = new Date();
		const auctions = await db
			.select()
			.from(productTable)
			.leftJoin(imageTable, eq(imageTable.productId, productTable.id))
			.where(gt(productTable.endDate, now))
			.orderBy(productTable.endDate);

		return convertAuctionImageQuery(auctions);
	}

	async getFinishedAuctions(): Promise<{ product: SelectProduct; bids: SelectBid[] }[]> {
		const now = new Date();
		const auctions = await db
			.select()
			.from(productTable)
			.leftJoin(bidTable, eq(bidTable.productId, productTable.id))
			.where(and(lte(productTable.endDate, now), eq(productTable.sold, false)));

		return convertAuctionBidQuery(auctions);
	}

	async getActiveAuctionsByUserId(
		userId: string
	): Promise<{ product: SelectProduct; images: SelectImage[] }[]> {
		const auctions = await db
			.selectDistinct({ product: productTable, image: imageTable })
			.from(productTable)
			.innerJoin(bidTable, eq(bidTable.productId, productTable.id))
			.innerJoin(userTable, eq(bidTable.userId, userTable.id))
			.where(and(eq(userTable.id, userId), eq(productTable.sold, false)))
			.leftJoin(imageTable, eq(imageTable.productId, productTable.id));

		return convertAuctionImageQuery(auctions);
	}

	async getSoldAuctionsByUserId(
		userId: string
	): Promise<{ product: SelectProduct; images: SelectImage[] }[]> {
		const wonItems = await db
			.select()
			.from(productTable)
			.where(and(eq(productTable.sold, true), eq(productTable.userId, userId)))
			.leftJoin(imageTable, eq(imageTable.productId, productTable.id));

		return convertAuctionImageQuery(wonItems);
	}

	async getHotAuctions() {
		const now = new Date();
		const auctions = await db
			.select({
				product: productTable,
				bidCount: count(bidTable.id)
			})
			.from(productTable)
			.where(gt(productTable.endDate, now))
			.leftJoin(bidTable, eq(productTable.id, bidTable.productId))
			.groupBy(productTable.id)
			.orderBy((fields) => desc(fields.bidCount));

		return auctions;
	}

	async getAuctionsEndingSoon() {
		const now = new Date();
		const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
		const auctions = await db
			.select()
			.from(productTable)
			.where(and(gt(productTable.endDate, now), lt(productTable.endDate, twoDaysFromNow)))
			.orderBy(asc(productTable.endDate));

		return auctions;
	}

	async getMostRecentAuctions() {
		const now = new Date();
		const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
		const auctions = await db
			.select()
			.from(productTable)
			.where(
				and(
					lt(productTable.startDate, now),
					gt(productTable.endDate, now),
					gt(productTable.startDate, twoDaysAgo)
				)
			)
			.orderBy(desc(productTable.startDate));

		return auctions;
	}

	async getUpcomingAuctions() {
		const now = new Date();

		const auctions = await db
			.select()
			.from(productTable)
			.where(gt(productTable.startDate, now))
			.orderBy(asc(productTable.startDate));

		return auctions;
	}

	async create(product: InsertProduct) {
		return db.insert(productTable).values(product);
	}

	async createMany(products: InsertProduct[]) {
		return db.insert(productTable).values(products);
	}

	async update(id: string, data: Partial<Omit<InsertProduct, 'id'>>) {
		return db
			.update(productTable)
			.set({ ...data })
			.where(eq(productTable.id, id));
	}

	async delete(id: string) {
		await db.delete(productTable).where(eq(productTable.id, id));
	}
}
