<script>
	import '../app.css';
	import Header from './header.svelte';
	import Footer from './footer.svelte';
</script>

<div class="min-h-full grid grid-rows-layout">
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
</div>
