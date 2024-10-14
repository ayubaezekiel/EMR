import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useHmoCompaniesQuery } from "../../../actions/queries";
import { CreateHMOCompaniesForm } from "../../../forms/config/insurance/HMOCompanies";
import { DataTable } from "../../table/DataTable";
import { hmo_companies_column } from "../../table/columns/insurance/HMO_companies";

export function HMOCompanies() {
  const { data, isPending } = useHmoCompaniesQuery();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>HMO Companies</Heading>
        <CreateHMOCompaniesForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable
          columns={hmo_companies_column}
          data={data?.hmo_companies_data ?? []}
        />
      )}
    </div>
  );
}
