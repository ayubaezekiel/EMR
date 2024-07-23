import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { UpdateHMOGroupForm } from "../../../../forms/config/insurance/HMOGroup";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { deleteHMOGroupAction } from "../../../../actions/config/insurance";

export const hmo_groups_column: ColumnDef<DB["hmo_group"]["Row"]>[] = [
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
      const group = row.original;

      return (
        <div className="flex gap-4">
          <UpdateHMOGroupForm {...group} />
          <DeleteActionForm
            id={group.id}
            redirectTo="/dashboard/config"
            title="Delete HMO Group"
            warning="Are you sure? This HMO group will be parmanently deleted from the
          database."
            actionFn={async () => await deleteHMOGroupAction({ id: group.id })}
          />
        </div>
      );
    },
  },
];
