import { Button, Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { deleteHMOCompaniesAction } from "../../../../actions/config/insurance";
import { UpdateHMOCompaniesForm } from "../../../../forms/config/insurance/HMOCompanies";

export const hmo_companies_column: ColumnDef<DB["hmo_companies"]["Row"]>[] = [
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
		accessorKey: "phone",
		header: () => <div className="text-right">HMO</div>,
		cell: ({ row }) => {
			return (
				<div className="text-right font-medium">{row.getValue("phone")}</div>
			);
		},
	},
	{
		accessorKey: "address",
		header: () => <div className="text-right">Address</div>,
		cell: ({ row }) => {
			return (
				<div className="text-right font-medium">{row.getValue("address")}</div>
			);
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const comp = row.original;

			return (
				<div className="flex gap-4">
					<UpdateHMOCompaniesForm {...comp} />
					<DeleteActionForm
						id={comp.id}
						redirectTo="/dashboard/config"
						title="Delete HMO Company"
						warning="Are you sure? This HMO company will be parmanently deleted from the
          database."
						actionFn={() => deleteHMOCompaniesAction({ id: comp.id })}
					/>
				</div>
			);
		},
	},
];
