import { and, eq } from 'drizzle-orm';
import db from '../../../../../database/drizzle';
import { bidTable, imageTable, productTable, userTable } from '../../../../../database/schema';

import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { convertAuctionImageQuery } from '$lib/server/utils';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		return redirect(302, '/login');
	}

	// Cannot access it if its not your own page
	if (locals.user.id !== params.id) {
		return redirect(302, '/');
	}

	const auctions = await db
		.selectDistinct({
			product: productTable,
			image: imageTable
		})
		.from(productTable)
		.innerJoin(bidTable, eq(bidTable.productId, productTable.id))
		.innerJoin(userTable, eq(bidTable.userId, userTable.id))
		.where(and(eq(userTable.id, params.id), eq(productTable.sold, false)))
		.leftJoin(imageTable, eq(imageTable.productId, productTable.id));

	const currentBids = convertAuctionImageQuery(auctions);

	const bids = await db
		.select({
			bid: bidTable
		})
		.from(bidTable)
		.leftJoin(productTable, eq(productTable.id, bidTable.productId))
		.where(and(eq(productTable.sold, false), eq(bidTable.userId, params.id)));

	const wonItems = await db
		.select()
		.from(productTable)
		.where(and(eq(productTable.sold, true), eq(productTable.userId, params.id)))
		.leftJoin(imageTable, eq(imageTable.productId, productTable.id));

	const items = convertAuctionImageQuery(wonItems);

	return {
		auctions: currentBids,
		bids,
		wonItems: items
	};
};
