import { useSpecialtiesQuery } from "@/actions/queries";
import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { CreateSpecialtiesForm } from "../../forms/config/SpecialtiesForm";
import { DataTable } from "../table/DataTable";
import { specialties_column } from "../table/columns/specialties";

export function Specialties() {
  const { data, isPending } = useSpecialtiesQuery();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Specialties</Heading>
        <CreateSpecialtiesForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable
          filterLabel="filter by name..."
          filterer="name"
          columns={specialties_column}
          data={data?.specialties_data ?? []}
        />
      )}
    </div>
  );
}
