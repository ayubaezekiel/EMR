import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import { deleteDepartmentAction } from "../../../actions/config/department";
import { UpdateDepartmentForm } from "../../../forms/config/DepartmentForm";

export const departemnt_column: ColumnDef<DB["departments"]["Row"]>[] = [
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
      const dept = row.original;

      return (
        <div className="flex gap-4">
          <UpdateDepartmentForm {...dept} />
          <DeleteActionForm
            id={dept.id}
            inValidate="departments"
            title="Delete Department"
            warning="Are you sure? this cashpoint will be parmanently deleted from the
          database."
            actionFn={() => deleteDepartmentAction({ id: dept.id })}
          />
        </div>
      );
    },
  },
];
