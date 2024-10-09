import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { auctionService } from '$lib/server/auctions';
import { bidService } from '$lib/server/bids';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		return redirect(302, '/login');
	}

	// Cannot access it if its not your own page
	if (locals.user.id !== params.id) {
		return redirect(302, '/');
	}

	const auctions = auctionService.getActiveAuctionsByUserId(params.id);

	const bids = await bidService.getActiveBidsByUserId(params.id);

	const wonItems = await auctionService.getSoldAuctionsByUserId(params.id);

	return {
		auctions,
		bids,
		wonItems
	};
};
