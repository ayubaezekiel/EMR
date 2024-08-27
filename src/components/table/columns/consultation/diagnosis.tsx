import { Button, Card, Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { deletePatientDiagnosisAction } from "../../../../actions/consultation/actions";
import { UpdateDiagnosisForm } from "../../../consultation/Diagnosis";
import { SharedConsultationTypes } from "../../../consultation/SharedTypes";

export const patient_diagnosis_column: ColumnDef<SharedConsultationTypes>[] = [
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
		accessorKey: "created_at",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Date
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div>{new Date(row.getValue("created_at")).toDateString()}</div>
		),
	},
	{
		accessorKey: "profile",
		header: "Recorded By",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("profile")}</div>
		),
	},
	{
		accessorKey: "note",
		header: "Note",
		cell: ({ row }) => (
			<div className="md:max-w-[50rem] mx-auto">
				<Card>
					<div dangerouslySetInnerHTML={{ __html: row.getValue("note") }} />
				</Card>
			</div>
		),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const diag = row.original;

			return (
				<div className="flex gap-4">
					<UpdateDiagnosisForm
						isAdmission={diag.is_admission}
						patients_id={diag.patient_id}
						taken_by={diag.created_by}
						created_at={diag.created_at}
						id={diag.id}
						note={diag.note}
						is_admission={diag.is_admission}
					/>
					<DeleteActionForm
						id={diag.id}
						inValidate="diagnosis"
						title="Delete Diagnosis"
						warning="Are you sure? this diagnosis will be parmanently deleted from the
          database."
						actionFn={() => deletePatientDiagnosisAction({ id: diag.id })}
					/>
				</div>
			);
		},
	},
];
