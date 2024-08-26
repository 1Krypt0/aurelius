<script lang="ts">
	import logo from '$lib/assets/Aurelius.svg';
	import user from '$lib/assets/user.svg';
</script>

<div class="bg-white text-black flex justify-between items-center bottom-0 left-0">
	<div class="flex justify-center gap-16 flex-1 mr-auto">
		<div>
			<a href="/auctions" class="pl-20 font-normal text-2xl">Auctions</a>
		</div>

		<div class="pl-32">
			<a href="/store" class="font-normal text-2xl">Buy Now</a>
		</div>
	</div>

	<div class="flex flex-1 justify-center">
		<a href="/home">
			<img src={logo} alt="Logo" class="h-36" />
		</a>
	</div>

	<div class="flex flex-1 ml-auto justify-center">
		<img src={user} alt="User" class="px-2" />
		<a href="/login">
			<p class="font-normal text-2xl">Login/Sign in</p>
		</a>
	</div>
</div>
