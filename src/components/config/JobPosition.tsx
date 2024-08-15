import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { jobPositionsQueryOptions } from "../../actions/queries";
import { CreateJobPositionForm } from "../../forms/config/JobPositionForm";
import { DataTable } from "../table/DataTable";
import { job_position_column } from "../table/columns/job_position";
import PendingComponent from "../PendingComponent";

export function JobPostion() {
	const { data, isPending } = useQuery(jobPositionsQueryOptions);
	if (isPending) return <PendingComponent />;

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Job Position</Heading>
				<CreateJobPositionForm />
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={job_position_column}
				data={data?.job_positions_data ?? []}
			/>
		</div>
	);
}
