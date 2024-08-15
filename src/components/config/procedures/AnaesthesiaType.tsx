import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { anaesthesiaTypeQueryOptions } from "../../../actions/queries";
import { CreateAnaesthesiaTypeForm } from "../../../forms/config/procedures/AnaesthesiaTypeForm";
import { DataTable } from "../../table/DataTable";
import { anaesthesia_type_column } from "../../table/columns/procedure/anaesthesia-type";

export function AnaesthesiaType() {
	const { data } = useQuery(anaesthesiaTypeQueryOptions);

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Anaesthesia Type</Heading>
				<CreateAnaesthesiaTypeForm />
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={anaesthesia_type_column}
				data={data?.anaesthesia_type_data ?? []}
			/>
		</div>
	);
}
