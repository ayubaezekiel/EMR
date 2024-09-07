import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useLabTestTempQuery } from "../../../actions/queries";
import { CreateLabTemplateForm } from "../../../forms/config/lab/LabTemplateForm";
import { DataTable } from "../../table/DataTable";
import { lab_test_temp_column } from "../../table/columns/lab_test";

export function LabTestTemplate() {
	const { data, isPending } = useLabTestTempQuery();

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Lab Test Templates</Heading>
				<CreateLabTemplateForm />
			</Flex>
			{isPending ? (
				<Spinner />
			) : (
				<DataTable
					filterLabel="filter by name..."
					filterer="name"
					columns={lab_test_temp_column}
					data={data?.lab_test_template_data ?? []}
				/>
			)}
		</div>
	);
}
