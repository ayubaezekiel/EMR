import { Flex, Heading } from "@radix-ui/themes";
import { useLoaderData } from "@tanstack/react-router";
import { CreateClinicsForm } from "../../forms/config/ClinicsForm";
import { DataTable } from "../table/DataTable";
import { clinic_column } from "../table/columns/clinics";

export function Clinics() {
  const { data } = useLoaderData({ from: "/_layout/dashboard/config" });

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
        data={data.clinics ?? []}
      />
    </div>
  );
}
