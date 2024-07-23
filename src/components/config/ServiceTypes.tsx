import { Flex, Heading } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { serviceTypesQueryOptions } from "../../actions/queries";
import { CreateServiceTypeForm } from "../../forms/config/ServiceTypeForm";
import { DataTable } from "../table/DataTable";
import { service_type_column } from "../table/columns/service_type";

export function ServiceTypes() {
  // const { data } = useLoaderData({ from: "/_layout/dashboard/config/" });
  const { data } = useSuspenseQuery(serviceTypesQueryOptions);

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Service Types</Heading>
        <CreateServiceTypeForm />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={service_type_column}
        data={data.service_type_data ?? []}
      />
    </div>
  );
}
