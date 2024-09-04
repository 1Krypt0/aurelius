<script lang="ts">
	import logo from '$lib/assets/Aurelius.svg';
</script>

<header class="flex justify-center border-b border-b-border py-4">
	<nav class="flex w-3/4 items-center justify-between">
		<a class="font-headers text-3xl text-foreground hover:underline" href="/auctions"> Auctions </a>

		<a href="/">
			<img src={logo} alt="Logo" class="h-28" />
		</a>

		<a href="/login" class="font-headers text-3xl text-foreground hover:underline">
			Log in/Sign up
		</a>
	</nav>
</header>
