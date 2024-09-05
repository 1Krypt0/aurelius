<script>
	import '../../app.css';
	import Header from '../header.svelte';
	import Footer from '../footer.svelte';
</script>

<div class="grid min-h-screen grid-rows-layout">
	<Header />
	<main class="mx-auto w-4/5 py-12">
		<slot />
	</main>
	<Footer />
</div>
