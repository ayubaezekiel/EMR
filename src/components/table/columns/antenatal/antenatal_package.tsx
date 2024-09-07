import { deleteAntenatalPackageAction } from "@/actions/config/antenatal";
import { UpdateAntenatalPackageForm } from "@/forms/antenatal/AntenatalForm";
import { Badge, Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteActionForm } from "@/actions/DeleteAction";
import { Check, X } from "lucide-react";

export const antenatal_package_column: ColumnDef<
	DB["antenatal_package"]["Row"]
>[] = [
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
		accessorKey: "default_price",
		header: "Price",
		cell: ({ row }) => (
			<div className="capitalize">
				{new Intl.NumberFormat().format(row.getValue("default_price"))}
			</div>
		),
	},

	{
		accessorKey: "with_delivary",
		header: "With Delivary",
		cell: ({ row }) => (
			<div className="capitalize">
				{row.getValue("with_delivary") ? (
					<Badge radius="full">
						<Check />
					</Badge>
				) : (
					<Badge color="red" radius="full">
						<X />
					</Badge>
				)}
			</div>
		),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const params = row.original;

			return (
				<div className="flex gap-4">
					<UpdateAntenatalPackageForm {...params} />
					<DeleteActionForm
						id={params.id}
						inValidate="antenatalPackage"
						title="Delete Antenatal Package"
						warning="Are you sure? this antenatal package will be parmanently deleted from the
          database."
						actionFn={() => deleteAntenatalPackageAction({ id: params.id })}
					/>
				</div>
			);
		},
	},
];
