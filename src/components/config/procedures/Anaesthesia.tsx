import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useMemo } from "react";
import { useAnaesthesiaQuery } from "@/actions/queries";
import { CreateAnaesthesiaForm } from "../../../forms/config/procedures/AnaesthesiaForm";
import { DataTable } from "../../table/DataTable";
import { anaesthesia_column } from "../../table/columns/procedure/anaesthesia";

export function Anaesthesia() {
  const { data, isPending } = useAnaesthesiaQuery();

  const anaesthesia =
    useMemo(
      () =>
        data?.anaesthesia_data?.map((a) => ({
          ...a,
          anaesthesia_type: a.anaesthesia_type?.title,
        })),
      [data?.anaesthesia_data]
    ) ?? [];

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Anaesthesia</Heading>
        <CreateAnaesthesiaForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable columns={anaesthesia_column} data={anaesthesia} />
      )}
    </div>
  );
}
