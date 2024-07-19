import { Flex, Heading } from "@radix-ui/themes";
import { useLoaderData } from "@tanstack/react-router";
import { DataTable } from "../table/DataTable";
import { payment_method_column } from "../table/columns/payment_method";
import { CreatePaymentMethodForm } from "../../forms/config/PaymentMethodForm";

export function PaymentMethod() {
  const { data } = useLoaderData({ from: "/_layout/dashboard/config" });

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
        data={data.payment_method ?? []}
      />
    </div>
  );
}
