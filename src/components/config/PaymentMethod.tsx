import { Flex, Heading } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { paymentMethodsQueryOptions } from "../../actions/queries";
import { CreatePaymentMethodForm } from "../../forms/config/PaymentMethodForm";
import { DataTable } from "../table/DataTable";
import { payment_method_column } from "../table/columns/payment_method";

export function PaymentMethod() {
  // const { data } = useLoaderData({ from: "/_layout/dashboard/config/" });
  const { data } = useSuspenseQuery(paymentMethodsQueryOptions);
  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Payment Methods</Heading>
        <CreatePaymentMethodForm />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={payment_method_column}
        data={data.payment_method_data ?? []}
      />
    </div>
  );
}
