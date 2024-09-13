<script lang="ts">
	import type { SelectBid, SelectProduct } from '../../../../../database/schema';

	import { Separator } from '$lib/components/ui/separator';
	import CurrentBidItem from './current-bid-item.svelte';

	export let auctions: { product: SelectProduct }[];
	export let bids: { bid: SelectBid }[];
</script>

<section class="flex">
	<aside class=" w-1/4 md:block">
		<h2 class="font-headers text-2xl">Current Bids</h2>
		<Separator class="my-4" />
	</aside>
	<section class="mx-auto w-3/4 px-12">
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
