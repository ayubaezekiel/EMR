import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { departmentsQueryOptions } from "../../actions/queries";
import { CreateDepartmentForm } from "../../forms/config/DepartmentForm";
import { DataTable } from "../table/DataTable";
import { departemnt_column } from "../table/columns/department";

export function Departments() {
	const { data } = useQuery(departmentsQueryOptions);

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Departments</Heading>
				<CreateDepartmentForm />
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={departemnt_column}
				data={data?.department_data ?? []}
			/>
		</div>
	);
}
