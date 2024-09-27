import { Badge, Checkbox } from "@radix-ui/themes";
import { CheckCircle, X } from "lucide-react";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { deleteWardAction } from "../../../../actions/config/admission";
import { UpdateWardForm } from "../../../../forms/config/admission/WardForm";
import { ColumnDef } from "@tanstack/react-table";

export const wards_column: ColumnDef<DB["wards"]["Row"]>[] = [
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
    accessorKey: "is_labor",
    header: "With Labor?",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("is_labor") ? (
          <Badge size={"1"} radius="full">
            <CheckCircle />
          </Badge>
        ) : (
          <Badge size={"1"} color="red" radius="full">
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
          <UpdateWardForm {...params} />
          <DeleteActionForm
            id={params.id}
            inValidate="wards"
            title="Delete Ward?"
            warning="Are you sure? this ward type will be parmanently deleted from the
          database."
            actionFn={() => deleteWardAction({ id: params.id })}
          />
        </div>
      );
    },
  },
];
