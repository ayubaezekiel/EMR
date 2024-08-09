import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { appointmentsTypesQueryOptions } from "../../actions/queries";
import PendingComponent from "../PendingComponent";
import { DataTable } from "../table/DataTable";
import { appointment_type_column } from "../table/columns/appointment_type";
import { CreateAppointmentTypeForm } from "../../forms/config/AppointmentTypeForm";

export function AppointmentType() {
  const { data, isPending } = useQuery(appointmentsTypesQueryOptions);
  if (isPending) return <PendingComponent />;

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Appointment Types</Heading>
        <CreateAppointmentTypeForm />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={appointment_type_column}
        data={data?.appointment_type_data ?? []}
      />
    </div>
  );
}
