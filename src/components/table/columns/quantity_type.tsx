import { Checkbox } from "@radix-ui/themes";
import { deleteQuantityTypeAction } from "../../../actions/config/quantity-type";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import { UpdateQuantityTypeForm } from "../../../forms/config/QuantityTypeForm";
import { ColumnDef } from "@tanstack/react-table";

export const quantity_type_column: ColumnDef<DB["quantity_type"]["Row"]>[] = [
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
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const params = row.original;

			return (
				<div className="flex gap-4">
					<UpdateQuantityTypeForm {...params} />
					<DeleteActionForm
						id={params.id}
						inValidate="quantityType"
						title="Delete Quantity Type"
						warning="Are you sure? this quantity type will be parmanently deleted from the
          database."
						actionFn={() => deleteQuantityTypeAction({ id: params.id })}
					/>
				</div>
			);
		},
	},
];
