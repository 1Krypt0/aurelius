<script lang="ts">
	import type { User } from 'lucia';
	import { Landmark, UserIcon, LogOut, ClipboardList } from 'lucide-svelte';
	import NavMobile from './nav-mobile.svelte';
	import logo from '$lib/assets/Aurelius.svg';
	import NavAuth from './nav-auth.svelte';

	export let user: User | null = null;
	export let variant: 'simple' | 'full' = 'full';
	export let isAdmin: boolean = false;

	const links =
		user && variant == 'full'
			? [
					{
						link: `/users/${user.id}/auctions`,
						icon: Landmark,
						text: 'My Auctions'
					},
					{
						link: `/users/${user.id}`,
						icon: UserIcon,
						text: 'Profile'
					},
					{
						link: '/logout',
						icon: LogOut,
						text: 'Logout'
					}
				]
			: undefined;

	if (links && isAdmin) {
		links.pop();
		links.push({
			link: '/admin',
			icon: ClipboardList,
			text: 'Inventory'
		});
		links.push({
			link: '/logout',
			icon: LogOut,
			text: 'Logout'
		});
	}
</script>

<header class="flex justify-center border-b border-b-border py-4">
	<nav class="flex w-4/5 items-center md:justify-between">
		{#if variant === 'full'}
			<NavMobile {user} {links} />

			<div class="hidden grow basis-0 md:flex">
				<a class="font-headers text-3xl text-foreground hover:underline" href="/auctions">
					Auctions
				</a>
			</div>
		{/if}

		<a href="/" class="mx-auto">
			<img src={logo} alt="Logo" class="h-28" />
		</a>

		{#if variant === 'full'}
			<NavAuth {user} {links} />
		{/if}
	</nav>
</header>
