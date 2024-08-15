import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { anaesthesiaQueryOptions } from "../../../actions/queries";
import { CreateAnaesthesiaForm } from "../../../forms/config/procedures/AnaesthesiaForm";
import { DataTable } from "../../table/DataTable";
import { anaesthesia_column } from "../../table/columns/procedure/anaesthesia";

export function Anaesthesia() {
	const { data } = useQuery(anaesthesiaQueryOptions);

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Anaesthesia</Heading>
				<CreateAnaesthesiaForm />
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={anaesthesia_column}
				data={data?.anaesthesia_data ?? []}
			/>
		</div>
	);
}
