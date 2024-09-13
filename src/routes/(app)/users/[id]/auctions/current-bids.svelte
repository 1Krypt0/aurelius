<script lang="ts">
	import type { SelectBid, SelectProduct } from '../../../../../database/schema';

	import { Separator } from '$lib/components/ui/separator';
	import CurrentBidItem from './current-bid-item.svelte';

	export let auctions: { product: SelectProduct }[];
	export let bids: { bid: SelectBid }[];
</script>

<section class="flex flex-col md:flex-row md:gap-12">
	<aside class="md:block md:w-1/3">
		<h2 class="text-center font-headers text-2xl md:text-start">Current Bids</h2>
		<Separator class="my-4" />
	</aside>
	<section class="md:w-2/3">
		<div class="flex flex-col gap-8">
			{#each auctions as auction}
				<CurrentBidItem
					{auction}
					bids={bids.filter((bid) => bid.bid.productId === auction.product.id)}
				/>
			{/each}
		</div>
	</section>
</section>
