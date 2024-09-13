<script lang="ts">
	import type { PageServerData } from './$types';

	import MainPageShowcase from './main-page-showcase.svelte';

	export let data: PageServerData;

	const { lastMinuteDeals, hotProducts: highBids, latestAuctions, upcomingAuctions } = data;
	const hotProducts = highBids.filter((entry) => entry.bidCount > 10).map((entry) => entry.product);
</script>

<div class="flex flex-col gap-24">
	<MainPageShowcase title="Last Minute Deals" auctions={lastMinuteDeals} />

	<MainPageShowcase title="Hot Products" auctions={hotProducts} />

	<MainPageShowcase title="Latest Auctions" auctions={latestAuctions} />

	<MainPageShowcase title="Upcoming Auctions" auctions={upcomingAuctions} />
</div>
