import { Badge, Checkbox } from "@radix-ui/themes";
import { deleteProcedureAction } from "../../../../actions/config/procedure";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { UpdateProceduresForm } from "../../../../forms/config/procedures/ProceduresForm";
import { ColumnDef } from "@tanstack/react-table";
import { Check, X } from "lucide-react";

export const procedures_column: ColumnDef<DB["procedure"]["Row"]>[] = [
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
    accessorKey: "procedure_price",
    header: "Procedure Price",
    cell: ({ row }) => (
      <div className="capitalize">
        N{new Intl.NumberFormat().format(row.getValue("procedure_price"))}
      </div>
    ),
  },

  {
    accessorKey: "surgeon_price",
    header: "Surgeon Price",
    cell: ({ row }) => (
      <div className="capitalize">
        N{new Intl.NumberFormat().format(row.getValue("surgeon_price"))}
      </div>
    ),
  },
  {
    accessorKey: "anaesthesia",
    header: "Anaesthesia",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("anaesthesia")}</div>
    ),
  },

  {
    accessorKey: "theatre",
    header: "Theatre",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("theatre")}</div>
    ),
  },
  {
    accessorKey: "procedure_category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("procedure_category")}</div>
    ),
  },
  {
    accessorKey: "is_theatre",
    header: "has Theatre?",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("is_theatre") ? (
          <Badge>
            <Check />
          </Badge>
        ) : (
          <Badge color="red">
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
          <UpdateProceduresForm
            anaesthesia_id={params.anaesthesia_id}
            id={params.id}
            is_theatre={params.is_theatre}
            name={params.name}
            procedure_category_id={params.procedure_category_id}
            procedure_price={params.procedure_price}
            surgeon_price={params.surgeon_price}
            theatre_id={params.theatre_id}
          />
          <DeleteActionForm
            id={params.id}
            inValidate="procedure"
            title="Delete Procedure?"
            warning="Are you sure? this procedure will be parmanently deleted from the
          database."
            actionFn={() => deleteProcedureAction({ id: params.id })}
          />
        </div>
      );
    },
  },
];
