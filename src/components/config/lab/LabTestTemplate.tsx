import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { labTestTempQueryOptions } from "../../../actions/queries";
import { CreateLabTemplateForm } from "../../../forms/config/lab/LabTemplateForm";
import { DataTable } from "../../table/DataTable";
import { lab_test_temp_column } from "../../table/columns/lab_test";

export function LabTestTemplate() {
  const { data } = useQuery(labTestTempQueryOptions);

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Lab Test Templates</Heading>
        <CreateLabTemplateForm />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={lab_test_temp_column}
        data={data?.lab_test_template_data ?? []}
      />
    </div>
  );
}
