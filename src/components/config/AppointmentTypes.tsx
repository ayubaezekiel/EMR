import { Flex, Heading } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { appointmentsTypesQueryOptions } from "../../actions/queries";
import { CreateAppointmentTypeForm } from "../../forms/config/AppointmentTypeForm";
import { DataTable } from "../table/DataTable";
import { appointment_type } from "../table/columns/appointment_type";

export function AppointmentType() {
  const { data } = useSuspenseQuery(appointmentsTypesQueryOptions);
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
        data={data.appointment_type_data ?? []}
      />
    </div>
  );
}
