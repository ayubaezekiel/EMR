import { DateRangePicker } from "@nextui-org/react";
import {
  Avatar,
  Badge,
  Card,
  Flex,
  Heading,
  SegmentedControl,
  Strong,
  Tabs,
  Text,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { UserCheck } from "lucide-react";
import { useState } from "react";
import { deleteAppointmentAction } from "../../../actions/appointment";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import {
  appointmentsQueryOptions,
  appointmentsTypesQueryOptions,
  requestQueryOptions,
} from "../../../actions/queries";

import { ApprovePayments } from "../../../components/Payments";
import PendingComponent from "../../../components/PendingComponent";
import { UpdateAppointmentForm } from "../../../forms/AppointmentForm";
import { PatientForm } from "../../../forms/PatientForm";

export const Route = createFileRoute("/_layout/dashboard/billing")({
  component: () => (
    <div>
      <Heading>Billing</Heading>
      <Billing />
    </div>
  ),
});

const Billing = () => {
  const [segment, setSegment] = useState("appointments");
  const { data: appointment_type, isPending: isAppointmentTypePending } =
    useQuery(appointmentsTypesQueryOptions);

  if (isAppointmentTypePending) return <PendingComponent />;

  return (
    <div>
      <Card variant="ghost" my={"4"} style={{ background: "var(--accent-2)" }}>
        <div className="flex justify-between flex-col gap-2 md:flex-row">
          <PatientForm />

          <div className="flex gap-2 flex-col">
            <DateRangePicker
              label="Event duration"
              hideTimeZone
              visibleMonths={2}
              // defaultValue={{
              //   start: parseZonedDateTime(
              //     "2024-04-01T00:45[America/Los_Angeles]"
              //   ),
              //   end: parseZonedDateTime(
              //     "2024-04-08T11:15[America/Los_Angeles]"
              //   ),
              // }}
            />
          </div>
        </div>
      </Card>
      <SegmentedControl.Root
        size={"3"}
        mt={"4"}
        defaultValue={segment}
        onValueChange={setSegment}
      >
        <SegmentedControl.Item value="appointments">
          Appointments
        </SegmentedControl.Item>
        <SegmentedControl.Item value="requests">Requests</SegmentedControl.Item>
      </SegmentedControl.Root>
      {segment === "appointments" && (
        <Tabs.Root
          defaultValue={appointment_type?.appointment_type_data![0].id}
        >
          <Tabs.List>
            {appointment_type?.appointment_type_data?.map((t) => (
              <Tabs.Trigger value={t.id}>{t.name}</Tabs.Trigger>
            ))}
          </Tabs.List>
          {appointment_type?.appointment_type_data?.map((t) => (
            <Tabs.Content value={t.id} mt={"2"}>
              <BillingCards typeName={t.name} type={t.id} />
            </Tabs.Content>
          ))}
        </Tabs.Root>
      )}
      {segment === "requests" && (
        <Tabs.Root defaultValue={"lab"}>
          <Tabs.List>
            <Tabs.Trigger value={"lab"}>Laboratory Requests</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value={"lab"} mt={"2"}>
            <LabRequestCard />
          </Tabs.Content>
        </Tabs.Root>
      )}
    </div>
  );
};
function BillingCards({ type, typeName }: { type: string; typeName: string }) {
  const { data: appointments, isPending: isAppointmentPending } = useQuery(
    appointmentsQueryOptions
  );

  if (isAppointmentPending) return <PendingComponent />;

  // const appointment_data_pending = appointments?.appointment_data?.filter(
  //   (a) => {
  //     if (type.length < 1) {
  //       return (
  //         a.is_completed === false &&
  //         a.is_checkedin === false &&
  //         a.is_missed === false &&
  //         a.is_waiting === false
  //       );
  //     } else {
  //       return (
  //         a.appointments_types?.name.toLowerCase() === type.toLowerCase() &&
  //         a.is_completed === false &&
  //         a.is_checkedin === false &&
  //         a.is_missed === false &&
  //         a.is_waiting === false
  //       );
  //     }
  //   }
  // );

  const appointment_data_pending = appointments?.appointment_data?.filter(
    (a) => a.appointments_type_id === type
  );

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {appointment_data_pending?.map((a) => (
          <Card key={a.id}>
            <Flex justify={"between"}>
              <Flex gap={"2"} align={"center"}>
                <Avatar fallback={<UserCheck />} radius="full" size={"3"} />
                <Flex direction={"column"}>
                  <Flex gap={"1"} align={"center"}>
                    <Strong>
                      {a.patients?.first_name} {a.patients?.middle_name}{" "}
                      {a.patients?.last_name} [
                      {a.patients_id.slice(0, 8).toUpperCase()}]
                    </Strong>
                  </Flex>
                  <Flex gap={"1"} align={"center"}>
                    <Text size={"1"}>
                      <Strong>created</Strong>
                    </Text>
                    .
                    <Text size={"1"}>
                      {new Date(a.created_at!).toUTCString()}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <div>
                <UpdateAppointmentForm {...a} id={a.id} />
                <DeleteActionForm
                  id={a.id}
                  warning="Are you sure you want to delete this appointment?"
                  title="Delete Appointment"
                  inValidate="appointments"
                  actionFn={async () => {
                    await deleteAppointmentAction({ id: a.id });
                  }}
                />
              </div>
            </Flex>

            <Flex direction={"column"} mt={"4"}>
              <Flex gap={"2"} mb={"4"} direction={"column"} justify={"end"}>
                {a.is_all_day ? (
                  <div>
                    <Badge>
                      All day{" "}
                      <span className="p-1 animate-pulse bg-[var(--accent-9)] rounded-full" />
                    </Badge>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div>
                      <Badge radius="full">
                        From:{" "}
                        {a.duration
                          ? `${new Date(`${a.duration}`.slice(2, 20)).toLocaleString()}`
                          : "No date"}
                      </Badge>
                    </div>
                    <div>
                      <Badge radius="full" color="red">
                        To:{" "}
                        {a.duration
                          ? `${new Date(`${a.duration}`.slice(24, 43)).toLocaleString()}`
                          : "No date"}
                      </Badge>
                    </div>
                  </div>
                )}
              </Flex>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <Strong>
                    {a.consultation_specialties?.name.toUpperCase()}
                  </Strong>

                  <Text>{a.clinics?.name}</Text>
                </div>
                <div className="flex flex-col">
                  <div>
                    <Text size={"1"}>Default price: </Text>
                    <Badge>
                      N
                      {new Intl.NumberFormat().format(
                        Number(a.consultation_specialties?.default_price)
                      )}
                    </Badge>
                  </div>
                  <div>
                    <Text size={"1"}>Follow up price: </Text>
                    <Badge>
                      N
                      {new Intl.NumberFormat().format(
                        Number(a.consultation_specialties?.follow_up_price)
                      )}
                    </Badge>
                  </div>
                </div>
              </div>
            </Flex>
            <Flex justify={"between"} align={"center"} mt={"4"}>
              <div>
                Follow Up? :{" "}
                {a.follow_up ? (
                  <Badge>Yes</Badge>
                ) : (
                  <Badge color="red">No</Badge>
                )}
              </div>
              <ApprovePayments
                isApproved={a.is_approved!}
                appointmentId={a.id}
                is_appointment
                is_request={false}
                services={[
                  {
                    name: typeName,
                    amount: a.follow_up
                      ? `${a.consultation_specialties?.follow_up_price}`
                      : `${a.consultation_specialties?.default_price}`,
                  },
                ]}
                patientId={a.patients_id}
                amount={
                  a.follow_up
                    ? `${a.consultation_specialties?.follow_up_price}`
                    : `${a.consultation_specialties?.default_price}`
                }
              />
            </Flex>
          </Card>
        ))}
      </div>
    </div>
  );
}

function LabRequestCard() {
  const { data: request_data, isPending: isLabPending } =
    useQuery(requestQueryOptions);

  if (isLabPending) return <PendingComponent />;

  const request__data_filtered = request_data?.request_data?.filter(
    (a) => a.is_waiting === false && a.is_completed === false
  );

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {request__data_filtered?.map((a) => (
          <Card key={a.id}>
            <Flex justify={"between"}>
              <Flex gap={"2"} align={"center"}>
                <Avatar fallback={<UserCheck />} radius="full" size={"3"} />
                <Flex direction={"column"}>
                  <Flex gap={"1"} align={"center"}>
                    <Strong>
                      {a.patients?.first_name} {a.patients?.middle_name}{" "}
                      {a.patients?.last_name} [
                      {a.patients_id.slice(0, 8).toUpperCase()}]
                    </Strong>
                  </Flex>
                  <Flex gap={"1"} align={"center"}>
                    <Text size={"1"}>
                      <Strong>created</Strong>
                    </Text>
                    .
                    <Text size={"1"}>
                      {new Date(a.created_at!).toLocaleString()}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <Flex direction={"column"} mt={"4"} height={"100px"}>
              <div className="flex flex-wrap gap-2 mt-4">
                {JSON.parse(JSON.stringify(a.services)).map(
                  (d: { test: string; note: string; amount: string }) => (
                    <Badge key={d.note}>
                      {d.test} - <Text color="red">N{d.amount}</Text>
                    </Badge>
                  )
                )}
              </div>
            </Flex>
            <Flex justify={"end"} align={"center"} mt={"4"}>
              <ApprovePayments
                isApproved={a.is_approved!}
                is_request
                is_appointment={false}
                requestId={a.id}
                services={JSON.parse(JSON.stringify(a.services)).map(
                  (d: { test: string; note: string; amount: string }) => ({
                    name: d.test,
                    amount: d.amount,
                  })
                )}
                amount={JSON.parse(JSON.stringify(a.services)).reduce(
                  (prev: { amount: string }, curr: { amount: string }) =>
                    Number(prev.amount) + Number(curr.amount)
                )}
                patientId={a.patients_id}
              />
            </Flex>
          </Card>
        ))}
      </div>
    </div>
  );
}
