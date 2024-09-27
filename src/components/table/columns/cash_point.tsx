import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import { deleteCashpointAction } from "../../../actions/config/cashpoint";
import { UpdateCashpointForm } from "../../../forms/config/CashpointForm";

export const cashpoint_column: ColumnDef<DB["cash_points"]["Row"]>[] = [
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
      const cash = row.original;

      return (
        <div className="flex gap-4">
          <UpdateCashpointForm {...cash} />
          <DeleteActionForm
            id={cash.id}
            inValidate="cashpoints"
            title="Delete Cashpoint"
            warning="Are you sure? this cashpoint will be parmanently deleted from the
          database."
            actionFn={() => deleteCashpointAction({ id: cash.id })}
          />
        </div>
      );
    },
  },
];
