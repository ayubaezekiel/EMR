import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { drugOrGenericBrandQueryOptions } from "../../actions/queries";
import { CreateBrandForm } from "../../forms/config/DrugOrGenericBrand";
import PendingComponent from "../PendingComponent";
import { drug_or_generic_brand_column } from "../table/columns/drug_or_generic";
import { DataTable } from "../table/DataTable";

export function DrugOrGenericBrand() {
	const { data, isPending } = useQuery(drugOrGenericBrandQueryOptions);
	if (isPending) return <PendingComponent />;

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Brands</Heading>
				<CreateBrandForm />
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={drug_or_generic_brand_column}
				data={data?.drug_or_generic_brand_data ?? []}
			/>
		</div>
	);
}
