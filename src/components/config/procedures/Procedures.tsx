import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { proceduresQueryOptions } from "../../../actions/queries";
import { CreateProceduresForm } from "../../../forms/config/procedures/ProceduresForm";
import { DataTable } from "../../table/DataTable";
import { procedures_column } from "../../table/columns/procedure/procedure";

export function Procedures() {
	const { data } = useQuery(proceduresQueryOptions);

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Medical Procedures</Heading>
				<CreateProceduresForm />
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={procedures_column}
				data={data?.procedure_data ?? []}
			/>
		</div>
	);
}
