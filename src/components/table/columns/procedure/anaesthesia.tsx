import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { deleteAnaesthesiaAction } from "../../../../actions/config/procedure";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { UpdateAnaesthesiaForm } from "../../../../forms/config/procedures/AnaesthesiaForm";

export const anaesthesia_column: ColumnDef<DB["anaesthesia"]["Row"]>[] = [
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
    accessorKey: "anaesthesia_type",
    header: "Anaesthesia Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("anaesthesia_type")}</div>
    ),
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const params = row.original;

      return (
        <div className="flex gap-4">
          <UpdateAnaesthesiaForm
            anaesthesia_type_id={params.anaesthesia_type_id}
            default_price={params.default_price}
            id={params.id}
            name={params.name}
          />
          <DeleteActionForm
            id={params.id}
            inValidate="anaesthesia"
            title="Delete Theatre?"
            warning="Are you sure? this anaesthesia will be parmanently deleted from the
          database."
            actionFn={() => deleteAnaesthesiaAction({ id: params.id })}
          />
        </div>
      );
    },
  },
];
