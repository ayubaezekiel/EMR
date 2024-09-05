import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { imagingCatQueryOptions } from "../../../actions/queries";
import { CreateImagingCategoriesForm } from "../../../forms/config/radiology/ImagingCategoriesForm";
import { DataTable } from "../../table/DataTable";
import { imaging_cat_column } from "../../table/columns/radiology";
import { useMemo } from "react";

export function ImagingCategories() {
	const { data, isPending } = useQuery(imagingCatQueryOptions);

	const imaging_cat =
		useMemo(
			() => data?.imaging_categories_data?.map((i) => ({ ...i })),
			[data?.imaging_categories_data],
		) ?? [];

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Imaging Categories</Heading>
				<CreateImagingCategoriesForm />
			</Flex>
			{isPending ? (
				<Spinner />
			) : (
				<DataTable
					filterLabel="filter by name..."
					filterer="name"
					columns={imaging_cat_column}
					data={imaging_cat}
				/>
			)}
		</div>
	);
}
