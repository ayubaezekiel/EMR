import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import {
	DeleteClinicsForm,
	UpdateClinicsForm,
} from "../../../forms/config/ClinicsForm";

export const clinic_column: ColumnDef<ClinicsType["Row"]>[] = [
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
			const clinics = row.original;

			return (
				<div className="flex gap-4">
					<UpdateClinicsForm {...clinics} />
					<DeleteClinicsForm id={clinics.id} />
				</div>
			);
		},
	},
];
