import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import { deleteSpecialtyAction } from "../../../actions/config/specialty";
import { UpdateSpecialtiesForm } from "../../../forms/config/SpecialtiesForm";

export const specialties_column: ColumnDef<DB["specialties"]["Row"]>[] = [
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
			const specialties = row.original;

			return (
				<div className="flex gap-4">
					<UpdateSpecialtiesForm {...specialties} />
					<DeleteActionForm
						id={specialties.id}
						inValidate="specialties"
						title="Delete Specialty"
						warning="Are you sure? this specialty will be parmanently deleted from the
          database."
						actionFn={async () =>
							await deleteSpecialtyAction({ id: specialties.id })
						}
					/>
				</div>
			);
		},
	},
];
