import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import { deleteServicesTypeAction } from "../../../actions/config/service-types";
import { UpdateServiceTypeForm } from "../../../forms/config/ServiceTypeForm";

export const service_type_column: ColumnDef<DB["service_types"]["Row"]>[] = [
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
      const service = row.original;

      return (
        <div className="flex gap-4">
          <UpdateServiceTypeForm {...service} />
          <DeleteActionForm
            id={service.id}
            inValidate="service"
            title="Delete Service"
            warning="Are you sure? this service will be parmanently deleted from the
          database."
            actionFn={async () =>
              await deleteServicesTypeAction({ id: service.id })
            }
          />
        </div>
      );
    },
  },
];
