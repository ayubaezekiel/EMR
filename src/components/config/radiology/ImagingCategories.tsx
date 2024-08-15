import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { imagingCatQueryOptions } from "../../../actions/queries";
import { CreateImagingCategoriesForm } from "../../../forms/config/radiology/ImagingCategoriesForm";
import { DataTable } from "../../table/DataTable";
import { imaging_cat_column } from "../../table/columns/radiology";

export function ImagingCategories() {
	const { data } = useQuery(imagingCatQueryOptions);

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Imaging Categories</Heading>
				<CreateImagingCategoriesForm />
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={imaging_cat_column}
				data={data?.imaging_categories_data ?? []}
			/>
		</div>
	);
}
