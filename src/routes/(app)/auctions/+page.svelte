<script lang="ts">
	import type { PageServerData } from './$types';
	import { AuctionShowcase } from '$lib/components/auction';
	import SearchBar from './search-bar.svelte';
	// import DataFilters from './data-filters.svelte';

	export let data: PageServerData;

	const auctions = data.auctions;
</script>

<!-- <aside class="hidden w-1/4 md:block"> -->
<!-- 	<DataFilters amount={auctions.length} /> -->
<!-- </aside> -->
<section class="mx-auto w-3/4">
	<SearchBar />
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each auctions as auction}
			<AuctionShowcase auction={auction.product} images={auction.images} />
		{/each}
	</div>
</section>
