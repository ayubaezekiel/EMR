import { deleteDiagnosisAction } from "@/actions/config/diagnosis";
import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import { UpdateDiagnosisForm } from "@/forms/config/DiagnosisForm";

export const diagnosis_column: ColumnDef<DB["diagnosis"]["Row"]>[] = [
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
          <UpdateDiagnosisForm {...params} />
          <DeleteActionForm
            id={params.id}
            inValidate="allDiagnosis"
            title="Delete Diagnosis"
            warning="Are you sure? this diagnosis will be parmanently deleted from the
          database."
            actionFn={() => deleteDiagnosisAction({ id: params.id })}
          />
        </div>
      );
    },
  },
];
