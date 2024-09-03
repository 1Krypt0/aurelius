<script lang="ts">
	import { Facebook, Instagram, ChevronDown } from 'lucide-svelte';
</script>

<div class="flex items-center justify-between bg-primary py-3">
	<div class="mx-auto flex flex-1 justify-center gap-16">
		<a href="/about" class="hover:underline">About us</a>

		<!-- 	<div class="flex gap-2"> -->
		<!-- 		<a target="_blank" href="https://www.instagram.com/"> -->
		<!-- 			<Facebook /> -->
		<!-- 		</a> -->
		<!-- 		<a target="_blank" href="https://www.facebook.com/"> -->
		<!-- 			<Instagram /> -->
		<!-- 		</a> -->
		<!-- 	</div> -->
	</div>

	<p class=" text-center">© 2024 Atomic. All Rights Reserved.</p>

	<div class="mx-auto flex flex-1 justify-center gap-16 text-[#212B2A]">
		<a href="/terms-conditions" class="hover:underline">Terms and Conditions</a>
		<a href="/privacy-policy" class="hover:underline">Privacy Policy</a>
	</div>
</div>
