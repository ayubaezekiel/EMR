import { useClinicsQuery } from "@/actions/queries";
import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { CreateClinicsForm } from "../../forms/config/ClinicsForm";
import { clinic_column } from "../table/columns/clinics";
import { DataTable } from "../table/DataTable";

export function Clinics() {
  const { data, isPending } = useClinicsQuery();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Clinics</Heading>
        <CreateClinicsForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable
          filterLabel="filter by name..."
          filterer="name"
          columns={clinic_column}
          data={data?.clinics_data ?? []}
        />
      )}
    </div>
  );
}
