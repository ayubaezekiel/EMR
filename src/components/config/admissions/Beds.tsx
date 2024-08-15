import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { bedsQueryOptions } from "../../../actions/queries";
import { CreateBedForm } from "../../../forms/config/admission/BedForm";
import { DataTable } from "../../table/DataTable";
import { beds_column } from "../../table/columns/admission/beds";

export function Beds() {
	const { data } = useQuery(bedsQueryOptions);

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Beds</Heading>
				<CreateBedForm />
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={beds_column}
				data={data?.beds_data ?? []}
			/>
		</div>
	);
}
