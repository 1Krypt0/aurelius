<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import logo from '$lib/assets/Aurelius.svg';

	import type { User } from 'lucia';

	export let user: User | null;
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
							<DropdownMenu.Item>Profile</DropdownMenu.Item>
							<DropdownMenu.Item>Settings</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>
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
