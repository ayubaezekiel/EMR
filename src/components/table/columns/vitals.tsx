import { Button, Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import { deleteVitalsAction } from "../../../actions/config/vitals";
import {
	UpdatePatientVitalsForm,
	UpdateVitalsForm,
} from "../../../forms/config/Vitals";
import { ArrowUpDown } from "lucide-react";

export const vitals_column: ColumnDef<DB["vitals"]["Row"]>[] = [
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
		accessorKey: "unit",
		header: "Unit",
		cell: ({ row }) => <div className="capitalize">{row.getValue("unit")}</div>,
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const vitals = row.original;

			return (
				<div className="flex gap-4">
					<UpdateVitalsForm {...vitals} />
					<DeleteActionForm
						id={vitals.id}
						inValidate="vitals"
						title="Delete Vitals"
						warning="Are you sure? this vitals will be parmanently deleted from the
          database."
						actionFn={async () => await deleteVitalsAction({ id: vitals.id })}
					/>
				</div>
			);
		},
	},
];

export const patient_vitals_column: ColumnDef<DB["patient_vitals"]["Row"]>[] = [
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
		accessorKey: "date_created",
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
			<div>{new Date(row.getValue("date_created")).toDateString()}</div>
		),
	},
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
	},
	{
		accessorKey: "value",
		header: "Value",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("value")}</div>
		),
	},
	{
		accessorKey: "unit",
		header: "Unit",
		cell: ({ row }) => <div className="capitalize">{row.getValue("unit")}</div>,
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const vitals = row.original;

			return (
				<div className="flex gap-4">
					<UpdatePatientVitalsForm {...vitals} />
					<DeleteActionForm
						id={vitals.id}
						inValidate="patientVitals"
						title="Delete Patient Vitals"
						warning="Are you sure? this vitals will be parmanently deleted from the
          database."
						actionFn={async () => await deleteVitalsAction({ id: vitals.id })}
					/>
				</div>
			);
		},
	},
];
