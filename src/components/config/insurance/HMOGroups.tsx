import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { hmoGroupsQueryOptions } from "../../../actions/queries";
import { CreateHMOGroupForm } from "../../../forms/config/insurance/HMOGroup";
import PendingComponent from "../../PendingComponent";
import { DataTable } from "../../table/DataTable";
import { hmo_groups_column } from "../../table/columns/insurance/HMO_groups";

export function HMOGroups() {
	const { data, isPending } = useQuery(hmoGroupsQueryOptions);
	if (isPending) return <PendingComponent />;
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
				data={data?.hmo_group_data ?? []}
			/>
		</div>
	);
}
