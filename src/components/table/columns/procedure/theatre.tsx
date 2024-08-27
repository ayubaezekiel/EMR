import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { deleteTheatreAction } from "../../../../actions/config/procedure";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { UpdateTheatreForm } from "../../../../forms/config/procedures/Theatre";

export const theatres_column: ColumnDef<DB["theatre"]["Row"]>[] = [
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
		header: "Default Price",
		cell: ({ row }) => (
			<div className="capitalize">
				N{new Intl.NumberFormat().format(row.getValue("default_price"))}
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
					<UpdateTheatreForm {...params} />
					<DeleteActionForm
						id={params.id}
						inValidate="theatre"
						title="Delete Theatre?"
						warning="Are you sure? this theatre will be parmanently deleted from the
          database."
						actionFn={() => deleteTheatreAction({ id: params.id })}
					/>
				</div>
			);
		},
	},
];
