<script lang="ts">
	import '../../app.css';
	import { Header } from '$lib/components/header';
	import { Footer } from '$lib/components/footer';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	$: user = data.user;
	$: isAdmin = data.isAdmin;
</script>

<div class="grid min-h-screen grid-rows-layout">
	<Header {user} {isAdmin} />
	<main class="mx-auto w-4/5 py-12">
		<slot />
	</main>
	<Footer />
</div>
