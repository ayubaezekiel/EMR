import { Flex, Heading } from "@radix-ui/themes";
import { useLoaderData } from "@tanstack/react-router";
import { CreateJobPositionForm } from "../../forms/config/JobPositionForm";
import { DataTable } from "../table/DataTable";
import { job_position_column } from "../table/columns/job_position";

export function JobPostion() {
  const { data } = useLoaderData({ from: "/_layout/dashboard/config" });

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
        data={data.job_positions ?? []}
      />
    </div>
  );
}
