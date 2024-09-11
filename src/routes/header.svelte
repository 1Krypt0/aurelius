<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import logo from '$lib/assets/Aurelius.svg';
	import { Menu, Landmark, UserIcon, LogOut } from 'lucide-svelte';

	import type { User } from 'lucia';

	export let user: User | null;
</script>

<header class="flex justify-center border-b border-b-border py-4">
	<nav class="flex w-4/5 items-center md:justify-between">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Menu class="text-primary md:hidden" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item>
					<a class="font-headers text-foreground" href="/auctions">Auctions</a>
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				{#if user}
					<DropdownMenu.Group>
						<DropdownMenu.Sub>
							<DropdownMenu.SubTrigger>
								<p class="font-headers">{user.name}</p>
							</DropdownMenu.SubTrigger>
							<DropdownMenu.SubContent>
								<DropdownMenu.Item>
									<a href={`/users/${user.id}/auctions`} class="flex items-center">
										<Landmark class="mr-2 h-4 w-4" />
										<span>My Auctions</span>
									</a>
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<a href={`/users/${user.id}`} class="flex items-center">
										<UserIcon class="mr-2 h-4 w-4" />
										<span>Profile</span>
									</a>
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<LogOut class="mr-2 h-4 w-4" />
									<form action="/logout" method="post">
										<button type="submit">Logout</button>
									</form>
								</DropdownMenu.Item>
							</DropdownMenu.SubContent>
						</DropdownMenu.Sub>
					</DropdownMenu.Group>
				{:else}
					<DropdownMenu.Item>
						<a href="/login" class="font-headers">Login/Sign Up</a>
					</DropdownMenu.Item>
				{/if}
			</DropdownMenu.Content>
		</DropdownMenu.Root>

		<div class="hidden grow basis-0 md:flex">
			<a class="font-headers text-3xl text-foreground hover:underline" href="/auctions">
				Auctions
			</a>
		</div>

		<a href="/" class="mx-auto">
			<img src={logo} alt="Logo" class="h-28" />
		</a>

		<div class="hidden grow basis-0 justify-end md:flex">
			{#if user}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button variant="link" builders={[builder]}>
							<p class="font-headers text-3xl text-foreground hover:underline">
								{user.name}
							</p>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-72">
						<DropdownMenu.Group>
							<DropdownMenu.Item>
								<a href={`/users/${user.id}/auctions`} class="flex items-center">
									<Landmark class="mr-2 h-4 w-4" />
									<span>My Auctions</span>
								</a>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<a href={`/users/${user.id}`} class="flex items-center">
									<UserIcon class="mr-2 h-4 w-4" />
									<span>Profile</span>
								</a>
							</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>
							<LogOut class="mr-2 h-4 w-4" />
							<form action="/logout" method="post">
								<button type="submit">Logout</button>
							</form>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<a href="/login" class="font-headers text-3xl text-foreground hover:underline">
					Login/Sign up</a
				>
			{/if}
		</div>
	</nav>
</header>
