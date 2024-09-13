<script lang="ts">
	import type { PageServerData } from './$types';
	import CurrentBids from './current-bids.svelte';
	import WonAuctions from './won-auctions.svelte';

	export let data: PageServerData;

	const auctions = data.auctions;
	const wonItems = data.wonItems;
	const bids = data.bids;
</script>

<div class="flex flex-col gap-24">
	{#if wonItems.length > 0}
		<WonAuctions {wonItems} />
	{/if}

	{#if auctions.length > 0}
		<CurrentBids {auctions} {bids} />
	{/if}

	{#if auctions.length === 0 && wonItems.length === 0}
		<p>Nothing to see yet. Make a bid to get started</p>
	{/if}
</div>
