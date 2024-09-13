<script lang="ts">
	import type { SelectProduct } from '../../../database/schema';
	import { Button } from '$lib/components/ui/button';
	import { AuctionImages } from '$lib/components/auction';

	export let auction: SelectProduct;

	const now = new Date();
	const buttonVal = auction.startDate <= now ? 'Bid' : 'Preview';
	const pricePrefix = auction.startDate <= now ? 'Current' : 'Starting';

	const auctionLink = `/auctions/${auction.id}`;

	const startDay = new Intl.DateTimeFormat(undefined, {
		month: 'short',
		day: 'numeric'
	}).format(auction.startDate);

	const endDay = new Intl.DateTimeFormat(undefined, {
		month: 'short',
		year: 'numeric',
		day: '2-digit'
	}).format(auction.endDate);

	const endHour = new Intl.DateTimeFormat(undefined, {
		hour: 'numeric',
		minute: 'numeric'
	}).format(auction.endDate);
</script>

<section class="flex flex-col gap-2">
	<AuctionImages {auctionLink} />

	<a class="truncate hover:underline" href={auctionLink}>{auction.name}</a>
	<p class="truncate">
		{startDay} - {endDay} | {endHour}
	</p>
	<div class="flex items-center justify-between">
		<p>{pricePrefix} Price: {auction.price}€</p>
		<Button class="w-1/2" href={auctionLink}>
			{buttonVal}
		</Button>
	</div>
</section>
