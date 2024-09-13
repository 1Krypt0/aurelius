<script lang="ts">
	import x from '$lib/assets/x.svg';
	import facebook from '$lib/assets/facebook.svg';
	import instagram from '$lib/assets/instagram.svg';
	import FooterLink from './footer-link.svelte';

	const links = [
		{
			icon: instagram,
			link: 'https://www.instagram.com/'
		},
		{
			icon: facebook,
			link: 'https://www.facebook.com/'
		},
		{
			icon: x,
			link: 'https://www.x.com/'
		}
	];
</script>

<div class="flex grow basis-0 flex-col items-center justify-center gap-2">
	<a href="/about" class=" hover:underline">About us</a>

	<div class="flex gap-2">
		{#each links as social}
			<FooterLink {...social} />
		{/each}
	</div>
</div>
