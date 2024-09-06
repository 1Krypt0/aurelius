<script lang="ts">
	import { Instagram, Facebook, Twitter } from 'lucide-svelte';
</script>

<footer class="flex justify-center bg-primary py-4 text-sm text-foreground">
	<nav
		class="flex w-4/5 flex-col items-center justify-between gap-2 text-center md:flex-row md:gap-0 md:text-start"
	>
		<div class="flex grow basis-0 flex-col items-center justify-center gap-2">
			<a href="/about" class=" hover:underline">About us</a>
			<div class="flex gap-2">
				<a href="https://www.instagram.com/">
					<Instagram strokeWidth="1.5" />
				</a>
				<a href="https://www.facebook.com/">
					<Facebook strokeWidth="1.5" />
				</a>
				<a href="https://www.x.com/">
					<Twitter strokeWidth="1.5" />
				</a>
			</div>
		</div>

		<p class="order-last md:order-none">Copyright © 2024 Atomic. All Rights Reserved.</p>

		<div class="flex grow basis-0 flex-col items-center justify-center gap-2">
			<a href="/terms-conditions" class="hover:underline">Terms and Conditions</a>
			<a href="/privacy-policy" class="hover:underline">Privacy Policy</a>
		</div>
	</nav>
</footer>
