<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	$: auction = data.auction;
</script>

<p>This is the page to edit auction {auction.name}</p>
