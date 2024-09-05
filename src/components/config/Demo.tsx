import React from "react";
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

// Define the data structure
type FinancialData = {
	amount: string;
	patient_id: string;
	payments_method_id: string;
	cash_points_id: string;
	services: string;
	approved_by: string;
	created_at: string;
	is_appointment: boolean;
	is_request: boolean;
	request_id: string;
	appointment_id: string;
	is_admission: boolean;
	admissions_id: string;
	id: string;
};

// Generate sample data
const data: FinancialData[] = Array.from({ length: 50 }, (_, i) => ({
	amount: `$${Math.floor(Math.random() * 10000)}`,
	patient_id: `P${1000 + i}`,
	payments_method_id: ["Cash", "Credit Card", "Insurance"][
		Math.floor(Math.random() * 3)
	],
	cash_points_id: `CP${100 + i}`,
	services: ["Consultation", "Surgery", "Lab Test"][
		Math.floor(Math.random() * 3)
	],
	approved_by: `User${1000 + i}`,
	created_at: new Date(
		Date.now() - Math.floor(Math.random() * 10000000000),
	).toISOString(),
	is_appointment: Math.random() > 0.5,
	is_request: Math.random() > 0.5,
	request_id: `R${2000 + i}`,
	appointment_id: `A${3000 + i}`,
	is_admission: Math.random() > 0.5,
	admissions_id: `ADM${4000 + i}`,
	id: `ID${5000 + i}`,
}));

// Define columns
const columns: ColumnDef<FinancialData>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "amount",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Amount
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue("amount")}</div>
		),
	},
	{
		accessorKey: "patient_id",
		header: "Patient ID",
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue("patient_id")}</div>
		),
	},
	{
		accessorKey: "payments_method_id",
		header: "Payment Method",
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue("payments_method_id")}</div>
		),
	},
	{
		accessorKey: "services",
		header: "Services",
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue("services")}</div>
		),
	},
	{
		accessorKey: "approved_by",
		header: "Approved By",
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue("approved_by")}</div>
		),
	},
	{
		accessorKey: "created_at",
		header: "Created At",
		cell: ({ row }) => (
			<div>{format(new Date(row.getValue("created_at")), "PPP")}</div>
		),
	},
	{
		accessorKey: "is_appointment",
		header: "Is Appointment",
		cell: ({ row }) => (
			<div>{row.getValue("is_appointment") ? "Yes" : "No"}</div>
		),
	},
	{
		accessorKey: "is_request",
		header: "Is Request",
		cell: ({ row }) => <div>{row.getValue("is_request") ? "Yes" : "No"}</div>,
	},
	{
		accessorKey: "is_admission",
		header: "Is Admission",
		cell: ({ row }) => <div>{row.getValue("is_admission") ? "Yes" : "No"}</div>,
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const payment = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(payment.id)}
						>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export default function FinancialAnalyticsTable() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
		from: addDays(new Date(), -30),
		to: new Date(),
	});

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

	React.useEffect(() => {
		if (dateRange?.from && dateRange?.to) {
			table.getColumn("created_at")?.setFilterValue((row: any) => {
				const rowDate = new Date(row);
				return rowDate >= dateRange.from! && rowDate <= dateRange.to!;
			});
		}
	}, [dateRange]);

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter by patient ID..."
					value={
						(table.getColumn("patient_id")?.getFilterValue() as string) ?? ""
					}
					onChange={(event) =>
						table.getColumn("patient_id")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline" className="ml-4">
							{dateRange?.from ? (
								dateRange.to ? (
									<>
										{format(dateRange.from, "LLL dd, y")} -{" "}
										{format(dateRange.to, "LLL dd, y")}
									</>
								) : (
									format(dateRange.from, "LLL dd, y")
								)
							) : (
								<span>Pick a date range</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="end">
						<Calendar
							initialFocus
							mode="range"
							defaultMonth={dateRange?.from}
							selected={dateRange}
							onSelect={setDateRange}
							numberOfMonths={2}
						/>
					</PopoverContent>
				</Popover>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
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























import { Calendar } from "@/components/ui/calendar";
import { useBilling } from "@/lib/hooks";
import {
	Button,
	DropdownMenu,
	Popover,
	Select,
	Spinner,
	Table,
	TextField,
} from "@radix-ui/themes";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
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
import { billing_analytics_columns } from "../table/columns/billing_analytics";

export default function FinancialAnalytics() {
	const { billing_data, isBillingPending } = useBilling();
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: addDays(new Date(), -30),
		to: new Date(),
	});

	const data =
		useMemo(
			() =>
				billing_data?.map((d) => ({
					...d,
					payment_methods: d.payment_methods?.name,
					cash_points: d.cash_points?.name,
					services: d.services,
					profile: `${d.profile?.first_name} ${d.profile?.middle_name ?? ""} ${d.profile?.last_name}`,
					patients: `${d.patients?.first_name} ${d.patients?.middle_name ?? ""} ${d.patients?.last_name} - [${d.id.slice(0, 8).toUpperCase()}]`,
				})),
			[billing_data],
		) ?? [];

	const table = useReactTable({
		data,
		columns: billing_analytics_columns,
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

	console.log(table.getState().columnFilters);

	const exportToCSV = () => {
		const headers = ["Date", "Revenue", "Expenses", "Profit"];
		const csvContent = [
			headers.join(","),
			...data.map((row) =>
				[
					row.created_at,
					row.patient_id,
					row.payments_method_id,
					row.services,
					row.approved_by,
					row.is_admission,
					row.is_appointment,
					row.is_request,
				].join(","),
			),
		].join("\n");

		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		const link = document.createElement("a");
		if (link.download !== undefined) {
			const url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", "financial_data.csv");
			link.style.visibility = "hidden";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	};

	return isBillingPending ? (
		<Spinner />
	) : (
		<div className="container mx-auto p-4 space-y-4">
			<div className="h-[400px]">
				<Analytics />
			</div>
			<h1 className="text-2xl font-bold mb-4">Financial Analytics</h1>
			<div className="grid grid-cols-4 gap-2">
				<TextField.Root
					placeholder="Filter by patient..."
					value={
						(table.getColumn("patients")?.getFilterValue() as string) ?? ""
					}
					onChange={(event) =>
						table.getColumn("patients")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<TextField.Root
					placeholder="Filter by amount..."
					value={(table.getColumn("amount")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("amount")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>

				<TextField.Root
					placeholder="Filter by cashpoint..."
					value={
						(table.getColumn("cash_points")?.getFilterValue() as string) ?? ""
					}
					onChange={(event) =>
						table.getColumn("cash_points")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<TextField.Root
					placeholder="Filter by who approved..."
					value={(table.getColumn("profile")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("profile")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
			</div>

			<div className="flex justify-between items-center mb-4">
				<Popover.Root>
					<Popover.Trigger>
						<Button variant={"outline"}>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{dateRange?.from ? (
								dateRange.to ? (
									<>
										{format(dateRange.from, "LLL dd, y")} -{" "}
										{format(dateRange.to, "LLL dd, y")}
									</>
								) : (
									format(dateRange.from, "LLL dd, y")
								)
							) : (
								<span>Pick a date range</span>
							)}
						</Button>
					</Popover.Trigger>
					<Popover.Content className="w-auto p-0" align="start">
						<Calendar
							initialFocus
							mode="range"
							defaultMonth={dateRange?.from}
							selected={dateRange}
							onSelect={setDateRange}
							numberOfMonths={2}
						/>
					</Popover.Content>
				</Popover.Root>
				<div className="flex justify-end gap-2">
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
					<Button onClick={exportToCSV}>Export to CSV</Button>
				</div>
			</div>

			<div className="rounded-md border">
				<Table.Root>
					<Table.Header>
						{table.getHeaderGroups().map((headerGroup) => (
							<Table.Row key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Table.RowHeaderCell key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</Table.RowHeaderCell>
									);
								})}
							</Table.Row>
						))}
					</Table.Header>
					<Table.Body>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<Table.Row
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
									colSpan={billing_analytics_columns.length}
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
						variant="outline"
						size={"2"}
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size={"2"}
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

const chartData = [
	{ date: "2024-04-01", amount: 222 },
	{ date: "2024-04-02", amount: 97 },
	{ date: "2024-04-03", amount: 167 },
	{ date: "2024-04-04", amount: 242 },
	{ date: "2024-04-05", amount: 373 },
	{ date: "2024-04-06", amount: 301 },
	{ date: "2024-04-07", amount: 245 },
	{ date: "2024-04-08", amount: 409 },
	{ date: "2024-04-09", amount: 59 },
	{ date: "2024-04-10", amount: 261 },
	{ date: "2024-04-11", amount: 327 },
	{ date: "2024-04-12", amount: 292 },
	{ date: "2024-04-13", amount: 342 },
	{ date: "2024-04-14", amount: 137 },
	{ date: "2024-04-15", amount: 120 },
	{ date: "2024-04-16", amount: 138 },
	{ date: "2024-04-17", amount: 446 },
	{ date: "2024-04-18", amount: 364 },
	{ date: "2024-04-19", amount: 243 },
	{ date: "2024-04-20", amount: 89 },
	{ date: "2024-04-21", amount: 137 },
	{ date: "2024-04-22", amount: 224 },
	{ date: "2024-04-23", amount: 138 },
	{ date: "2024-04-24", amount: 387 },
	{ date: "2024-04-25", amount: 215 },
	{ date: "2024-04-26", amount: 75 },
	{ date: "2024-04-27", amount: 383 },
	{ date: "2024-04-28", amount: 122 },
	{ date: "2024-04-29", amount: 315 },
	{ date: "2024-04-30", amount: 454 },
	{ date: "2024-05-01", amount: 165 },
	{ date: "2024-05-02", amount: 293 },
	{ date: "2024-05-03", amount: 247 },
	{ date: "2024-05-04", amount: 385 },
	{ date: "2024-05-05", amount: 481 },
	{ date: "2024-05-06", amount: 498 },
	{ date: "2024-05-07", amount: 388 },
	{ date: "2024-05-08", amount: 149 },
	{ date: "2024-05-09", amount: 227 },
	{ date: "2024-05-10", amount: 293 },
	{ date: "2024-05-11", amount: 335 },
	{ date: "2024-05-12", amount: 197 },
	{ date: "2024-05-13", amount: 197 },
	{ date: "2024-05-14", amount: 448 },
	{ date: "2024-05-15", amount: 473 },
	{ date: "2024-05-16", amount: 338 },
	{ date: "2024-05-17", amount: 499 },
	{ date: "2024-05-18", amount: 315 },
	{ date: "2024-05-19", amount: 235 },
	{ date: "2024-05-20", amount: 177 },
	{ date: "2024-05-21", amount: 82 },
	{ date: "2024-05-22", amount: 81 },
	{ date: "2024-05-23", amount: 252 },
	{ date: "2024-05-24", amount: 294 },
	{ date: "2024-05-25", amount: 201 },
	{ date: "2024-05-26", amount: 213 },
	{ date: "2024-05-27", amount: 420 },
	{ date: "2024-05-28", amount: 233 },
	{ date: "2024-05-29", amount: 78 },
	{ date: "2024-05-30", amount: 340 },
	{ date: "2024-05-31", amount: 178 },
	{ date: "2024-06-01", amount: 178 },
	{ date: "2024-06-02", amount: 470 },
	{ date: "2024-06-03", amount: 103 },
	{ date: "2024-06-04", amount: 439 },
	{ date: "2024-06-05", amount: 88 },
	{ date: "2024-06-06", amount: 294 },
	{ date: "2024-06-07", amount: 323 },
	{ date: "2024-06-08", amount: 385 },
	{ date: "2024-06-09", amount: 438 },
	{ date: "2024-06-10", amount: 155 },
	{ date: "2024-06-11", amount: 92 },
	{ date: "2024-06-12", amount: 492 },
	{ date: "2024-06-13", amount: 81 },
	{ date: "2024-06-14", amount: 426 },
	{ date: "2024-06-15", amount: 307 },
	{ date: "2024-06-16", amount: 371 },
	{ date: "2024-06-17", amount: 475 },
	{ date: "2024-06-18", amount: 107 },
	{ date: "2024-06-19", amount: 341 },
	{ date: "2024-06-20", amount: 408 },
	{ date: "2024-06-21", amount: 169 },
	{ date: "2024-06-22", amount: 317 },
	{ date: "2024-06-23", amount: 480 },
	{ date: "2024-06-24", amount: 132 },
	{ date: "2024-06-25", amount: 141 },
	{ date: "2024-06-26", amount: 434 },
	{ date: "2024-06-27", amount: 448 },
	{ date: "2024-06-28", amount: 149 },
	{ date: "2024-06-29", amount: 103 },
	{ date: "2024-06-30", amount: 446 },
];

const chartConfig = {
	amount: {
		label: "Amount",
		color: "hsl(var(--chart-1))",
	},
	date: {
		label: "Date",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export function Analytics() {
	const [timeRange, setTimeRange] = useState("90d");

	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date);
		const now = new Date();
		let daysToSubtract = 90;
		if (timeRange === "30d") {
			daysToSubtract = 30;
		} else if (timeRange === "7d") {
			daysToSubtract = 7;
		}
		now.setDate(now.getDate() - daysToSubtract);
		return date >= now;
	});

	return (
		<Card>
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1 text-center sm:text-left">
					<CardTitle>Area Chart - Interactive</CardTitle>
					<CardDescription>
						Showing total results for the last 3 months
					</CardDescription>
				</div>
				<Select.Root value={timeRange} onValueChange={setTimeRange}>
					<Select.Trigger
						className="w-[160px] rounded-lg sm:ml-auto"
						aria-label="Select a value"
						placeholder="Last 3 months"
					/>

					<Select.Content className="rounded-xl">
						<Select.Item value="90d" className="rounded-lg">
							Last 3 months
						</Select.Item>
						<Select.Item value="30d" className="rounded-lg">
							Last 30 days
						</Select.Item>
						<Select.Item value="7d" className="rounded-lg">
							Last 7 days
						</Select.Item>
					</Select.Content>
				</Select.Root>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<AreaChart data={filteredData}>
						<defs>
							<linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-amount)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-amount)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
										});
									}}
									indicator="dot"
								/>
							}
						/>
						<Area
							dataKey="amount"
							type="natural"
							fill="url(#fillAmount)"
							stroke="var(--color-amount)"
							stackId="a"
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}







	const filteredData = useMemo(() => {
		return data.filter((item) => {
			const dateInRange = dateRange
				? new Date(item.created_at!) >= dateRange.from! &&
					new Date(item.created_at!) <= (dateRange.to! || dateRange.from!)
				: true;
			// const matchesFilters =
			// 	item.amount.toString().includes(filters.revenue) &&
			// 	item.expenses.toString().includes(filters.expenses) &&
			// 	item.profit.toString().includes(filters.profit);
			return dateInRange;
		});
	}, [dateRange]);