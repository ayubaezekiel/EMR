import { Badge, Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, X } from "lucide-react";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { deleteBedAction } from "../../../../actions/config/admission";
import { UpdateBedForm } from "../../../../forms/config/admission/BedForm";

export const beds_column: ColumnDef<DB["beds"]["Row"]>[] = [
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
			<div className="capitalize">{row.getValue("default_price")}</div>
		),
	},
	{
		accessorKey: "ward_id",
		header: "Ward",
		cell: ({ row }) => <div className="capitalize">{row.getValue("")}</div>,
	},
	{
		accessorKey: "is_available",
		header: "Is Available?",
		cell: ({ row }) => (
			<div className="capitalize">
				{row.getValue("is_available") ? (
					<Badge size={"1"}>
						<CheckCircle />
					</Badge>
				) : (
					<Badge>
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
					<UpdateBedForm {...params} />
					<DeleteActionForm
						id={params.id}
						inValidate="beds"
						title="Delete Bed?"
						warning="Are you sure? this bed type will be parmanently deleted from the
          database."
						actionFn={async () => await deleteBedAction({ id: params.id })}
					/>
				</div>
			);
		},
	},
];
