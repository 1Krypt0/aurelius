import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auctionService } from '$lib/server/auctions';
import { userService } from '$lib/server/users';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return redirect(302, '/');
	}

	if (!locals.user.isAdmin) {
		return redirect(302, '/');
	}

	// NOTE: Probably a redundant check but one that I'm gonna keep for peace of mind
	const user = await userService.getOneById(locals.user.id);

	if (user === null) {
		return redirect(302, '/');
	}

	if (!user.isAdmin) {
		return redirect(302, '/');
	}

	// TODO: Investigate this
	const auctions = await auctionService.getAllWithUserInfo();

	return {
		auctions
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		// TODO: Guard this endpoint
		const data = await request.formData();
		const id = data.get('id') as string;

		await auctionService.delete(id);
	}
};
