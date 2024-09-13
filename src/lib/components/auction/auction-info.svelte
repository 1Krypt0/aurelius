<script lang="ts">
	import { Button } from '../ui/button';
	export let name: string;
	export let startDate;
	export let endDate;
	export let price: number;
	export let bidAmount: number = -1;
	export let auctionLink: string = '';
	export let variant: 'detailed' | 'simple' = 'simple';

	const now = new Date();
	const buttonVal = startDate <= now ? 'Bid' : 'Preview';

	$: pricePrefix = startDate <= now ? 'Current' : 'Starting';

	$: startDay = new Intl.DateTimeFormat(undefined, {
		month: 'short',
		day: 'numeric'
	}).format(startDate);

	$: endDay = new Intl.DateTimeFormat(undefined, {
		month: 'short',
		year: 'numeric',
		day: '2-digit'
	}).format(endDate);

	$: endHour = new Intl.DateTimeFormat(undefined, {
		hour: 'numeric',
		minute: 'numeric'
	}).format(endDate);
</script>

{#if variant === 'detailed'}
	<p class="font-headers text-xl">{name}</p>
{:else}
	<a class="truncate hover:underline" href={auctionLink}>{name}</a>
{/if}

<p class="truncate">
	{startDay} - {endDay} | {endHour}
</p>

<div class="flex items-center justify-between">
	{#if variant == 'detailed'}
		<p>{pricePrefix} Price: {price}€ ({bidAmount} bids)</p>
	{:else}
		<p>{pricePrefix} Price: {price}€</p>
		<Button class="w-1/2" href={auctionLink}>
			{buttonVal}
		</Button>
	{/if}
</div>
