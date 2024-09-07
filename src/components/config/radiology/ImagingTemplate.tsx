import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useImagingTempQuery } from "../../../actions/queries";
import { CreateImagingTemplateForm } from "../../../forms/config/radiology/ImagingTemplateForm";
import { DataTable } from "../../table/DataTable";
import { imaging_temp_column } from "../../table/columns/radiology";

export function ImagingTemplate() {
	const { data, isPending } = useImagingTempQuery();

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Imaging Templates</Heading>
				<CreateImagingTemplateForm />
			</Flex>
			{isPending ? (
				<Spinner />
			) : (
				<DataTable
					filterLabel="filter by name..."
					filterer="name"
					columns={imaging_temp_column}
					data={data?.imaging_temp_data ?? []}
				/>
			)}
		</div>
	);
}
