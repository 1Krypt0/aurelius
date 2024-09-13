<script lang="ts">
	import type { SelectProduct } from '../../../database/schema';
	import { AuctionImages } from '$lib/components/auction';
	import AuctionInfo from '$lib/components/auction/auction-info.svelte';

	export let auction: SelectProduct;

	const auctionLink = `/auctions/${auction.id}`;
</script>

<section class="flex flex-col gap-2">
	<AuctionImages {auctionLink} />

	<AuctionInfo
		name={auction.name}
		startDate={auction.startDate}
		endDate={auction.endDate}
		price={auction.price}
		variant="simple"
		{auctionLink}
	/>
</section>
