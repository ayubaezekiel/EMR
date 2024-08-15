import { Button, Checkbox, DropdownMenu } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type Insurance = {
	id: string;
	name: string;
	HMO: string;
	email: string;
	phone: string;
};

export const hmo_plans: ColumnDef<Insurance>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
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
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
	},
	{
		accessorKey: "email",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Email
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
	},
	{
		accessorKey: "HMO",
		header: () => <div className="text-right">HMO</div>,
		cell: ({ row }) => {
			return (
				<div className="text-right font-medium">{row.getValue("HMO")}</div>
			);
		},
	},
	{
		accessorKey: "phone",
		header: () => <div className="text-right">Phone</div>,
		cell: ({ row }) => {
			return (
				<div className="text-right font-medium">{row.getValue("phone")}</div>
			);
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const payment = row.original;

			return (
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Label>Actions</DropdownMenu.Label>
						<DropdownMenu.Item
							onClick={() => navigator.clipboard.writeText(payment.id)}
						>
							Copy payment ID
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>View customer</DropdownMenu.Item>
						<DropdownMenu.Item>View payment details</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			);
		},
	},
];
