import { Flex, Heading } from "@radix-ui/themes";
import { useLoaderData } from "@tanstack/react-router";
import { CreateDepartmentForm } from "../../forms/config/DepartmentForm";
import { DataTable } from "../table/DataTable";
import { departemnt_column } from "../table/columns/department";

export function Departments() {
  const { data } = useLoaderData({ from: "/_layout/dashboard/config" });

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
        data={data.department ?? []}
      />
    </div>
  );
}
