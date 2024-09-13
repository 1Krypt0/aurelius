<script lang="ts">
	import SearchBar from '../../(app)/auctions/search-bar.svelte';
	import DataTable from './data-table.svelte';

	export let data;

	$: auctions = data.auctions;
</script>

<section class="mx-auto w-3/4">
	<SearchBar />
	<DataTable {auctions} />
</section>
