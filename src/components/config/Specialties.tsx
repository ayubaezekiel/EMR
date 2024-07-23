import { Flex, Heading } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  consultationSpecialtiesQueryOptions,
  specialtiesQueryOptions,
} from "../../actions/queries";
import {
  CreateConsultationSpecialtiesForm,
  CreateSpecialtiesForm,
} from "../../forms/config/SpecialtiesForm";
import { DataTable } from "../table/DataTable";
import {
  consultation_specialties_column,
  specialties_column,
} from "../table/columns/specialties";

export function Specialties() {
  // const { data } = useLoaderData({ from: "/_layout/dashboard/config/" });
  const { data } = useSuspenseQuery(specialtiesQueryOptions);

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Specialties</Heading>
        <CreateSpecialtiesForm />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={specialties_column}
        data={data.specialties_data ?? []}
      />
    </div>
  );
}

export function ConnsultaionSpecialties() {
  // const { consultation_specialties_data } = useLoaderData({
  //   from: "/_layout/dashboard/config/consultation",
  // });
  const { data } = useSuspenseQuery(consultationSpecialtiesQueryOptions);

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Consultation Specialties</Heading>
        <CreateConsultationSpecialtiesForm />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={consultation_specialties_column}
        data={data.consultation_specialties_data ?? []}
      />
    </div>
  );
}
