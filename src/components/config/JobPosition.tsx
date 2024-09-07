import { useJobPositionsQuery } from "@/actions/queries";
import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { CreateJobPositionForm } from "../../forms/config/JobPositionForm";
import { DataTable } from "../table/DataTable";
import { job_position_column } from "../table/columns/job_position";

export function JobPostion() {
	const { data, isPending } = useJobPositionsQuery();
	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Job Position</Heading>
				<CreateJobPositionForm />
			</Flex>
			{isPending ? (
				<Spinner />
			) : (
				<DataTable
					filterLabel="filter by name..."
					filterer="name"
					columns={job_position_column}
					data={data?.job_positions_data ?? []}
				/>
			)}
		</div>
	);
}
