<script lang="ts">
	import type { User } from 'lucia';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Menu } from 'lucide-svelte';
	import NavLink from './nav-link.svelte';

	export let user: User | null;
	export let links;
</script>

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
						{#each links as link}
							<DropdownMenu.Item>
								<NavLink {...link} />
							</DropdownMenu.Item>
						{/each}
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
