import { Badge, Button, Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";

export const billing_analytics_columns: ColumnDef<DB["payments"]["Row"]>[] = [
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
		accessorKey: "created_at",
		header: "Date",
		cell: ({ row }) => (
			<div>{format(new Date(row.getValue("created_at")), "PPP")}</div>
		),
	},
	{
		accessorKey: "profile",
		header: "Approved By",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("profile")}</div>
		),
	},

	{
		accessorKey: "patients",
		header: "Patient",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("patients")}</div>
		),
	},
	{
		accessorKey: "payment_methods",
		header: "Payment Method",
		cell: ({ row }) => <div>{row.getValue("payment_methods")}</div>,
	},
	{
		accessorKey: "cash_points",
		header: "Cash Point",
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue("cash_points")}</div>
		),
	},
	{
		accessorKey: "services",
		header: "Services",
		cell: ({ row }) => (
			<div className="flex flex-wrap w-56">
				{JSON.parse(JSON.stringify(row.original.services)).map(
					(s: { name: string }) => (
						<Badge size={"3"} m={"1"}>
							{s.name}
						</Badge>
					),
				)}
			</div>
		),
	},
	{
		id: "service_type",
		header: "Service Type",
		cell: ({ row }) => (
			<div>
				{row.original.is_appointment ? (
					<Badge radius="full" style={{ width: "105px" }} size={"3"}>
						Appointment
					</Badge>
				) : row.original.is_admission ? (
					<Badge
						radius="full"
						style={{ width: "105px" }}
						color="purple"
						size={"3"}
					>
						Admission
					</Badge>
				) : (
					<Badge
						radius="full"
						style={{ width: "105px" }}
						color="orange"
						size={"3"}
					>
						Request
					</Badge>
				)}
			</div>
		),
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
		filterFn: "equals",
		cell: ({ row }) => (
			<div>N{new Intl.NumberFormat().format(row.getValue("amount"))}</div>
		),
	},
];
