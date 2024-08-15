import { Button, Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { deleteHistoryTakingAction } from "../../../../actions/consultation/actions";
import { UpdateExaminationForm } from "../../../consultation/Examinitation";

export const patient_examination_column: ColumnDef<
	DB["patient_examination"]["Row"]
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
		accessorKey: "taken_by",
		header: "Recorded By",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("taken_by")}</div>
		),
	},
	{
		accessorKey: "note",
		header: "Note",
		cell: ({ row }) => (
			<div dangerouslySetInnerHTML={{ __html: row.getValue("note") }} />
		),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const exam = row.original;

			return (
				<div className="flex gap-4">
					<UpdateExaminationForm {...exam} />
					<DeleteActionForm
						id={exam.id}
						inValidate="examination"
						title="Delete Examination"
						warning="Are you sure? this examintion will be parmanently deleted from the
          database."
						actionFn={async () =>
							await deleteHistoryTakingAction({ id: exam.id })
						}
					/>
				</div>
			);
		},
	},
];
