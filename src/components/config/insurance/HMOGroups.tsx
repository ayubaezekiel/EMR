import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useHmoGroupsQuery } from "../../../actions/queries";
import { CreateHMOGroupForm } from "../../../forms/config/insurance/HMOGroup";
import { DataTable } from "../../table/DataTable";
import { hmo_groups_column } from "../../table/columns/insurance/HMO_groups";

export function HMOGroups() {
  const { data, isPending } = useHmoGroupsQuery();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>HMO Groups</Heading>
        <CreateHMOGroupForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable
          columns={hmo_groups_column}
          data={data?.hmo_group_data ?? []}
        />
      )}
    </div>
  );
}
