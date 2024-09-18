import { deleteDocumentTypeAction } from "@/actions/config/document-type";
import { UpdateDocumentType } from "@/forms/config/DocumentTypeForm";
import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteActionForm } from "../../../actions/DeleteAction";

export const document_type_column: ColumnDef<DB["document_types"]["Row"]>[] = [
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
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const params = row.original;

			return (
				<div className="flex gap-4">
					<UpdateDocumentType {...params} />
					<DeleteActionForm
						id={params.id}
						inValidate="documentType"
						title="Delete Document Type"
						warning="Are you sure? this document type will be parmanently deleted from the
          database."
						actionFn={() => deleteDocumentTypeAction({ id: params.id })}
					/>
				</div>
			);
		},
	},
];
