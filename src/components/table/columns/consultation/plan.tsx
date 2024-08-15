import { Button, Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { deletePlanAction } from "../../../../actions/consultation/actions";
import { UpdateTreatmentPlanForm } from "../../../consultation/TreatmentPlan";

export const treatment_plan_column: ColumnDef<DB["treatment_plan"]["Row"]>[] = [
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
			const plan = row.original;

			return (
				<div className="flex gap-4">
					<UpdateTreatmentPlanForm {...plan} />
					<DeleteActionForm
						id={plan.id}
						inValidate="treatmentPlan"
						title="Delete Plan"
						warning="Are you sure? this plan will be parmanently deleted from the
          database."
						actionFn={async () => await deletePlanAction({ id: plan.id })}
					/>
				</div>
			);
		},
	},
];
