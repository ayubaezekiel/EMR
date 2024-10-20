import { Badge, Card, Checkbox, Flex } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import {
  deletePatientVitalsAction,
  deleteVitalsAction,
} from "../../../actions/config/vitals";
import { UpdateVitalsForm } from "../../../forms/config/Vitals";

export const vitals_column: ColumnDef<DB["vitals"]["Row"]>[] = [
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
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => <div className="capitalize">{row.getValue("unit")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const vitals = row.original;

      return (
        <div className="flex gap-4">
          <UpdateVitalsForm {...vitals} />
          <DeleteActionForm
            id={vitals.id}
            inValidate="vitals"
            title="Delete Vitals"
            warning="Are you sure? this vitals will be parmanently deleted from the
          database."
            actionFn={() => deleteVitalsAction({ id: vitals.id })}
          />
        </div>
      );
    },
  },
];

export const patient_vitals_column: ColumnDef<DB["patient_vitals"]["Row"]>[] = [
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
    accessorKey: "profile",
    header: () => <div className="text-center">Vitals</div>,
    cell: ({ row }) => (
      <div>
        <Flex gap={"4"}>
          <div>
            Date - <Badge>{row.original.date_created}</Badge>
          </div>
          <div>
            Recoreded By - <Badge>{row.getValue("profile")}</Badge>
          </div>
        </Flex>

        <div className="grid md:grid-cols-4 gap-2 mt-2">
          {JSON.parse(JSON.stringify(row.original.vitals)).map(
            (v: {
              name: string;
              value: string;
              unit: string;
              is_abnormal: boolean;
            }) => (
              <Card>
                <Flex justify={"between"} align={"center"}>
                  {v.name}
                  <Badge color={v.is_abnormal ? "red" : "green"} size={"3"}>
                    {v.value}
                    {v.unit}
                  </Badge>
                </Flex>
              </Card>
            )
          )}
        </div>
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const vitals = row.original;

      return (
        <div className="flex gap-4">
          {/* <UpdatePatientVitalsForm
						date_created={vitals.date_created}
						id={vitals.id}
						is_admission={vitals.is_admission}
						patient_id={vitals.patient_id}
						taken_by={vitals.taken_by}
						vitals={vitals.vitals}
					/> */}
          <DeleteActionForm
            id={vitals.id}
            inValidate="patientVitalsById"
            title="Delete Patient Vitals"
            warning="Are you sure? this vitals will be parmanently deleted from the
          database."
            actionFn={() => deletePatientVitalsAction({ id: vitals.id })}
          />
        </div>
      );
    },
  },
];
