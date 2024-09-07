import { useDepartmentsQuery } from "@/actions/queries";
import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { CreateDepartmentForm } from "../../forms/config/DepartmentForm";
import { DataTable } from "../table/DataTable";
import { departemnt_column } from "../table/columns/department";

export function Departments() {
	const { data, isPending } = useDepartmentsQuery();

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Departments</Heading>
				<CreateDepartmentForm />
			</Flex>
			{isPending ? (
				<Spinner />
			) : (
				<DataTable
					filterLabel="filter by name..."
					filterer="name"
					columns={departemnt_column}
					data={data?.department_data ?? []}
				/>
			)}
		</div>
	);
}
