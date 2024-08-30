import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { drugOrGenericQueryOptions } from "../../actions/queries";
import { CreateDrugOrGeneric } from "../../forms/config/DrugOrGenericForm";
import { DataTable } from "../table/DataTable";
import { drug_or_generic_column } from "../table/columns/drug_or_generic";
import { useMemo } from "react";

export type DrugType = {
	created_at: string;
	created_by: string;
	default_price: string;
	drug_or_generic_brand: string;
	drug_or_generic_brand_id: string;
	id: string;
	is_consumable: boolean;
	name: string;
	quantity: number;
	total_quantity: number;
	total_sold: number;
};

export function DrugOrGeneric() {
	const { data, isPending } = useQuery(drugOrGenericQueryOptions);

	const drug_or_generic_data: DrugType[] =
		useMemo(
			() =>
				data?.drug_or_generic_data?.map((d) => ({
					created_at: `${d.created_at}`,
					created_by: `${d.profile?.first_name} ${d.profile?.middle_name ?? ""} ${d.profile?.last_name}`,
					default_price: `${d.default_price}`,
					drug_or_generic_brand: `${d.drug_or_generic_brand?.name}`,
					drug_or_generic_brand_id: `${d.drug_or_generic_brand_id}`,
					id: `${d.id}`,
					is_consumable: Boolean(d.is_consumable),
					name: `${d.name}`,
					quantity: Number(d.quantity),
					total_quantity: Number(d.total_quantity),
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
