import { Button, Card, Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { deleteExaminationAction } from "../../../../actions/consultation/actions";
import { UpdateExaminationForm } from "../../../consultation/Examinitation";
import { SharedConsultationTypes } from "../../../consultation/SharedTypes";

export const patient_examination_column: ColumnDef<SharedConsultationTypes>[] =
	[
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
				const exam = row.original;

				return (
					<div className="flex gap-4">
						<UpdateExaminationForm
							patients_id={exam.patient_id}
							taken_by={exam.created_by}
							created_at={exam.created_at}
							id={exam.id}
							note={exam.note}
							is_admission={exam.is_admission}
						/>
						<DeleteActionForm
							id={exam.id}
							inValidate="examinations"
							title="Delete Examination"
							warning="Are you sure? this examination will be parmanently deleted from the
          database."
							actionFn={() => deleteExaminationAction({ id: exam.id })}
						/>
					</div>
				);
			},
		},
	];
