import { Flex, Heading } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { clinicsQueryOptions } from "../../actions/queries";
import { CreateClinicsForm } from "../../forms/config/ClinicsForm";
import { DataTable } from "../table/DataTable";
import { clinic_column } from "../table/columns/clinics";

export function Clinics() {
  // const { data } = useLoaderData({ from: "/_layout/dashboard/config/" });
  const { data } = useSuspenseQuery(clinicsQueryOptions);

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Clinics</Heading>
        <CreateClinicsForm />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={clinic_column}
        data={data.clinics_data ?? []}
      />
    </div>
  );
}
