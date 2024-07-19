import { Flex, Heading } from "@radix-ui/themes";
import { useLoaderData } from "@tanstack/react-router";
import { CreateAppointmentTypeForm } from "../../forms/config/AppointmentTypeForm";
import { DataTable } from "../table/DataTable";
import { appointment_type } from "../table/columns/appointment_type";

export function AppointmentType() {
  const { data } = useLoaderData({ from: "/_layout/dashboard/config" });

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Appointment Types</Heading>
        <CreateAppointmentTypeForm />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={appointment_type}
        data={data.appointment_type ?? []}
      />
    </div>
  );
}
