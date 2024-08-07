import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import {
  consultationSpecialtiesQueryOptions,
  vitalsQueryOptions,
} from "../../actions/queries";
import { CreateConsultationSpecialtiesForm } from "../../forms/config/SpecialtiesForm";
import { CreateVitalsForm } from "../../forms/config/Vitals";
import PendingComponent from "../PendingComponent";
import { DataTable } from "../table/DataTable";
import { consultation_specialties_column } from "../table/columns/specialties";
import { vitals_column } from "../table/columns/vitals";

export function Vitals() {
  const { data, isPending } = useQuery(vitalsQueryOptions);
  if (isPending) return <PendingComponent />;

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Vitals</Heading>
        <CreateVitalsForm />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={vitals_column}
        data={data?.vitals_data ?? []}
      />
    </div>
  );
}

export function NursingVitatls() {
  const { data, isPending } = useQuery(consultationSpecialtiesQueryOptions);
  if (isPending) return <PendingComponent />;

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
        data={data?.consultation_specialties_data ?? []}
      />
    </div>
  );
}
