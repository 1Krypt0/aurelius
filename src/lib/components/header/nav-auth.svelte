<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '../ui/button';
	import NavLink from './nav-link.svelte';
	import type { User } from 'lucia';

	export let user: User | null;
	export let links;
</script>

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
				{#each links as link}
					<DropdownMenu.Item>
						<NavLink {...link} />
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{:else}
		<a href="/login" class="font-headers text-3xl text-foreground hover:underline">
			Login/Sign up</a
		>
	{/if}
</div>
