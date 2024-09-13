<script lang="ts">
	import type { PageServerData } from './$types';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { AuctionImages } from '$lib/components/auction/';
	import { Separator } from '$lib/components/ui/separator';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { superForm } from 'sveltekit-superforms';

	export let data: PageServerData;

	const form = superForm(data.form);
	const { form: formData, enhance } = form;

	$: auction = data.auction;

	$: bids = data.bids;
	const user = data.user;

	const now = new Date();

	$: pricePrefix = auction.startDate <= now ? 'Current' : 'Starting';
	$: priceIncrease = Math.round((auction.price * 1.1 + Number.EPSILON) * 100) / 100;

	$: startDay = new Intl.DateTimeFormat(undefined, {
		month: 'short',
		day: 'numeric'
	}).format(auction.startDate);

	$: endDay = new Intl.DateTimeFormat(undefined, {
		month: 'short',
		year: 'numeric',
		day: '2-digit'
	}).format(auction.endDate);

	$: endHour = new Intl.DateTimeFormat(undefined, {
		hour: 'numeric',
		minute: 'numeric'
	}).format(auction.endDate);
</script>

<section class="flex flex-col gap-12 md:flex-row md:gap-24">
	<div class="md:w-1/2">
		<AuctionImages />
	</div>

	<aside class="flex flex-col gap-4 md:w-1/3 md:pt-12">
		<p class="font-headers text-xl">{auction.name}</p>

		<p class="truncate">
			{startDay} - {endDay} | {endHour}
		</p>
		<div class="flex items-center justify-between">
			<p>{pricePrefix} Price: {auction.price}€ ({bids.length} bids)</p>
		</div>
		{#if auction.endDate <= now}
			<Button disabled variant="destructive">Auction has ended</Button>
		{:else if !user}
			<Button href="/login">Register to Bid</Button>
		{:else if user && auction.startDate <= now}
			<Dialog.Root>
				<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>Place Bid</Dialog.Trigger>
				<Dialog.Content class="sm:max-w-[450px]">
					<form method="post" use:enhance>
						<Dialog.Header>
							<Dialog.Title>Place your Bid</Dialog.Title>
							<Dialog.Description>
								By making a Bid, you are commited to buy this item if you are the winning bidder.
							</Dialog.Description>
						</Dialog.Header>
						<Form.Field {form} name="value">
							<Form.Control let:attrs>
								<div class="flex items-center gap-4 py-4">
									<Form.Label>Amount</Form.Label>
									<Input {...attrs} placeholder="0" required bind:value={$formData.value} />
									<Form.Button type="submit" class="w-28">Bid</Form.Button>
								</div>
							</Form.Control>
							<Form.FieldErrors />
							<Form.Description>
								Enter EUR {priceIncrease} or more
							</Form.Description>
						</Form.Field>
					</form>
				</Dialog.Content>
			</Dialog.Root>
		{/if}
	</aside>
</section>

<section class="flex flex-col pt-12">
	<section>
		<h2 class="pb-8 font-headers text-2xl">Description</h2>
		<p>{auction.description}</p>
	</section>
	<Separator class="my-8" />
</section>
