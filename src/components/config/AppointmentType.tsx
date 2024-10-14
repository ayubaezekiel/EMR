import { useAppointmentsTypesQuery } from "@/actions/queries";
import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { CreateAppointmentTypeForm } from "../../forms/config/AppointmentTypeForm";
import { DataTable } from "../table/DataTable";
import { appointment_type_column } from "../table/columns/appointment_type";

export function AppointmentType() {
  const { data, isPending } = useAppointmentsTypesQuery();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Appointment Types</Heading>
        <CreateAppointmentTypeForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable
          columns={appointment_type_column}
          data={data?.appointment_type_data ?? []}
        />
      )}
    </div>
  );
}
