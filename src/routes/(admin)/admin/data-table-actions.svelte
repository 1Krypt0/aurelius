<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import DataTableDelete from './data-table-delete.svelte';

	export let id: string;

	const actions = {
		delete: false
	};
</script>

<DataTableDelete isOpen={actions.delete} {id} />

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item on:click={() => navigator.clipboard.writeText(id)}>
				Copy Auction ID
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item href={`/admin/${id}/edit`}>Edit Details</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => (actions.delete = true)}>
			Terminate Auction
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
