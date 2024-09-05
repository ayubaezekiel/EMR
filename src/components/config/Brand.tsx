import { Callout, Flex, Heading, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { drugOrGenericBrandQueryOptions } from "@/actions/queries";
import { CreateBrandForm } from "../../forms/config/DrugOrGenericBrand";

import { drug_or_generic_brand_column } from "../table/columns/drug_or_generic";
import { DataTable } from "../table/DataTable";
import { FileQuestion } from "lucide-react";

export function DrugOrGenericBrand() {
	const { data, isPending } = useQuery(drugOrGenericBrandQueryOptions);

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Brands</Heading>
				<CreateBrandForm />
			</Flex>
			{data?.drug_or_generic_brand_data?.length === 0 ? (
				<Flex justify={"center"}>
					<Callout.Root mt={"9"}>
						<Callout.Icon>
							<FileQuestion />
						</Callout.Icon>
						<Callout.Text ml={"1"}>No result found</Callout.Text>
					</Callout.Root>
				</Flex>
			) : (
				<div>
					{isPending ? (
						<Spinner />
					) : (
						<DataTable
							filterLabel="filter by name..."
							filterer="name"
							columns={drug_or_generic_brand_column}
							data={data?.drug_or_generic_brand_data ?? []}
						/>
					)}
				</div>
			)}
		</div>
	);
}
