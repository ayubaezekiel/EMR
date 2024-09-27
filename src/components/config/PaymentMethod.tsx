import { usePaymentMethodsQuery } from "@/actions/queries";
import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { CreatePaymentMethodForm } from "../../forms/config/PaymentMethodForm";
import { DataTable } from "../table/DataTable";
import { payment_method_column } from "../table/columns/payment_method";

export function PaymentMethod() {
  const { data, isPending } = usePaymentMethodsQuery();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Payment Methods</Heading>
        <CreatePaymentMethodForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable
          filterLabel="filter by name..."
          filterer="name"
          columns={payment_method_column}
          data={data?.payment_method_data ?? []}
        />
      )}
    </div>
  );
}
