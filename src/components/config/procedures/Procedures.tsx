import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useMemo } from "react";
import { useProceduresQuery } from "../../../actions/queries";
import { CreateProceduresForm } from "../../../forms/config/procedures/ProceduresForm";
import { DataTable } from "../../table/DataTable";
import { procedures_column } from "../../table/columns/procedure/procedure";

export function Procedures() {
  const { data, isPending } = useProceduresQuery();

  const procedures =
    useMemo(
      () =>
        data?.procedure_data?.map((p) => ({
          ...p,
          anaesthesia: p.anaesthesia?.name,
          theatre: p.theatre?.name,
          procedure_category: p.procedure_category?.name,
        })),
      [data?.procedure_data]
    ) ?? [];
  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Medical Procedures</Heading>
        <CreateProceduresForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable columns={procedures_column} data={procedures} />
      )}
    </div>
  );
}
