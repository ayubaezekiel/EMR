import {
  Avatar,
  Badge,
  Button,
  Callout,
  Card,
  Flex,
  Strong,
  Text,
} from "@radix-ui/themes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { FileQuestion, UserCheck } from "lucide-react";
import { useMemo } from "react";
import { changeAppointmentStatus } from "../../actions/actions";
import { appointmentsQueryOptions } from "../../actions/queries";
import PendingComponent from "../PendingComponent";
import { ConfirmAppointmentUpdate } from "./ConfirmAppointmentUpdate";

export function AppointmentCheckedIn({
  type,
  to,
  from,
  searchName,
}: {
  type: string;
  to: string;
  from: string;
  searchName: string;
}) {
  const queryClient = useQueryClient();

  const { data: appointments, isPending: isAppointmentPending } = useQuery(
    appointmentsQueryOptions
  );

  const appointment_data_checkedIn = useMemo(
    () =>
      appointments?.appointment_data?.filter((a) => {
        if (searchName.length > 3 && type.length > 3) {
          return (
            a.appointment_types?.name.toLowerCase() === type.toLowerCase() &&
            `${a.patients?.first_name} ${a.patients?.middle_name} ${a.patients?.last_name}`
              .replace(/\s/g, "")
              .toLowerCase()
              .includes(searchName.replace(/\s/g, "").toLowerCase()) &&
            a.is_checkedin === true
          );
        }
        if (type.length > 3) {
          return (
            a.appointment_types?.name.toLowerCase() === type.toLowerCase() &&
            a.is_checkedin === true
          );
        }
        if (searchName.length > 3) {
          return (
            `${a.patients?.first_name} ${a.patients?.middle_name} ${a.patients?.last_name}`
              .replace(/\s/g, "")
              .toLowerCase()
              .includes(searchName.replace(/\s/g, "").toLowerCase()) &&
            a.is_checkedin === true
          );
        }
        if (
          `[${from}, ${to})`.length > 10 &&
          `[${from}, ${to})` !== "[2000-01-01 15:00, 2000-01-01 16:00)"
        ) {
          return a.is_checkedin === true;
          // filteredDateTimeData.filter((f) => f.is_checkedin === true);
          // appointmentsFiltered?.filter((f) => f.is_checkedin === true);
        }
        return a.is_checkedin === true;
      }),
    [appointments?.appointment_data, searchName, from, to, type]
  );
  if (isAppointmentPending) return <PendingComponent />;

  return appointment_data_checkedIn?.length === 0 ? (
    <Flex justify={"center"}>
      <Callout.Root mt={"9"}>
        <Callout.Icon>
          <FileQuestion />
        </Callout.Icon>
        <Callout.Text ml={"1"}>No result found</Callout.Text>
      </Callout.Root>
    </Flex>
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {appointment_data_checkedIn?.map((a) => (
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
            <Strong>{a.appointment_types?.name.toUpperCase()}</Strong>
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
                queryClient.invalidateQueries({
                  queryKey: ["appointments"],
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
                queryClient.invalidateQueries({
                  queryKey: ["appointments"],
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
                queryClient.invalidateQueries({
                  queryKey: ["appointments"],
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
    </div>
  );
}
