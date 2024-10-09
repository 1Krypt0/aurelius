import type { PageServerLoad } from './$types';
import { auctionService } from '$lib/server/auctions';

export const load: PageServerLoad = async () => {
	const SHOWCASE_LIMIT = 3;

	const hotProducts = (await auctionService.getHotAuctions()).slice(0, SHOWCASE_LIMIT);

	const lastMinuteDeals = (await auctionService.getAuctionsEndingSoon()).slice(0, SHOWCASE_LIMIT);

	const latestAuctions = (await auctionService.getMostRecentAuctions()).slice(0, SHOWCASE_LIMIT);

	const upcomingAuctions = (await auctionService.getUpcomingAuctions()).slice(0, SHOWCASE_LIMIT);

	return {
		hotProducts,
		lastMinuteDeals,
		latestAuctions,
		upcomingAuctions
	};
};
