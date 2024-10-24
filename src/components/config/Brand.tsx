import { useDrugOrGenericBrandQuery } from "@/actions/queries";
import { Callout, Flex, Heading, Spinner } from "@radix-ui/themes";
import { CreateBrandForm } from "../../forms/config/DrugOrGenericBrand";

import { FileQuestion } from "lucide-react";
import { drug_or_generic_brand_column } from "../table/columns/drug_or_generic";
import { DataTable } from "../table/DataTable";

export function DrugOrGenericBrand() {
  const { data, isPending } = useDrugOrGenericBrandQuery();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Brands</Heading>
        <CreateBrandForm />
      </Flex>
      {data?.drug_or_generic_brand_data?.length === 0 ? (
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
          {isPending ? (
            <Spinner />
          ) : (
            <DataTable
              columns={drug_or_generic_brand_column}
              data={data?.drug_or_generic_brand_data ?? []}
            />
          )}
        </div>
      )}
    </div>
  );
}
