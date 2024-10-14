import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useAnaesthesiaTypeQuery } from "../../../actions/queries";
import { CreateAnaesthesiaTypeForm } from "../../../forms/config/procedures/AnaesthesiaTypeForm";
import { DataTable } from "../../table/DataTable";
import { anaesthesia_type_column } from "../../table/columns/procedure/anaesthesia-type";

export function AnaesthesiaType() {
  const { data, isPending } = useAnaesthesiaTypeQuery();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Anaesthesia Type</Heading>
        <CreateAnaesthesiaTypeForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable
          columns={anaesthesia_type_column}
          data={data?.anaesthesia_type_data ?? []}
        />
      )}
    </div>
  );
}
