import { useAppointmentsQuery } from "@/actions/queries";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Flex,
  Spinner,
  Strong,
  Text,
} from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { UserCheck } from "lucide-react";
import { useMemo } from "react";
import { changeAppointmentStatus } from "../../actions/actions";
import { NoResultFound } from "../NoResultFound";
import { ConfirmAppointmentUpdate } from "./ConfirmAppointmentUpdate";

export function AppointmentCompleted({
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

  const { data: appointments, isPending: isAppointmentPending } =
    useAppointmentsQuery();

  const appointment_data_completed = useMemo(
    () =>
      appointments?.appointment_data?.filter((a) => {
        if (searchName.length > 3 && type.length > 3) {
          return (
            a.appointment_types?.name.toLowerCase() === type.toLowerCase() &&
            `${a.patients?.first_name} ${a.patients?.middle_name} ${a.patients?.last_name}`
              .replace(/\s/g, "")
              .toLowerCase()
              .includes(searchName.replace(/\s/g, "").toLowerCase()) &&
            a.is_completed === true
          );
        }
        if (type.length > 3) {
          return (
            a.appointment_types?.name.toLowerCase() === type.toLowerCase() &&
            a.is_completed === true
          );
        }
        if (searchName.length > 3) {
          return (
            `${a.patients?.first_name} ${a.patients?.middle_name} ${a.patients?.last_name}`
              .replace(/\s/g, "")
              .toLowerCase()
              .includes(searchName.replace(/\s/g, "").toLowerCase()) &&
            a.is_completed === true
          );
        }
        if (
          `[${from}, ${to})`.length > 10 &&
          `[${from}, ${to})` !== "[2000-01-01 15:00, 2000-01-01 16:00)"
        ) {
          return a.is_completed === true;
        }
        return a.is_completed === true;
      }),
    [appointments?.appointment_data, searchName, type, from, to]
  );

  return isAppointmentPending ? (
    <Spinner />
  ) : appointment_data_completed?.length === 0 ? (
    <NoResultFound />
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {appointment_data_completed?.map((a) => (
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
                    {format(a.created_at!, "LLL MM yyy, HH:mm a")}
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
                    ? format(
                        `${a.duration}`.slice(2, 20),
                        "LLL MM yyy, HH:mm a"
                      )
                    : "No date"}
                </Badge>
              </div>
              <div>
                <Badge radius="full" color="red">
                  To:{" "}
                  {a.duration
                    ? format(
                        `${a.duration}`.slice(24, 43),
                        "LLL MM yyy, HH:mm a"
                      )
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
              disabled={true}
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
              disabled={true}
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
              disabled={true}
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

            <Button disabled size={"2"} radius="full">
              Attend
            </Button>
          </Flex>
        </Card>
      ))}
    </div>
  );
}
