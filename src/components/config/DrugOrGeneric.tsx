import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { drugOrGenericQueryOptions } from "../../actions/queries";
import PendingComponent from "../PendingComponent";
import { DataTable } from "../table/DataTable";
import { CreateDrugOrGeneric } from "../../forms/config/DrugOrGenericForm";
import { drug_or_generic_column } from "../table/columns/drug_or_generic";

export type DrugType = {
  created_at: string;
  created_by: string;
  default_price: string;
  drug_or_generic_brand: string;
  drug_or_generic_brand_id: string;
  id: string;
  is_consumable: string;
  name: string;
  quantity: string;
};

export function DrugOrGeneric() {
  const { data, isPending } = useQuery(drugOrGenericQueryOptions);
  if (isPending) return <PendingComponent />;

  const drug_or_generic_data: DrugType[] =
    data?.drug_or_generic_data?.map((d) => ({
      created_at: `${d.created_at}`,
      created_by: `${d.created_by}`,
      default_price: `${d.default_price}`,
      drug_or_generic_brand: `${d.drug_or_generic_brand?.name}`,
      drug_or_generic_brand_id: `${d.drug_or_generic_brand_id}`,
      id: `${d.id}`,
      is_consumable: `${d.is_consumable}`,
      name: `${d.name}`,
      quantity: `${d.quantity}`,
    })) ?? [];

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Store</Heading>
        <CreateDrugOrGeneric />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={drug_or_generic_column}
        data={drug_or_generic_data}
      />
    </div>
  );
}
