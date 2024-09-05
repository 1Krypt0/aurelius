<script lang="ts">
	import SimpleHeader from './simple-header.svelte';
</script>

<div class="grid min-h-screen grid-rows-layout">
	<SimpleHeader />
	<main class="mx-auto w-4/5 py-12">
		<slot />
	</main>
</div>
