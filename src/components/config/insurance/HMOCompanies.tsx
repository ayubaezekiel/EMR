import { Flex, Heading } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { hmoCompaniesQueryOptions } from "../../../actions/queries";
import { CreateHMOCompaniesForm } from "../../../forms/config/insurance/HMOCompanies";
import { DataTable } from "../../table/DataTable";
import { hmo_companies_column } from "../../table/columns/insurance/HMO_companies";

export default function HMOCompanies() {
  // const { data } = useLoaderData({ from: "/_layout/dashboard/config/" });
  const { data } = useSuspenseQuery(hmoCompaniesQueryOptions);
  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>HMO Companies</Heading>
        <CreateHMOCompaniesForm />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={hmo_companies_column}
        data={data.hmo_companies_data ?? []}
      />
    </div>
  );
}
