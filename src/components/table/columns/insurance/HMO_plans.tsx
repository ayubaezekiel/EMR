import { Button, Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { deleteHMOPlanAction } from "../../../../actions/config/insurance";
import { UpdateHMOPlanForm } from "../../../../forms/config/insurance/HMOPlanForm";

export const hmo_plans_column: ColumnDef<DB["hmo_plans"]["Row"]>[] = [
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
      <div className="capitalize">{row.getValue("hmo_companies")}</div>
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
      return <div>N{price}</div>;
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
      return <div>N{price}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const plans = row.original;

      return (
        <div className="flex gap-4">
          <UpdateHMOPlanForm
            branch_id={plans.branch_id}
            enrolment_amount={plans.enrolment_amount}
            hmo_companies_id={plans.hmo_companies_id}
            hmo_group_id={plans.hmo_group_id}
            id={plans.id}
            max_number_of_beneficiaries={plans.max_number_of_beneficiaries}
            name={plans.name}
            sign_up_amount={plans.sign_up_amount}
          />
          <DeleteActionForm
            id={plans.id}
            inValidate="hmoPlans"
            title="Delete HMO Plan"
            warning="Are you sure? This HMO plan will be parmanently deleted from the
          database."
            actionFn={() => deleteHMOPlanAction({ id: plans.id })}
          />
        </div>
      );
    },
  },
];
