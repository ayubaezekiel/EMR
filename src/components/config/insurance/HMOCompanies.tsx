import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { hmoCompaniesQueryOptions } from "../../../actions/queries";
import { CreateHMOCompaniesForm } from "../../../forms/config/insurance/HMOCompanies";
import PendingComponent from "../../PendingComponent";
import { DataTable } from "../../table/DataTable";
import { hmo_companies_column } from "../../table/columns/insurance/HMO_companies";

export function HMOCompanies() {
	const { data, isPending } = useQuery(hmoCompaniesQueryOptions);
	if (isPending) return <PendingComponent />;
	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>HMO Companies</Heading>
				<CreateHMOCompaniesForm />
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={hmo_companies_column}
				data={data?.hmo_companies_data ?? []}
			/>
		</div>
	);
}
