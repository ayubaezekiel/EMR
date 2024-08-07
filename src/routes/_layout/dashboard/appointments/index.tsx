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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { UserCheck } from "lucide-react";
import { useState } from "react";
import { changeAppointmentStatus } from "../../../../actions/actions";
import {
  appointmentsQueryOptions,
  appointmentsTypesQueryOptions,
} from "../../../../actions/queries";
import PendingComponent from "../../../../components/PendingComponent";
import { DateRangePicker } from "../../../../components/ui/date-range-picker";
import { CreateAppointmentForm } from "../../../../forms/AppointmentForm";

export const Route = createFileRoute("/_layout/dashboard/appointments/")({
  component: () => (
    <>
      <Heading mb={"3"}>Appointments</Heading>
      <Tabs.Root defaultValue="waiting">
        <Tabs.List>
          <Tabs.Trigger value="waiting">Waiting</Tabs.Trigger>
          <Tabs.Trigger value="checked">Checked In</Tabs.Trigger>
          <Tabs.Trigger value="missed">Missed</Tabs.Trigger>
          <Tabs.Trigger value="completed">Completed</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="waiting" mt={"2"}>
          <AppointmentCard
            isCheckedIn={false}
            isCompleted={false}
            isMissed={false}
            isWaiting={true}
          />
        </Tabs.Content>
        <Tabs.Content value="checked" mt={"2"}>
          <AppointmentCard
            isCheckedIn={true}
            isCompleted={false}
            isMissed={false}
            isWaiting={false}
          />
        </Tabs.Content>
        <Tabs.Content value="missed" mt={"2"}>
          <AppointmentCard
            isCheckedIn={false}
            isCompleted={false}
            isMissed={true}
            isWaiting={false}
          />
        </Tabs.Content>

        <Tabs.Content value="completed" mt={"2"}>
          <AppointmentCard
            isCheckedIn={false}
            isCompleted={true}
            isMissed={false}
            isWaiting={false}
          />
        </Tabs.Content>
      </Tabs.Root>
    </>
  ),
});

interface AppointmentStatus {
  isWaiting?: boolean;
  isCheckedIn?: boolean;
  isMissed?: boolean;
  isCompleted?: boolean;
}
function AppointmentCard({
  isCheckedIn,
  isCompleted,
  isMissed,
  isWaiting,
}: AppointmentStatus) {
  const [type, setType] = useState("");

  const { data: appointments, isPending: appointmentPending } = useQuery(
    appointmentsQueryOptions
  );
  const { data: appointment_type, isPending: appointmentType } = useQuery(
    appointmentsTypesQueryOptions
  );

  if (appointmentPending || appointmentType) return <PendingComponent />;

  const appointment_type_data = appointment_type?.appointment_type_data;

  const appointment_data_waiting = appointments?.appointment_data?.filter(
    (a) => {
      if (type.length < 3) {
        return Boolean(a.is_waiting) === isWaiting;
      }
      if (type.length > 3) {
        return (
          a.appointments_types?.name.toLowerCase() === type.toLowerCase() &&
          a.is_waiting === isWaiting
        );
      }
    }
  );
  const appointment_data_checkedIn = appointments?.appointment_data?.filter(
    (a) => {
      if (type.length < 3) {
        return Boolean(a.is_checkedin) === isCheckedIn;
      }
      if (type.length > 3) {
        return (
          a.appointments_types?.name.toLowerCase() === type.toLowerCase() &&
          a.is_checkedin === isCheckedIn
        );
      }
    }
  );

  const appointment_data_missed = appointments?.appointment_data?.filter(
    (a) =>
      a.appointments_types?.name.toLowerCase() === type.toLowerCase() &&
      a.is_missed === isMissed
  );
  const appointment_data_completed = appointments?.appointment_data?.filter(
    (a) =>
      a.appointments_types?.name.toLowerCase() === type.toLowerCase() &&
      a.is_completed === isCompleted
  );

  return (
    <div className="w-full">
      <Card variant="ghost" my={"3"} style={{ background: "var(--accent-2)" }}>
        <div className="flex justify-between flex-col gap-2 md:flex-row">
          <CreateAppointmentForm />

          <div className="flex gap-2 flex-col">
            <DateRangePicker
              // onUpdate={(values) => {
              // console.log(values);

              // setFrom(
              // format(endOfDay(values.range.from), "yyyy-MM-dd HH:mm")
              // );
              // setTo(format(endOfDay(values.range.to!), "yyyy-MM-dd HH:mm"));
              // }}
              align="start"
              locale="en-GB"
              showCompare={false}
            />

            <Select.Root onValueChange={(e) => setType(e)}>
              <Select.Trigger placeholder="Filter by type" />
              <Select.Content position="popper">
                <Select.Group>
                  <Select.Label>--filter by appointment type--</Select.Label>
                  {appointment_type_data?.map((t) => (
                    <Select.Item key={t.id} value={t.name}>
                      {t.name}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>
        </div>
      </Card>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {isWaiting &&
          appointment_data_waiting?.map((a) => (
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

              <Flex direction={"column"} mt={"4"}>
                <Flex gap={"2"} mb={"4"} direction={"column"} justify={"end"}>
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
                </Flex>
                <Strong>
                  {a.consultation_specialties?.name.toUpperCase()}
                </Strong>
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
                  }}
                />

                <Button
                  asChild
                  disabled={!isCheckedIn}
                  size={"2"}
                  radius="full"
                >
                  <Link to={`/dashboard/appointments/${a.patients_id}`}>
                    {" "}
                    Attend
                  </Link>
                </Button>
              </Flex>
            </Card>
          ))}

        {isCheckedIn &&
          appointment_data_checkedIn?.map((a) => (
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

              <Flex direction={"column"} mt={"4"}>
                <Flex gap={"2"} mb={"4"} direction={"column"} justify={"end"}>
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
                </Flex>
                <Strong>
                  {a.consultation_specialties?.name.toUpperCase()}
                </Strong>
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
                  }}
                />
                <Button asChild size={"2"} radius="full">
                  <Link to={`/dashboard/appointments/${a.patients_id}`}>
                    Attend
                  </Link>
                </Button>
              </Flex>
            </Card>
          ))}

        {isMissed &&
          appointment_data_missed?.map((a) => (
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

              <Flex direction={"column"} mt={"4"}>
                <Flex gap={"2"} mb={"4"} direction={"column"} justify={"end"}>
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
                </Flex>
                <Strong>
                  {a.consultation_specialties?.name.toUpperCase()}
                </Strong>
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
                  }}
                />
                <Link to={`/dashboard/appointments/${a.patients_id}`}>
                  <Button size={"2"} radius="full">
                    Attend
                  </Button>
                </Link>
              </Flex>
            </Card>
          ))}

        {isCompleted &&
          appointment_data_completed?.map((a) => (
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

              <Flex direction={"column"} mt={"4"}>
                <Flex gap={"2"} mb={"4"} direction={"column"} justify={"end"}>
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
                </Flex>
                <Strong>
                  {a.consultation_specialties?.name.toUpperCase()}
                </Strong>
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
                  }}
                />
                <Link to={`/dashboard/appointments/${a.patients_id}`}>
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
  const queryClient = useQueryClient();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button disabled={disabled} size={"2"} radius="full" variant="soft">
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
              onClick={() => {
                actionFn({ id: id });
                queryClient.invalidateQueries({ queryKey: ["appointments"] });
              }}
            >
              Confirm
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
