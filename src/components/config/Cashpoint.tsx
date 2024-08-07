import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { cashpointsQueryOptions } from "../../actions/queries";
import { CreateCashpointForm } from "../../forms/config/CashpointForm";
import PendingComponent from "../PendingComponent";
import { DataTable } from "../table/DataTable";
import { cashpoint_column } from "../table/columns/cash_point";

export function Cashpoint() {
  const { data, isPending } = useQuery(cashpointsQueryOptions);
  if (isPending) return <PendingComponent />;
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
        data={data?.cashpoint_data ?? []}
      />
    </div>
  );
}
