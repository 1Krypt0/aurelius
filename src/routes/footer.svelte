<script lang="ts">
	import instagram from '$lib/assets/instagram.svg';
	import facebook from '$lib/assets/facebook.svg';
	import twitter from '$lib/assets/twitter.svg';
	import chevronDown from '$lib/assets/chevron-down.svg';
</script>

<div class="bg-gold text-white flex justify-between py-3 items-center bottom-0 left-0">
	<div class="flex justify-center gap-16 flex-1 mr-auto">
		<p class="font-semibold text-3xl">About us</p>

		<div class="flex gap-2 pt-2">
			<a target="_blank" href="https://www.instagram.com/">
				<img src={instagram} alt="" />
			</a>
			<a target="_blank" href="https://www.facebook.com/">
				<img src={facebook} alt="" />
			</a>
			<a target="_blank" href="https://www.twitter.com/">
				<img src={twitter} alt="" />
			</a>
		</div>
	</div>

	<p class="flex justify-center flex-1">© 2024 Atomic. All Rights Reserved.</p>

	<div class="flex flex-1 justify-center ml-auto">
		<p class="pr-1">Language</p>
		<img src={chevronDown} alt="" />
	</div>
</div>
