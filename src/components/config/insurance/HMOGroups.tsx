import { Flex, Heading } from "@radix-ui/themes";
import { CreateHMOGroupForm } from "../../../forms/config/insurance/HMOGroup";
import { DataTable } from "../../table/DataTable";
import { hmo_groups_column } from "../../table/columns/insurance/HMO_groups";
import { useSuspenseQuery } from "@tanstack/react-query";
import { hmoGroupsQueryOptions } from "../../../actions/queries";

export function HMOGroups() {
  // const { data } = useLoaderData({ from: "/_layout/dashboard/config/" });
  const { data } = useSuspenseQuery(hmoGroupsQueryOptions);
  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>HMO Groups</Heading>
        <CreateHMOGroupForm />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={hmo_groups_column}
        data={data.hmo_group_data ?? []}
      />
    </div>
  );
}
