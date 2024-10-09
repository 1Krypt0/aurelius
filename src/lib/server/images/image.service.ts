import { eq, inArray } from 'drizzle-orm';
import db from '../../../database/drizzle';
import { imageTable, type InsertImage, type SelectImage } from '../../../database/schema';

export class ImageService {
	async createMany(images: InsertImage[]) {
		return db.insert(imageTable).values(images);
	}

	async getManyByProduct(productId: string): Promise<SelectImage[]> {
		const images = await db.select().from(imageTable).where(eq(imageTable.productId, productId));

		return images;
	}

	async deleteByArray(toDelete: string[]) {
		return db.delete(imageTable).where(inArray(imageTable.id, toDelete));
	}
}
