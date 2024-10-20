import { Checkbox } from "@radix-ui/themes";
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import { deletePatientAction } from "../../../actions/patient";
import { UpdatePatientForm } from "../../../forms/PatientForm";

export const patients: ColumnDef<DB["patients"]["Row"]>[] = [
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
    id: "patients",
    header: "Full Name",
    accessorFn: ({ first_name, middle_name, last_name }) =>
      `${first_name} ${middle_name} ${last_name}`,
    cell: ({ row }) => {
      const fullname = row.original;
      return (
        <Link
          to={`/dashboard/patients/${fullname.id}`}
          className="uppercase hover:underline text-[var(--accent-9)]"
        >
          {fullname.first_name} {fullname.middle_name} {fullname.last_name}
        </Link>
      );
    },
  },

  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("gender")}</div>
    ),
  },

  {
    accessorKey: "hmo_plans",
    header: "HMO Plan",
    cell: ({ row }) => <div>{row.getValue("hmo_plans")}</div>,
  },
  {
    accessorKey: "hmo_code",
    header: () => <div className="text-right">HMO Code</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("hmo_code")}</div>
      );
    },
  },

  {
    accessorKey: "phone",
    header: () => <div className="text-right">Phone</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("phone")}</div>
      );
    },
  },
  {
    accessorKey: "residential_address",
    header: () => <div className="text-right">Address</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("residential_address")}
        </div>
      );
    },
  },

  {
    id: "actions",
    header: () => <div className="">Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <div className="flex gap-4">
          <UpdatePatientForm {...patient} hmo_plan_id={patient.hmo_plan_id} />
          <DeleteActionForm
            id={patient.id}
            inValidate="patients"
            title="Delete Specialty"
            warning="Are you sure? this patient will be parmanently deleted from the
          database."
            actionFn={() => deletePatientAction({ id: patient.id })}
          />
        </div>
      );
    },
  },
];
