import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { imagingQueryOptions } from "../../../actions/queries";
import { CreateImagingForm } from "../../../forms/config/radiology/ImagingForm";
import { DataTable } from "../../table/DataTable";
import { imaging_column } from "../../table/columns/radiology";

export function Imaging() {
	const { data } = useQuery(imagingQueryOptions);

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Imaging</Heading>
				<CreateImagingForm />
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={imaging_column}
				data={data?.imaging_data ?? []}
			/>
		</div>
	);
}
