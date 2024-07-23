import { Button, Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { deleteHMOPlanAction } from "../../../../actions/config/insurance";
import { UpdateHMOPlanForm } from "../../../../forms/config/insurance/HMOPlanForm";

export type NewHMOPlanType = DB["hmo_plans"]["Row"] & {
  hmo_companies: {
    name: string | undefined | null;
  };
};

export const hmo_plans_column: ColumnDef<NewHMOPlanType>[] = [
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
    accessorKey: "hmo_companies",
    header: "HMO",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.hmo_companies.name}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "enrolment_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Enrolment Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = new Intl.NumberFormat("en-IN", {
        maximumSignificantDigits: 3,
      }).format(row.getValue("enrolment_amount"));
      return <div className="lowercase">{price}</div>;
    },
  },

  {
    accessorKey: "sign_up_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Signup Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = new Intl.NumberFormat("en-IN", {
        maximumSignificantDigits: 3,
      }).format(row.getValue("sign_up_amount"));
      return <div className="lowercase">{price}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("phone")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const plans = row.original;

      return (
        <div className="flex gap-4">
          <UpdateHMOPlanForm {...plans} />
          <DeleteActionForm
            id={plans.id}
            redirectTo="/dashboard/config"
            title="Delete HMO Plan"
            warning="Are you sure? This HMO plan will be parmanently deleted from the
          database."
            actionFn={async () => await deleteHMOPlanAction({ id: plans.id })}
          />
        </div>
      );
    },
  },
];
