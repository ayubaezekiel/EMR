import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { deletePaymentMethodAction } from "../../../actions/config/payment-method";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import { UpdatePaymentMethodForm } from "../../../forms/config/PaymentMethodForm";

export const payment_method_column: ColumnDef<PaymentMethodType["Row"]>[] = [
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
      const method = row.original;

      return (
        <div className="flex gap-4">
          <UpdatePaymentMethodForm {...method} />
          <DeleteActionForm
            id={method.id}
            inValidate="paymentMethod"
            title="Delete Service"
            warning="Are you sure? this payment method will be parmanently deleted from the
          database."
            actionFn={async () =>
              await deletePaymentMethodAction({ id: method.id })
            }
          />
        </div>
      );
    },
  },
];
