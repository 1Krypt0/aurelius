<script lang="ts">
	import type { SelectProduct, SelectBid } from '../../../../../database/schema';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	export let auction: { product: SelectProduct };
	export let bids: { bid: SelectBid }[];

	const highestBid = bids.sort((a, b) => b.bid.value - a.bid.value)[0];

	const auctionLink = `/auctions/${auction.product.id}`;

	const genRandom = (min: number, max: number): number => {
		return min + Math.floor(Math.random() * max);
	};
</script>

<section class="flex gap-8">
	<Card.Root class="w-1/4">
		<Card.Content class="flex aspect-square max-h-[350px] w-full items-center justify-center p-6">
			<a href={auctionLink} class="contents">
				<img
					src={`https://picsum.photos/id/277/${genRandom(1, 10) * 100}/${genRandom(1, 10) * 100}`}
					alt="Product Showcase"
					class="max-h-full max-w-full object-scale-down"
				/>
			</a>
		</Card.Content>
	</Card.Root>
	<div class="flex w-3/4 flex-col justify-center gap-4">
		<p>Name: <a href={auctionLink} class="hover:underline">{auction.product.name}</a></p>
		<p>Your Bid: {highestBid.bid.value}€</p>
		<p>Highest Bid: {auction.product.price}€</p>
		<Button href={auctionLink} class="w-56">Increase Bid</Button>
	</div>
</section>
