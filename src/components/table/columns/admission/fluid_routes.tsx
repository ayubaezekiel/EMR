import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { deleteFluidRoutesAction } from "../../../../actions/config/admission";
import { UpdateFluidRoutesForm } from "../../../../forms/config/admission/FluidRoutes";

export const fluid_routes_column: ColumnDef<DB["fluid_routes"]["Row"]>[] = [
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
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const params = row.original;

      return (
        <div className="flex gap-4">
          <UpdateFluidRoutesForm {...params} />
          <DeleteActionForm
            id={params.id}
            inValidate="fluidRoutes"
            title="Delete Fluid Route?"
            warning="Are you sure? this fluid route type will be parmanently deleted from the
          database."
            actionFn={() => deleteFluidRoutesAction({ id: params.id })}
          />
        </div>
      );
    },
  },
];
