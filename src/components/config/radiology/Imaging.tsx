import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { imagingQueryOptions } from "../../../actions/queries";
import { CreateImagingForm } from "../../../forms/config/radiology/ImagingForm";
import { DataTable } from "../../table/DataTable";
import { imaging_column } from "../../table/columns/radiology";
import { useMemo } from "react";

export function Imaging() {
	const { data, isPending } = useQuery(imagingQueryOptions);

	const imaging =
		useMemo(
			() =>
				data?.imaging_data?.map((i) => ({
					...i,
					imaging_category: i.imaging_category?.name,
				})),
			[data?.imaging_data],
		) ?? [];

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Imaging</Heading>
				<CreateImagingForm />
			</Flex>

			{isPending ? (
				<Spinner />
			) : (
				<DataTable
					filterLabel="filter by name..."
					filterer="name"
					columns={imaging_column}
					data={imaging}
				/>
			)}
		</div>
	);
}
