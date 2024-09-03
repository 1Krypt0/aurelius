<script lang="ts">
	import logo from '$lib/assets/Aurelius.svg';
</script>

<nav class="flex items-center justify-between border-b border-b-border py-4">
	<a
		class="mx-auto flex flex-1 justify-center font-headers text-2xl text-foreground hover:underline"
		href="/auctions"
	>
		Auctions
	</a>

	<a class="flex flex-1 justify-center" href="/">
		<img src={logo} alt="Logo" class="h-28" />
	</a>

	<a
		href="/login"
		class="mx-auto flex flex-1 items-center justify-center gap-4 font-headers text-2xl text-foreground hover:underline"
	>
		Log in/Sign up
	</a>
</nav>
