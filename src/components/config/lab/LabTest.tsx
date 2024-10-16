import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useMemo } from "react";
import { useLabTestQuery } from "../../../actions/queries";
import { CreateLabTestForm } from "../../../forms/config/lab/LabTestForm";
import { DataTable } from "../../table/DataTable";
import { lab_test_column } from "../../table/columns/lab_test";

export function LabTests() {
  const { data, isPending } = useLabTestQuery();

  const lab_test =
    useMemo(
      () =>
        data?.lab_test_data?.map((l) => ({
          ...l,
          lab_test_templates: l.lab_test_template?.name,
          lab_test_category: l.lab_test_category?.name,
        })),
      [data?.lab_test_data]
    ) ?? [];

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Lab Test</Heading>
        <CreateLabTestForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable columns={lab_test_column} data={lab_test} />
      )}
    </div>
  );
}
