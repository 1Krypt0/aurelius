import { eq } from 'drizzle-orm';
import db from '../../../../database/drizzle';
import { productTable, type InsertProduct, type SelectProduct } from '../../../../database/schema';

export class AuctionService {
	async getAll(): Promise<SelectProduct[]> {
		const auctions = await db.select().from(productTable);

		return auctions;
	}

	async getOneById(id: string): Promise<SelectProduct | null> {
		const auction = await db.select().from(productTable).where(eq(productTable.id, id)).limit(1);

		if (auction.length !== 1) {
			return null;
		}

		return auction[0];
	}

	async create(product: InsertProduct) {
		return db.insert(productTable).values(product);
	}

	async createMany(products: InsertProduct[]) {
		return db.insert(productTable).values(products);
	}
}
