<script lang="ts">
	import AboutLinks from './about-links.svelte';
	import BusinessLinks from './business-links.svelte';
</script>

<footer class="flex justify-center bg-primary py-4 text-sm text-foreground">
	<nav
		class="flex w-4/5 flex-col items-center justify-between gap-2 text-center md:flex-row md:gap-0 md:text-start"
	>
		<AboutLinks />

		<p class="order-last md:order-none">Copyright © 2024 Atomic. All Rights Reserved.</p>

		<BusinessLinks />
	</nav>
</footer>
