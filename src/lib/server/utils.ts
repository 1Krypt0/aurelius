import type { SelectBid, SelectImage, SelectProduct } from '../../database/schema';

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

export const convertAuctionBidQuery = (
	auctions: { product: SelectProduct; bid: SelectBid | null }[]
): { product: SelectProduct; bids: SelectBid[] }[] => {
	const reduced = auctions.reduce<Record<string, { product: SelectProduct; bids: SelectBid[] }>>(
		(acc, row) => {
			const product = row.product;
			const bid = row.bid;

			if (!acc[product.id]) {
				acc[product.id] = { product, bids: [] };
			}

			if (bid) {
				acc[product.id].bids.push(bid);
			}

			return acc;
		},
		{}
	);
	return Object.values(reduced);
};
