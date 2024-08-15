import { Badge, Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, X } from "lucide-react";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { deleteAdmissionAction } from "../../../../actions/config/admission";
import { UpdateAdmissionForm } from "../../../../forms/config/admission/AdmissionForm";

export const admission_column: ColumnDef<DB["admissions"]["Row"]>[] = [
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
		accessorKey: "patient_id",
		header: "Patient",
		cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
	},
	{
		accessorKey: "wards_id",
		header: "Ward",
		cell: ({ row }) => (
			<div className="capitalize">
				N{new Intl.NumberFormat().format(row.getValue("procedure_price"))}
			</div>
		),
	},

	{
		accessorKey: "beds_id",
		header: "Bed",
		cell: ({ row }) => (
			<div className="capitalize">
				N{new Intl.NumberFormat().format(row.getValue("surgeon_price"))}
			</div>
		),
	},
	{
		accessorKey: "admitted_by",
		header: "Admitted By",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("anaesthesia")}</div>
		),
	},
	{
		accessorKey: "dischard_date",
		header: "Discharge Date",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("anaesthesia")}</div>
		),
	},
	{
		accessorKey: "is_critical",
		header: "Is Critical?",
		cell: ({ row }) => (
			<div className="capitalize">
				{row.getValue("is_critical") ? (
					<Badge>
						<CheckCircle />
					</Badge>
				) : (
					<Badge color="red">
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
					<UpdateAdmissionForm {...params} />
					<DeleteActionForm
						id={params.id}
						inValidate="admissions"
						title="Delete Admission?"
						warning="Are you sure? this admission will be parmanently deleted from the
          database."
						actionFn={async () =>
							await deleteAdmissionAction({ id: params.id })
						}
					/>
				</div>
			);
		},
	},
];
