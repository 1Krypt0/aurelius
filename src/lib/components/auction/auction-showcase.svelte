<script lang="ts">
	import type { SelectImage, SelectProduct } from '../../../database/schema';
	import { AuctionImages } from '$lib/components/auction';
	import AuctionInfo from '$lib/components/auction/auction-info.svelte';

	export let auction: SelectProduct;
	export let images: SelectImage[];

	const auctionLink = `/auctions/${auction.id}`;
</script>

<section class="flex flex-col gap-2">
	<AuctionImages {auctionLink} {images} />

	<AuctionInfo
		name={auction.name}
		startDate={auction.startDate}
		endDate={auction.endDate}
		price={auction.price}
		variant="simple"
		{auctionLink}
	/>
</section>
