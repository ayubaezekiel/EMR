import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { deleteProcedureCategoryAction } from "../../../../actions/config/procedure";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { UpdateProcedureCategoriesForm } from "../../../../forms/config/procedures/ProceduresCategoriesForm";

export const procedure_cat_column: ColumnDef<
	DB["procedure_category"]["Row"]
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
		header: "Title",
		cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
	},

	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const params = row.original;

			return (
				<div className="flex gap-4">
					<UpdateProcedureCategoriesForm {...params} />
					<DeleteActionForm
						id={params.id}
						inValidate="procedureCat"
						title="Delete Procedure Category?"
						warning="Are you sure? this category type will be parmanently deleted from the
          database."
						actionFn={async () =>
							await deleteProcedureCategoryAction({ id: params.id })
						}
					/>
				</div>
			);
		},
	},
];
