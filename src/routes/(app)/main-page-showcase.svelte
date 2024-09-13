<script lang="ts">
	import type { SelectProduct } from '../../database/schema';

	import { Separator } from '$lib/components/ui/separator';
	import { AuctionShowcase } from '$lib/components/auction';

	export let title: string;
	export let auctions: SelectProduct[];

	const SHOWCASE_LIMIT = 3;
</script>

{#if auctions.length >= SHOWCASE_LIMIT}
	<section>
		<div class="flex items-center justify-between">
			<h1 class="font-headers text-4xl font-bold">{title}</h1>
			<a href="/auctions" class="self-end hover:underline">View all</a>
		</div>

		<Separator class="my-4" />

		<div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
			{#each auctions as auction}
				<AuctionShowcase {auction} />
			{/each}
		</div>
	</section>
{/if}
