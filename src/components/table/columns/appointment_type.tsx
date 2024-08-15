import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import { deleteAppointmentTypeAction } from "../../../actions/config/appointment-type";
import { UpdateAppointmentTypeForm } from "../../../forms/config/AppointmentTypeForm";

export const appointment_type_column: ColumnDef<
	DB["appointment_types"]["Row"]
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
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
	},
	{
		accessorKey: "default_price",
		header: "Default Price",
		cell: ({ row }) => (
			<div className="capitalize">
				N{new Intl.NumberFormat().format(row.getValue("default_price"))}
			</div>
		),
	},
	{
		accessorKey: "follow_up_price",
		header: "Follow Up Price",
		cell: ({ row }) => (
			<div className="capitalize">
				N{new Intl.NumberFormat().format(row.getValue("follow_up_price"))}
			</div>
		),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const type = row.original;

			return (
				<div className="flex gap-4">
					<UpdateAppointmentTypeForm {...type} />
					<DeleteActionForm
						id={type.id}
						inValidate="appointmentsTypes"
						title="Delete Lab Parameter"
						warning="Are you sure? this appointment type parameter will be parmanently deleted from the
          database."
						actionFn={async () =>
							await deleteAppointmentTypeAction({ id: type.id })
						}
					/>
				</div>
			);
		},
	},
];
