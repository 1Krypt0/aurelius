<script lang="ts">
	import type { SelectProduct, SelectUser } from '../../../database/schema';

	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import DataTableActions from './data-table-actions.svelte';

	import { readable } from 'svelte/store';
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import DataTableBoolCell from './data-table-bool-cell.svelte';

	export let auctions: { product: SelectProduct; user: SelectUser | null }[];

	const table = createTable(readable(auctions), {
		page: addPagination({ initialPageSize: 6 }),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columns = table.createColumns([
		table.column({
			accessor: ({ product }) => product.name,
			header: 'Name',
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: ({ product }) => product.price,
			header: 'Price',
			cell: ({ value }) => {
				return new Intl.NumberFormat(undefined, {
					style: 'currency',
					currency: 'EUR'
				}).format(value);
			},
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: ({ product }) => product.startDate,
			header: 'Start Date',
			cell: ({ value }) => {
				return new Intl.DateTimeFormat(undefined, {
					month: 'short',
					year: 'numeric',
					day: '2-digit',
					hour: 'numeric',
					minute: 'numeric'
				}).format(value);
			},
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: ({ product }) => product.endDate,
			header: 'End Date',
			cell: ({ value }) => {
				return new Intl.DateTimeFormat(undefined, {
					month: 'short',
					year: 'numeric',
					day: '2-digit',
					hour: 'numeric',
					minute: 'numeric'
				}).format(value);
			},
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: ({ product }) => product.sold,
			id: 'sold',
			header: 'Sold',
			cell: ({ value }) => {
				return createRender(DataTableBoolCell, { value });
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: ({ user }) => user?.name,
			header: 'Sold to',
			cell: ({ value }) => {
				return value ?? 'None';
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: ({ product }) => product.paid,
			header: 'Paid',
			cell: ({ value }) => {
				return createRender(DataTableBoolCell, { value });
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: ({ product }) => product.id,
			header: '',
			cell: ({ value }) => {
				return createRender(DataTableActions, { id: value });
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex, pageCount } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
</script>

<div class="">
	<div class="flex items-center py-4">
		<Input
			class="max-w-sm"
			placeholder="Filter Auctions..."
			type="text"
			bind:value={$filterValue}
		/>
	</div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
									<Table.Head {...attrs}>
										<Render of={cell.render()} />
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										{#if cell.id === 'Name'}
											<a
												href={`/auctions/${cell.row.original.product.id}`}
												class="flex max-w-48 truncate hover:underline"
											>
												<Render of={cell.render()} />
											</a>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-center space-x-4 py-4">
		<Button
			variant="default"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<p>Page {$pageIndex + 1} of {$pageCount == 0 ? 1 : $pageCount}</p>
		<Button
			variant="default"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>
