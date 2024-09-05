import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { drugOrGenericQueryOptions } from "@/actions/queries";
import { CreateDrugOrGeneric } from "../../forms/config/DrugOrGenericForm";
import { DataTable } from "../table/DataTable";
import { drug_or_generic_column } from "../table/columns/drug_or_generic";
import { useMemo } from "react";

export function DrugOrGeneric() {
	const { data, isPending } = useQuery(drugOrGenericQueryOptions);

	const drug_or_generic_data =
		useMemo(
			() =>
				data?.drug_or_generic_data?.map((d) => ({
					...d,
					created_by: `${d.profile?.first_name} ${d.profile?.middle_name ?? ""} ${d.profile?.last_name}`,
					quantity_type: d.quantity_type?.name,
					drug_or_generic_brand: `${d.drug_or_generic_brand?.name}`,
					total_sold: Number(d.total_quantity) - Number(d.quantity),
				})),
			[data?.drug_or_generic_data],
		) ?? [];

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Store</Heading>
				{isPending ? <Spinner /> : <CreateDrugOrGeneric />}
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={drug_or_generic_column}
				data={drug_or_generic_data}
			/>
		</div>
	);
}
