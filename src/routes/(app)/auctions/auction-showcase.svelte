<script lang="ts">
	import type { SelectProduct } from '../../../database/schema';
	import * as Carousel from '$lib/components/ui/carousel';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	export let auction: SelectProduct;

	const buttonVal = auction.startDate <= new Date() ? 'Bid' : 'Preview';

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
		hour: 'numeric'
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
					<div class="p-1">
						<Card.Root>
							<Card.Content class="flex aspect-square w-full items-center justify-center p-6">
								<a href={`/auctions/${auction.id}`} class="contents">
									<img
										src={`https://picsum.photos/id/${genRandom(0, 300)}/${genRandom(1, 10) * 100}/${genRandom(1, 10) * 100}`}
										alt="Product Showcase"
										class="max-h-full"
									/>
								</a>
							</Card.Content>
						</Card.Root>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>

	<p class="truncate">{auction.name}</p>
	<p class="truncate">
		{startDay} - {endDay} | {endHour}
	</p>
	<div class="flex items-center justify-between">
		<p>Price: {auction.price}€</p>
		<Button class="w-1/2" href={`/auction/${auction.id}`}>
			{buttonVal}
		</Button>
	</div>
</section>
