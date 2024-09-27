import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useLabTestParamsQuery } from "../../../actions/queries";
import { CreateLabParamsForm } from "../../../forms/config/lab/LabTemplateParams";
import { DataTable } from "../../table/DataTable";
import { lab_test_params_column } from "../../table/columns/lab_test";

export function LabTestParams() {
  const { data, isPending } = useLabTestParamsQuery();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Lab Test Parameters</Heading>
        <CreateLabParamsForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable
          filterLabel="filter by name..."
          filterer="name"
          columns={lab_test_params_column}
          data={data?.lab_params_data ?? []}
        />
      )}
    </div>
  );
}
