<script lang="ts">
	import type { PageServerData } from './$types';
	import * as Carousel from '$lib/components/ui/carousel';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Separator } from '$lib/components/ui/separator';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	export let data: PageServerData;

	const auction = data.auction;
	const user = data.user;

	const now = new Date();
	const pricePrefix = auction?.startDate <= now ? 'Current' : 'Starting';

	const startDay = new Intl.DateTimeFormat(undefined, {
		month: 'short',
		day: 'numeric'
	}).format(auction?.startDate);

	const endDay = new Intl.DateTimeFormat(undefined, {
		month: 'short',
		year: 'numeric',
		day: '2-digit'
	}).format(auction?.endDate);
	const endHour = new Intl.DateTimeFormat(undefined, {
		hour: 'numeric'
	}).format(auction?.endDate);

	const genRandom = (min: number, max: number): number => {
		return min + Math.floor(Math.random() * max);
	};
</script>

<section class="flex flex-col gap-12 md:flex-row md:gap-24">
	<Carousel.Root class="md:w-1/2">
		<Carousel.Content>
			{#each [0, 1, 2, 3, 4, 5] as i (i)}
				<Carousel.Item class="w-full">
					<div class="p-1">
						<Card.Root>
							<Card.Content
								class="flex aspect-square max-h-[350px] w-full items-center justify-center p-6 lg:aspect-video"
							>
								<img
									src={`https://picsum.photos/id/${genRandom(0, 300)}/${genRandom(1, 10) * 100}/${genRandom(1, 10) * 100}`}
									alt="Product Showcase"
									class="max-h-full"
								/>
							</Card.Content>
						</Card.Root>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>

	<aside class="flex flex-col gap-4 md:pt-12">
		<p class="font-headers text-xl">{auction?.name}</p>

		<p class="truncate">
			{startDay} - {endDay} | {endHour}
		</p>
		<div class="flex items-center justify-between">
			<p>{pricePrefix} Price: {auction?.price}€</p>
		</div>
		{#if user}
			<Dialog.Root>
				<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>Place Bid</Dialog.Trigger>
				<Dialog.Content class="sm:max-w-[450px]">
					<Dialog.Header>
						<Dialog.Title>Place your Bid</Dialog.Title>
						<Dialog.Description>
							By making a Bid, you are commited to buy this item if you are the winning bidder.
						</Dialog.Description>
					</Dialog.Header>
					<div class="flex gap-4 py-4">
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="price" class="col-span-1">Amount</Label>
							<Input id="price" class="col-span-3" />
							<p class="col-span-4 text-sm text-muted-foreground">
								Enter EUR {auction?.price * 1.1} or more
							</p>
						</div>

						<Button type="submit" class="w-28">Bid</Button>
					</div>
				</Dialog.Content>
			</Dialog.Root>
		{:else}
			<Button href="/login">Register to Bid</Button>
		{/if}
	</aside>
</section>

<section class="flex flex-col pt-12">
	<section>
		<h2 class="pb-8 font-headers text-2xl">Description</h2>
		<p>{auction?.description}</p>
	</section>
	<Separator class="my-8" />
</section>
