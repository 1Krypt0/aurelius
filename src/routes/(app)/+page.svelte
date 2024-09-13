<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import type { PageServerData } from './$types';
	import AuctionShowcase from './auctions/auction-showcase.svelte';

	export let data: PageServerData;

	const SHOWCASE_LIMIT = 3;

	const { lastMinuteDeals, hotProducts, latestAuctions, upcomingAuctions } = data;
</script>

<div class="flex flex-col gap-24">
	{#if lastMinuteDeals.length >= SHOWCASE_LIMIT}
		<section>
			<div class="flex items-center justify-between">
				<h1 class="font-headers text-4xl font-bold">Last Minute Deals</h1>
				<a href="/auctions" class="self-end hover:underline">View all</a>
			</div>
			<Separator class="my-4" />

			<div class="flex items-center justify-between gap-12">
				{#each lastMinuteDeals as deal}
					<div class="w-1/4">
						<AuctionShowcase auction={deal} />
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if hotProducts.length >= SHOWCASE_LIMIT}
		<section>
			<div class="flex items-center justify-between">
				<h1 class="font-headers text-4xl font-bold">Hot Products</h1>
				<a href="/auctions" class="self-end hover:underline">View all</a>
			</div>
			<Separator class="my-4" />

			<div class="flex items-center justify-between gap-12">
				{#each hotProducts as deal}
					<div class="w-1/4">
						<AuctionShowcase auction={deal.product} />
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if latestAuctions.length >= SHOWCASE_LIMIT}
		<section>
			<div class="flex items-center justify-between">
				<h1 class="font-headers text-4xl font-bold">Latest Auctions</h1>
				<a href="/auctions" class="self-end hover:underline">View all</a>
			</div>
			<Separator class="my-4" />

			<div class="flex items-center justify-between gap-12">
				{#each latestAuctions as deal}
					<div class="w-1/4">
						<AuctionShowcase auction={deal} />
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if upcomingAuctions.length >= SHOWCASE_LIMIT}
		<section>
			<div class="flex items-center justify-between">
				<h1 class="font-headers text-4xl font-bold">Upcoming Auctions</h1>
				<a href="/auctions" class="self-end hover:underline">View all</a>
			</div>
			<Separator class="my-4" />

			<div class="flex items-center justify-between gap-12">
				{#each upcomingAuctions as deal}
					<div class="w-1/4">
						<AuctionShowcase auction={deal} />
					</div>
				{/each}
			</div>
		</section>
	{/if}
</div>
