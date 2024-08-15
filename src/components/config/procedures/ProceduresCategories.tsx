import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { procedureCatQueryOptions } from "../../../actions/queries";
import { CreateProcedureCategoriesForm } from "../../../forms/config/procedures/ProceduresCategoriesForm";
import { DataTable } from "../../table/DataTable";
import { procedure_cat_column } from "../../table/columns/procedure/procedures-category";

export function ProceduresCategories() {
	const { data } = useQuery(procedureCatQueryOptions);

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Procedure Categories</Heading>
				<CreateProcedureCategoriesForm />
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={procedure_cat_column}
				data={data?.procedure_categories_data ?? []}
			/>
		</div>
	);
}
