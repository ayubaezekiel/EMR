import { Button, DropdownMenu, Table, TextField } from "@radix-ui/themes";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	filterer: string;
	filterLabel: string;
}
export function DataTable<TData, TValue>({
	columns,
	data,
	filterer,
	filterLabel,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="w-full">
			<div className="flex items-center py-4 justify-between">
				<TextField.Root
					placeholder={filterLabel}
					value={
						(table.getColumn(`${filterer}`)?.getFilterValue() as string) ?? ""
					}
					onChange={(event) =>
						table.getColumn(`${filterer}`)?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Button variant="soft" className="ml-auto">
							Columns <ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenu.CheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenu.CheckboxItem>
								);
							})}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
			<div className="rounded-md border">
				<Table.Root>
					<Table.Header>
						{table.getHeaderGroups().map((headerGroup) => (
							<Table.Row key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Table.ColumnHeaderCell key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</Table.ColumnHeaderCell>
									);
								})}
							</Table.Row>
						))}
					</Table.Header>
					<Table.Body>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<Table.Row
									className="hover:bg-[var(--accent-3)] cursor-pointer"
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<Table.Cell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</Table.Cell>
									))}
								</Table.Row>
							))
						) : (
							<Table.Row>
								<Table.Cell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</Table.Cell>
							</Table.Row>
						)}
					</Table.Body>
				</Table.Root>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="soft"
						size="1"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="soft"
						size="1"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
