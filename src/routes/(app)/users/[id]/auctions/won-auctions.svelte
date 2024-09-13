<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import WonAuctionItem from './won-auction-item.svelte';

	export let wonItems;
</script>

<section class="flex flex-col md:flex-row md:gap-12">
	<aside class="md:block md:w-1/3">
		<h2 class="text-center font-headers text-2xl md:text-start">Won Items</h2>
		<Separator class="my-4" />
	</aside>
	<section class="md:w-2/3">
		<div class="flex flex-col gap-8">
			{#each wonItems as auction}
				<WonAuctionItem {auction} />
			{/each}
		</div>
	</section>
</section>
