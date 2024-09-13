<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import type { PageServerData } from './$types';
	import WonAuction from './won-auction.svelte';
	import CurrentBid from './current-bid.svelte';

	export let data: PageServerData;

	const auctions = data.auctions;
	const wonItems = data.wonItems;
	const bids = data.bids;
</script>

<div class="flex flex-col gap-24">
	{#if wonItems.length > 0}
		<section class="flex">
			<aside class=" w-1/4 md:block">
				<h2 class="font-headers text-2xl">Won Items</h2>
				<Separator class="my-4" />
			</aside>
			<section class="mx-auto w-3/4 px-12">
				<div class="flex flex-col gap-8">
					{#each wonItems as auction}
						<WonAuction {auction} />
						<!-- <AuctionShowcase {auction} /> -->
					{/each}
				</div>
			</section>
		</section>
	{/if}

	{#if auctions.length > 0}
		<section class="flex">
			<aside class=" w-1/4 md:block">
				<h2 class="font-headers text-2xl">Current Bids</h2>
				<Separator class="my-4" />
			</aside>
			<section class="mx-auto w-3/4 px-12">
				<div class="flex flex-col gap-8">
					{#each auctions as auction}
						<CurrentBid
							{auction}
							bids={bids.filter((bid) => bid.bid.productId === auction.product.id)}
						/>
						<!-- <AuctionShowcase {auction} /> -->
					{/each}
				</div>
			</section>
		</section>
	{/if}

	{#if auctions.length === 0 && wonItems.length === 0}
		<p>Nothing to see yet. Make a bid to get started</p>
	{/if}
</div>
