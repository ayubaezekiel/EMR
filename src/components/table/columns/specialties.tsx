import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import {
  deleteConsultationSpecialtyAction,
  deleteSpecialtyAction,
} from "../../../actions/config/specialty";
import {
  UpdateConsultationSpecialtiesForm,
  UpdateSpecialtiesForm,
} from "../../../forms/config/SpecialtiesForm";

export const consultation_specialties_column: ColumnDef<
  DB["consultation_specialties"]["Row"]
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
    accessorKey: "follow_up_price",
    header: "Default Price",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("follow_up_price")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const specialties = row.original;

      return (
        <div className="flex gap-4">
          <UpdateConsultationSpecialtiesForm {...specialties} />
          <DeleteActionForm
            id={specialties.id}
            inValidate="consultationSpecialties"
            title="Delete Consultation Specialty"
            warning="Are you sure? this specialty will be parmanently deleted from the
          database."
            actionFn={async () =>
              await deleteConsultationSpecialtyAction({ id: specialties.id })
            }
          />
        </div>
      );
    },
  },
];

export const specialties_column: ColumnDef<DB["specialties"]["Row"]>[] = [
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
      const specialties = row.original;

      return (
        <div className="flex gap-4">
          <UpdateSpecialtiesForm {...specialties} />
          <DeleteActionForm
            id={specialties.id}
            inValidate="specialties"
            title="Delete Specialty"
            warning="Are you sure? this specialty will be parmanently deleted from the
          database."
            actionFn={async () =>
              await deleteSpecialtyAction({ id: specialties.id })
            }
          />
        </div>
      );
    },
  },
];
