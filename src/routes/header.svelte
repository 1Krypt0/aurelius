<script lang="ts">
	import logo from '$lib/assets/Aurelius.svg';
</script>

<header class="flex justify-center border-b border-b-border py-4">
	<nav class="flex w-4/5 items-center justify-between">
		<div class="flex grow basis-0">
			<a class="font-headers text-3xl text-foreground hover:underline" href="/auctions">
				Auctions
			</a>
		</div>

		<a href="/">
			<img src={logo} alt="Logo" class="h-28" />
		</a>

		<div class="flex grow basis-0 justify-end">
			<a href="/login" class="font-headers text-3xl text-foreground hover:underline">
				Tiago Rodrigues
			</a>
		</div>
	</nav>
</header>
