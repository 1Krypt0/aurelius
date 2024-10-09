import { auctionService } from './auctions';

export async function checkAuctions() {
	const finishedAuctions = await auctionService.getFinishedAuctions();

	const soldProducts = finishedAuctions.filter((entry) => entry.bids.length > 0);

	for (const product of soldProducts) {
		const highestBidder = product.bids.sort((a, b) => b.value - a.value)[0];

		await auctionService.update(product.product.id, { sold: true, userId: highestBidder.userId });
	}
}
