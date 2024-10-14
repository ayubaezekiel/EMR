import { Flex, Heading } from "@radix-ui/themes";
import { useTheatreQuery } from "../../../actions/queries";
import { CreateTheatreForm } from "../../../forms/config/procedures/Theatre";
import { DataTable } from "../../table/DataTable";
import { theatres_column } from "../../table/columns/procedure/theatre";

export function Theatre() {
  const { data } = useTheatreQuery();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Theatre</Heading>
        <CreateTheatreForm />
      </Flex>

      <DataTable columns={theatres_column} data={data?.theatre_data ?? []} />
    </div>
  );
}
