<script lang="ts">
	import type { SelectProduct } from '../../../database/schema';
	import * as Carousel from '$lib/components/ui/carousel';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	export let auction: SelectProduct;

	const now = new Date();
	const buttonVal = auction.startDate <= now ? 'Bid' : 'Preview';
	const pricePrefix = auction.startDate <= now ? 'Current' : 'Starting';

	const auctionLink = `/auctions/${auction.id}`;

	const startDay = new Intl.DateTimeFormat(undefined, {
		month: 'short',
		day: 'numeric'
	}).format(auction.startDate);

	const endDay = new Intl.DateTimeFormat(undefined, {
		month: 'short',
		year: 'numeric',
		day: '2-digit'
	}).format(auction.endDate);

	const endHour = new Intl.DateTimeFormat(undefined, {
		hour: 'numeric',
		minute: 'numeric'
	}).format(auction.endDate);

	const genRandom = (min: number, max: number): number => {
		return min + Math.floor(Math.random() * max);
	};
</script>

<section class="flex flex-col gap-2">
	<Carousel.Root class=" w-full">
		<Carousel.Content>
			{#each [0, 1, 2, 3, 4, 5] as i (i)}
				<Carousel.Item class="w-full">
					<Card.Root>
						<Card.Content
							class="flex aspect-square max-h-[350px] w-full items-center justify-center p-6"
						>
							<a href={auctionLink} class="contents">
								<img
									src={`https://picsum.photos/id/277/${genRandom(1, 10) * 100}/${genRandom(1, 10) * 100}`}
									alt="Product Showcase"
									class="max-h-full max-w-full object-scale-down"
								/>
							</a>
						</Card.Content>
					</Card.Root>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>

	<a class="truncate hover:underline" href={auctionLink}>{auction.name}</a>
	<p class="truncate">
		{startDay} - {endDay} | {endHour}
	</p>
	<div class="flex items-center justify-between">
		<p>{pricePrefix} Price: {auction.price}€</p>
		<Button class="w-1/2" href={auctionLink}>
			{buttonVal}
		</Button>
	</div>
</section>
