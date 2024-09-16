import { eq, gt } from 'drizzle-orm';
import db from '../../../database/drizzle';
import {
	imageTable,
	productTable,
	type SelectImage,
	type SelectProduct
} from '../../../database/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const now = new Date();

	const auctions = await db
		.select()
		.from(productTable)
		.leftJoin(imageTable, eq(imageTable.productId, productTable.id))
		.where(gt(productTable.endDate, now))
		.orderBy(productTable.endDate);

	const res = Object.values(
		auctions.reduce<Record<string, { product: SelectProduct; images: SelectImage[] }>>(
			(acc, row) => {
				const product = row.product;
				const image = row.image;

				if (!acc[product.id]) {
					acc[product.id] = { product, images: [] };
				}

				if (image) {
					acc[product.id].images.push(image);
				}
				return acc;
			},
			{}
		)
	);

	return {
		auctions: res
	};
};
