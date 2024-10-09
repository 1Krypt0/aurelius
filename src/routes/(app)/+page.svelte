<script lang="ts">
	import type { PageServerData } from './$types';

	import MainPageShowcase from './main-page-showcase.svelte';

	export let data: PageServerData;

	const { lastMinuteDeals, hotProducts, latestAuctions, upcomingAuctions } = data;
</script>

<div class="flex flex-col gap-24">
	<MainPageShowcase title="Last Minute Deals" auctions={lastMinuteDeals} />

	<MainPageShowcase title="Hot Products" auctions={hotProducts} />

	<MainPageShowcase title="Latest Auctions" auctions={latestAuctions} />

	<MainPageShowcase title="Upcoming Auctions" auctions={upcomingAuctions} />
</div>
