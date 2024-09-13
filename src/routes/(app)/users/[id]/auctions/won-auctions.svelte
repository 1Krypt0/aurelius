<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import WonAuctionItem from './won-auction-item.svelte';

	export let wonItems;
</script>

<section class="flex">
	<aside class=" w-1/4 md:block">
		<h2 class="font-headers text-2xl">Won Items</h2>
		<Separator class="my-4" />
	</aside>
	<section class="mx-auto w-3/4 px-12">
		<div class="flex flex-col gap-8">
			{#each wonItems as auction}
				<WonAuctionItem {auction} />
			{/each}
		</div>
	</section>
</section>
