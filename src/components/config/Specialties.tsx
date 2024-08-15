import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { specialtiesQueryOptions } from "../../actions/queries";
import { CreateSpecialtiesForm } from "../../forms/config/SpecialtiesForm";
import { DataTable } from "../table/DataTable";
import { specialties_column } from "../table/columns/specialties";

export function Specialties() {
	const { data } = useQuery(specialtiesQueryOptions);

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Specialties</Heading>
				<CreateSpecialtiesForm />
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={specialties_column}
				data={data?.specialties_data ?? []}
			/>
		</div>
	);
}
