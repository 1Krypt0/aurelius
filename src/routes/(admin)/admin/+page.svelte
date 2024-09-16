<script lang="ts">
	import DataTable from './data-table.svelte';

	export let data;

	$: auctions = data.auctions;
</script>

<section class="mx-auto w-3/4">
	<DataTable {auctions} />
</section>
