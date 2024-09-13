<script lang="ts">
	import type { SelectProduct } from '../../../../../database/schema';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	export let auction: SelectProduct;

	const auctionLink = `/auctions/${auction.id}`;

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
		<p>Name: <a href={auctionLink} class="hover:underline">{auction.name}</a></p>
		<p>Your Bid: {auction.price}€</p>
		<Button href="/checkout" class="w-56">Pay</Button>
	</div>
</section>
