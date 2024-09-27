import { deleteJobPositionAction } from "@/actions/config/job-positions";
import { DeleteActionForm } from "@/actions/DeleteAction";
import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { UpdateJobPositionForm } from "../../../forms/config/JobPositionForm";

export const job_position_column: ColumnDef<DB["job_positions"]["Row"]>[] = [
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
      const job = row.original;

      return (
        <div className="flex gap-4">
          <UpdateJobPositionForm {...job} />
          <DeleteActionForm
            id={job.id}
            inValidate="jobPositions"
            title="Delete Job Positions"
            warning="Are you sure? this lab test will be parmanently deleted from the
          database."
            actionFn={() => deleteJobPositionAction({ id: job.id })}
          />
        </div>
      );
    },
  },
];
