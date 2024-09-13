<script lang="ts">
	import type { PageServerData } from './$types';
	import { AuctionImages, AuctionInfo } from '$lib/components/auction/';
	import { Button } from '$lib/components/ui/button';
	import AuctionDescription from '$lib/components/auction/auction-description.svelte';
	import BidModal from './bid-modal.svelte';

	import { superForm } from 'sveltekit-superforms';

	export let data: PageServerData;

	const now = new Date();
	const form = superForm(data.form);
	const user = data.user;

	$: auction = data.auction;
	$: bidAmount = data.bids.length;
	$: priceIncrease = Math.round((auction.price * 1.1 + Number.EPSILON) * 100) / 100;
</script>

<section class="flex flex-col gap-12 md:flex-row md:gap-24">
	<div class="md:w-1/2">
		<AuctionImages />
	</div>

	<aside class="flex flex-col gap-4 md:w-1/3 md:pt-12">
		<AuctionInfo
			name={auction.name}
			startDate={auction.startDate}
			endDate={auction.endDate}
			price={auction.price}
			variant="detailed"
			{bidAmount}
		/>
		{#if auction.endDate <= now}
			<Button disabled variant="destructive">Auction has ended</Button>
		{:else if !user}
			<Button href="/login">Register to Bid</Button>
		{:else if user && auction.startDate <= now}
			<BidModal {form} {priceIncrease} />
		{/if}
	</aside>
</section>

<AuctionDescription description={auction.description} />
