import { Badge, Button, Card, Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { deletePatientDiagnosisAction } from "../../../../actions/consultation/actions";
import { UpdatePatientDiagnosisForm } from "@/forms/consultation/DiagnosisForm";

export const patient_diagnosis_column: ColumnDef<
  DB["patient_diagnosis"]["Row"]
>[] = [
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
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{new Date(row.getValue("created_at")).toDateString()}</div>
    ),
  },
  {
    accessorKey: "profile",
    header: "Recorded By",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("profile")}</div>
    ),
  },
  {
    accessorKey: "diagnosis",
    header: "Diagnosis",
    cell: ({ row }) => (
      <div className="md:max-w-[50rem] mx-auto">
        <Card>
          <div className="flex flex-wrap gap-2">
            {JSON.parse(JSON.stringify(row.getValue("diagnosis"))).map(
              (d: { name: string }) => (
                <Badge>{d.name}</Badge>
              )
            )}
          </div>
        </Card>
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
          <UpdatePatientDiagnosisForm
            isAdmission={Boolean(params.is_admission)}
            patients_id={params.patients_id}
            taken_by={params.taken_by}
            created_at={params.created_at}
            id={params.id}
            diagnosis={params.diagnosis}
            is_admission={params.is_admission}
            branch_id={params.branch_id}
          />
          <DeleteActionForm
            id={params.id}
            inValidate="diagnosis"
            title="Delete Diagnosis"
            warning="Are you sure? this diagnosis will be parmanently deleted from the
          database."
            actionFn={() => deletePatientDiagnosisAction({ id: params.id })}
          />
        </div>
      );
    },
  },
];
