import { Button, Card, Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { deleteHistoryTakingAction } from "../../../../actions/consultation/actions";
import { UpdateHistoryTakingForm } from "../../../consultation/HistoryTaking";
import { SharedConsultationTypes } from "../../../consultation/SharedTypes";

export const history_taking_column: ColumnDef<SharedConsultationTypes>[] = [
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
			const history = row.original;

			return (
				<div className="flex gap-4">
					<UpdateHistoryTakingForm
						patients_id={history.patient_id}
						taken_by={history.created_by}
						created_at={history.created_at}
						id={history.id}
						note={history.note}
						is_admission={history.is_admission}
					/>
					<DeleteActionForm
						id={history.id}
						inValidate="historyTaking"
						title="Delete History"
						warning="Are you sure? this history will be parmanently deleted from the
          database."
						actionFn={() => deleteHistoryTakingAction({ id: history.id })}
					/>
				</div>
			);
		},
	},
];
