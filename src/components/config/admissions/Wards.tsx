import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { wardsQueryOptions } from "../../../actions/queries";
import { CreateWardForm } from "../../../forms/config/admission/WardForm";
import { DataTable } from "../../table/DataTable";
import { wards_column } from "../../table/columns/admission/wards";

export function Wards() {
	const { data } = useQuery(wardsQueryOptions);

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Wards</Heading>
				<CreateWardForm />
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={wards_column}
				data={data?.wards_data ?? []}
			/>
		</div>
	);
}
