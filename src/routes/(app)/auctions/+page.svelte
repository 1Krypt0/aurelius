<script lang="ts">
	import type { PageServerData } from './$types';
	import AuctionShowcase from './auction-showcase.svelte';
	import DataFilters from './data-filters.svelte';

	export let data: PageServerData;

	const auctions = data.auctions;
</script>

<div class="flex">
	<aside class="hidden w-1/4 md:block">
		<DataFilters />
	</aside>
	<section class="mx-auto w-3/4">
		<p class="pb-12 text-center">There will be a search bar here</p>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each auctions as auction}
				<AuctionShowcase {auction} />
			{/each}
		</div>
	</section>
</div>
