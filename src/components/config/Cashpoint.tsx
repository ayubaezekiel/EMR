import { Flex, Heading } from "@radix-ui/themes";
import { useLoaderData } from "@tanstack/react-router";
import { CreateCashpointForm } from "../../forms/config/CashpointForm";
import { DataTable } from "../table/DataTable";
import { cashpoint_column } from "../table/columns/cash_point";

export function Cashpoint() {
  const { data } = useLoaderData({ from: "/_layout/dashboard/config" });

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Cashpoints</Heading>
        <CreateCashpointForm />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={cashpoint_column}
        data={data.cashpoints ?? []}
      />
    </div>
  );
}
