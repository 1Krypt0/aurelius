<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import * as Card from '$lib/components/ui/card';

	export let auctionLink: string = '';

	const genRandom = (min: number, max: number): number => {
		return min + Math.floor(Math.random() * max);
	};
</script>

<Carousel.Root class="w-full">
	<Carousel.Content>
		{#each [0, 1, 2, 3, 4, 5] as i (i)}
			<Carousel.Item class="w-full">
				<Card.Root>
					<Card.Content
						class="flex aspect-square max-h-[350px] w-full items-center justify-center  p-6 lg:aspect-video"
					>
						{#if auctionLink !== ''}
							<a href={auctionLink} class="contents">
								<img
									src={`https://picsum.photos/id/277/${genRandom(1, 10) * 100}/${genRandom(1, 10) * 100}`}
									alt="Product Showcase"
									class="max-h-full max-w-full object-scale-down"
								/>
							</a>
						{:else}
							<img
								src={`https://picsum.photos/id/277/${genRandom(1, 10) * 100}/${genRandom(1, 10) * 100}`}
								alt="Product Showcase"
								class="max-h-full max-w-full object-scale-down"
							/>
						{/if}
					</Card.Content>
				</Card.Root>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous />
	<Carousel.Next />
</Carousel.Root>
