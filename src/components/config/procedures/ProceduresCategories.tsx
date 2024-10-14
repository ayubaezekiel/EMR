import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useProcedureCatQuery } from "../../../actions/queries";
import { CreateProcedureCategoriesForm } from "../../../forms/config/procedures/ProceduresCategoriesForm";
import { DataTable } from "../../table/DataTable";
import { procedure_cat_column } from "../../table/columns/procedure/procedures-category";

export function ProceduresCategories() {
  const { data, isPending } = useProcedureCatQuery();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Procedure Categories</Heading>
        <CreateProcedureCategoriesForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable
          columns={procedure_cat_column}
          data={data?.procedure_categories_data ?? []}
        />
      )}
    </div>
  );
}
