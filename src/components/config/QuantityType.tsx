import { Callout, Flex, Heading, Spinner } from "@radix-ui/themes";
import { FileQuestion } from "lucide-react";
import { CreateQuantityTypeForm } from "../../forms/config/QuantityTypeForm";
import { useQuantityType } from "@/lib/hooks";
import { DataTable } from "../table/DataTable";
import { quantity_type_column } from "../table/columns/quantity_type";

export function QuantityType() {
  const { isQuantityTypePending, quantity_type_data } = useQuantityType();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Quantity Types</Heading>
        <CreateQuantityTypeForm />
      </Flex>
      {quantity_type_data?.length === 0 ? (
        <Flex justify={"center"}>
          <Callout.Root mt={"9"}>
            <Callout.Icon>
              <FileQuestion />
            </Callout.Icon>
            <Callout.Text ml={"1"}>No result found</Callout.Text>
          </Callout.Root>
        </Flex>
      ) : (
        <div>
          {isQuantityTypePending ? (
            <Spinner />
          ) : (
            <DataTable
              columns={quantity_type_column}
              data={quantity_type_data ?? []}
            />
          )}
        </div>
      )}
    </div>
  );
}
