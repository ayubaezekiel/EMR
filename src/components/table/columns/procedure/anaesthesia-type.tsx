import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { deleteAnaesthesiaTypeAction } from "../../../../actions/config/procedure";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { UpdateAnaesthesiaTypeForm } from "../../../../forms/config/procedures/AnaesthesiaTypeForm";

export const anaesthesia_type_column: ColumnDef<
	DB["anaesthesia_type"]["Row"]
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
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("title")}</div>
		),
	},

	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const params = row.original;

			return (
				<div className="flex gap-4">
					<UpdateAnaesthesiaTypeForm {...params} />
					<DeleteActionForm
						id={params.id}
						inValidate="anaesthesiaType"
						title="Delete Anaesthesia Type?"
						warning="Are you sure? this anaesthesia type will be parmanently deleted from the
          database."
						actionFn={() => deleteAnaesthesiaTypeAction({ id: params.id })}
					/>
				</div>
			);
		},
	},
];
