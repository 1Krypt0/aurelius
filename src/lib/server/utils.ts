import type { SelectImage, SelectProduct } from '../../database/schema';

export const convertAuctionImageQuery = (
	auctions: { product: SelectProduct; image: SelectImage | null }[]
): { product: SelectProduct; images: SelectImage[] }[] => {
	const reduced = auctions.reduce<
		Record<string, { product: SelectProduct; images: SelectImage[] }>
	>((acc, row) => {
		const product = row.product;
		const image = row.image;

		if (!acc[product.id]) {
			acc[product.id] = { product, images: [] };
		}

		if (image) {
			acc[product.id].images.push(image);
		}

		return acc;
	}, {});
	return Object.values(reduced);
};
