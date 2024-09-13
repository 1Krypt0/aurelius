<script lang="ts">
	import '../../app.css';
	import { Header } from '$lib/components/header';
	import Footer from '../footer.svelte';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	$: user = data.user;
</script>

<div class="grid min-h-screen grid-rows-layout">
	<Header {user} />
	<main class="mx-auto w-4/5 py-12">
		<slot />
	</main>
	<Footer />
</div>
