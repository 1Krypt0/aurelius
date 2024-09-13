<script lang="ts">
	import { Header } from '$lib/components/header';
</script>

<div class="grid min-h-screen grid-rows-layout">
	<Header variant="simple" />
	<main class="mx-auto w-4/5 py-12">
		<slot />
	</main>
</div>
