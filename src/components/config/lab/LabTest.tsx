import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { labTestQueryOptions } from "../../../actions/queries";
import { CreateLabTestForm } from "../../../forms/config/lab/LabTestForm";
import { DataTable } from "../../table/DataTable";
import { lab_test_column } from "../../table/columns/lab_test";

export function LabTests() {
  const { data } = useQuery(labTestQueryOptions);

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Lab Test</Heading>
        <CreateLabTestForm />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={lab_test_column}
        data={data?.lab_test_data ?? []}
      />
    </div>
  );
}
