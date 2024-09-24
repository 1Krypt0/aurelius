<script lang="ts">
	import type { SelectImage, SelectProduct } from '../../../../../database/schema';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	export let auction: { product: SelectProduct; images: SelectImage[] };

	const auctionLink = `/auctions/${auction.product.id}`;
	const checkoutLink = `/checkout/${auction.product.id}`;

	const genRandom = (min: number, max: number): number => {
		return min + Math.floor(Math.random() * max);
	};

	const formattedPrice = new Intl.NumberFormat('pt-PT', {
		style: 'currency',
		currency: 'EUR'
	}).format(auction.product.price);
</script>

<section class="flex flex-col gap-8 md:flex-row">
	<Card.Root class="w-full md:w-1/3">
		<Card.Content
			class="flex aspect-square max-h-[350px] w-full items-center justify-center  p-6 lg:aspect-video"
		>
			<a href={auctionLink} class="contents">
				<img
					src={auction.images.length === 0
						? `https://picsum.photos/id/277/${genRandom(1, 10) * 100}/${genRandom(1, 10) * 100}`
						: auction.images[0].url}
					alt="Product Showcase"
					class="max-h-full max-w-full object-scale-down"
				/>
			</a>
		</Card.Content>
	</Card.Root>
	<div class="flex w-full flex-col justify-center gap-4 md:w-1/2">
		<p class="md:truncate">
			Name: <a href={auctionLink} class=" hover:underline">{auction.product.name}</a>
		</p>
		<p>Your Bid: {formattedPrice}</p>
		<Button href={checkoutLink} class="w-full md:w-56">Pay</Button>
	</div>
</section>
