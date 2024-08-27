import { Card, Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { deleteAdmissionReportsAction } from "../../../../actions/config/admission";
import { UpdateRecordsAndTaskForm } from "../../../../forms/admission/RecordsAndTaskForm";

export interface NursingReportProps {
	created_by: string;
	created_at: string;
	id: string;
	is_progress_note?: boolean;
	note: string;
	patient_id: string;
	profile: string;
}
export const nursing_report_column: ColumnDef<NursingReportProps>[] = [
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
		header: "Date Created",
		cell: ({ row }) => (
			<div className="capitalize">
				{new Date(row.getValue("created_at")).toDateString()}
			</div>
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
		header: () => <div className="text-center">Note</div>,
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
			const params = row.original;

			return (
				<div className="flex gap-4">
					<UpdateRecordsAndTaskForm
						created_at={params.created_at}
						created_by={params.created_by}
						id={params.id}
						is_progress_note={params.is_progress_note}
						note={params.note}
						patient_id={params.patient_id}
					/>
					<DeleteActionForm
						id={params.id}
						inValidate="beds"
						title="Delete Nursing Report?"
						warning="Are you sure? this report will be parmanently deleted from the
          database."
						actionFn={() => deleteAdmissionReportsAction({ id: params.id })}
					/>
				</div>
			);
		},
	},
];
