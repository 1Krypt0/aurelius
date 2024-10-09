import type { PageServerLoad } from './$types';
import { auctionService } from '$lib/server/auctions';

export const load: PageServerLoad = async () => {
	const auctions = await auctionService.getUnfinishedAuctions();
	return {
		auctions
	};
};
