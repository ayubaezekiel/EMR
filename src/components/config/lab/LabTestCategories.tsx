import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useLabTestCatQuery } from "../../../actions/queries";
import { CreateLabCategoriesForm } from "../../../forms/config/lab/LabTestCategoriesForm";
import { DataTable } from "../../table/DataTable";
import { lab_test_cat_column } from "../../table/columns/lab_test";

export function LabTestCategories() {
  const { data, isPending } = useLabTestCatQuery();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Lab Test Categories</Heading>
        <CreateLabCategoriesForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable
          columns={lab_test_cat_column}
          data={data?.lab_test_categories_data ?? []}
        />
      )}
    </div>
  );
}
