import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { fluidRoutesQueryOptions } from "../../../actions/queries";
import { CreateFluidRoutesForm } from "../../../forms/config/admission/FluidRoutes";
import { DataTable } from "../../table/DataTable";
import { fluid_routes_column } from "../../table/columns/admission/fluid_routes";

export function FluidRoutes() {
	const { data } = useQuery(fluidRoutesQueryOptions);

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Fluid Routes</Heading>
				<CreateFluidRoutesForm />
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={fluid_routes_column}
				data={data?.fluid_routes_data ?? []}
			/>
		</div>
	);
}
