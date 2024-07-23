import {
  AlertDialog,
  Avatar,
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Select,
  Strong,
  Tabs,
  Text,
} from "@radix-ui/themes";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { UserCheck } from "lucide-react";
import { DeleteActionForm } from "../../../../actions/DeleteAction";
import { changeAppointmentStatus } from "../../../../actions/actions";
import { deleteAppointmentAction } from "../../../../actions/appointment";
import {
  appointmentsQueryOptions,
  appointmentsTypesQueryOptions,
  clinicsQueryOptions,
  patientsQueryOptions,
  specialtiesQueryOptions,
} from "../../../../actions/queries";
import { DateRangePicker } from "../../../../components/ui/date-range-picker";
import {
  CreateAppointmentForm,
  UpdateAppointmentForm,
} from "../../../../forms/AppointmentForm";

const loadData = async (queryClient: QueryClient) => {
  const { patient_data } =
    await queryClient.ensureQueryData(patientsQueryOptions);
  const { clinics_data } =
    await queryClient.ensureQueryData(clinicsQueryOptions);
  const { appointment_type_data } = await queryClient.ensureQueryData(
    appointmentsTypesQueryOptions
  );
  const { specialties_data } = await queryClient.ensureQueryData(
    specialtiesQueryOptions
  );
  const { appointment_data } = await queryClient.ensureQueryData(
    appointmentsQueryOptions
  );

  return {
    appointment_data,
    patient_data,
    clinics_data,
    appointment_type_data,
    specialties_data,
  };
};
export const Route = createFileRoute("/_layout/dashboard/appointments/")({
  loader: async ({ context: { queryClient } }) => await loadData(queryClient),

  component: () => (
    <>
      <Heading mb={"3"}>Appointments</Heading>
      <Tabs.Root defaultValue="consultation">
        <Tabs.List>
          <Tabs.Trigger value="consultation">Consultation</Tabs.Trigger>
          <Tabs.Trigger value="laboratory">Laboratory</Tabs.Trigger>
          <Tabs.Trigger value="pharmacy">Pharmacy</Tabs.Trigger>
          <Tabs.Trigger value="antenatal">Antenatal</Tabs.Trigger>
          <Tabs.Trigger value="radiology">Radiology</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="consultation" mt={"2"}>
          <AppointmentCard />
        </Tabs.Content>
      </Tabs.Root>
    </>
  ),
});

function AppointmentCard() {
  const {
    data: { appointment_data },
  } = useSuspenseQuery(appointmentsQueryOptions);
  const {
    data: { clinics_data },
  } = useSuspenseQuery(clinicsQueryOptions);

  const navigate = useNavigate();

  return (
    <div className="w-full">
      <Card variant="ghost" my={"3"} style={{ background: "var(--accent-2)" }}>
        <div className="flex justify-between flex-col gap-2 md:flex-row">
          <CreateAppointmentForm />

          <div className="flex gap-2 flex-col">
            <DateRangePicker
              onUpdate={(values) => {
                console.log(values);

                // setFrom(
                //   format(endOfDay(values.range.from), "yyyy-MM-dd HH:mm")
                // );
                // setTo(format(endOfDay(values.range.to!), "yyyy-MM-dd HH:mm"));
              }}
              align="start"
              locale="en-GB"
              showCompare={false}
            />
            <Select.Root>
              <Select.Trigger placeholder="Filter by status" />
              <Select.Content position="popper">
                <Select.Group>
                  <Select.Label>--filter by status--</Select.Label>
                  <Select.Item value="waiting">Waiting</Select.Item>
                  <Select.Item value="missed">Missed</Select.Item>
                  <Select.Item value="checkedIn">Checked In</Select.Item>
                  <Select.Item value="completed">completed</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <Select.Root>
              <Select.Trigger placeholder="Filter by clinic" />
              <Select.Content position="popper">
                <Select.Group>
                  <Select.Label>--filter by clinic--</Select.Label>
                  {clinics_data?.map((c) => (
                    <Select.Item key={c.id} value={c.id}>
                      {c.name}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>
        </div>
      </Card>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {appointment_data?.map((a) => (
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
                  redirectTo="/dashboard/appointments"
                  actionFn={async () => {
                    await deleteAppointmentAction({ id: a.id });
                  }}
                />
              </div>
            </Flex>

            <Flex direction={"column"} mt={"4"}>
              <Flex gap={"2"} mb={"4"} direction={"column"} justify={"end"}>
                <div>
                  <Badge radius="full">
                    From:{" "}
                    {a.duration
                      ? `${new Date(`${a.duration}`.slice(2, 20)).toUTCString()}`
                      : "No date"}
                  </Badge>
                </div>
                <div>
                  <Badge radius="full" color="red">
                    To:{" "}
                    {a.duration
                      ? `${new Date(`${a.duration}`.slice(24, 43)).toUTCString()}`
                      : "No date"}
                  </Badge>
                </div>
              </Flex>
              <Strong>{a.consultation_specialties?.name.toUpperCase()}</Strong>
              <Flex gap={"2"} justify={"between"} align={"center"}>
                <Text>{a.clinics?.name}</Text>
                <div className="flex gap-2">
                  {a.is_waiting && (
                    <Badge color="amber">
                      waiting
                      <span className="p-1 bg-[var(--accent-9)] rounded-full animate-pulse" />
                    </Badge>
                  )}
                  {a.is_missed && (
                    <Badge color="red">
                      missed
                      <span className="p-1 bg-[var(--accent-9)] rounded-full animate-pulse" />
                    </Badge>
                  )}
                  {a.is_checkedin && (
                    <Badge color="blue">
                      checked in{" "}
                      <span className="p-1 bg-[var(--accent-9)] rounded-full animate-pulse" />
                    </Badge>
                  )}

                  {a.is_completed && (
                    <Badge>
                      completed
                      <span className="p-1 bg-[var(--accent-9)] rounded-full animate-pulse" />
                    </Badge>
                  )}
                </div>
              </Flex>
            </Flex>
            <Flex justify={"between"} mt={"4"}>
              <ConfirmAppointmentUpdate
                id={a.id}
                title="Move To Waiting?"
                triggleLabel="Waiting"
                disabled={a.is_waiting!}
                warning="Are you sure you want to move this appointment to waiting?"
                actionFn={async () => {
                  await changeAppointmentStatus({
                    id: a.id,
                    isWaiting: true,
                    isCheckedIn: false,
                    isCompleted: false,
                    isMissed: false,
                  });
                  navigate({ to: "/dashboard/appointments" });
                }}
              />

              <ConfirmAppointmentUpdate
                id={a.id}
                title="Mark As Missed?"
                triggleLabel="Missed"
                disabled={a.is_missed!}
                warning="Are you sure you want to mark this appointment as missed?"
                actionFn={async () => {
                  await changeAppointmentStatus({
                    id: a.id,
                    isMissed: true,
                    isWaiting: false,
                    isCheckedIn: false,
                    isCompleted: false,
                  });
                  navigate({ to: "/dashboard/appointments" });
                }}
              />
              <ConfirmAppointmentUpdate
                id={a.id}
                title="Has Checked In?"
                triggleLabel="Checked In"
                disabled={a.is_checkedin!}
                warning="Are you sure this patient has checked in?"
                actionFn={async () => {
                  await changeAppointmentStatus({
                    id: a.id,
                    isCheckedIn: true,
                    isWaiting: false,
                    isCompleted: false,
                    isMissed: false,
                  });
                  navigate({ to: "/dashboard/appointments" });
                }}
              />
              <Link to={`/dashboard/appointments/${a.id}`}>
                <Button size={"2"} radius="full">
                  Attend
                </Button>
              </Link>
            </Flex>
          </Card>
        ))}
      </div>
    </div>
  );
}

interface UpdateActionType {
  id: string;
  title: string;
  warning: string;
  triggleLabel: string;
  disabled: boolean;
  actionFn: ({ id }: { id: string }) => void;
}
const ConfirmAppointmentUpdate = ({
  actionFn,
  id,
  title,
  warning,
  triggleLabel,
  disabled,
}: UpdateActionType) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button size={"2"} radius="full" variant="soft">
          {triggleLabel}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">{warning}</AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              disabled={disabled}
              variant="solid"
              color="red"
              onClick={() => actionFn({ id: id })}
            >
              Confirm
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
