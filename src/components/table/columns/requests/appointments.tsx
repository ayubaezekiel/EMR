import { changeAppointmentStatus } from "@/actions/actions";
import { ConfirmAppointmentUpdate } from "@/components/appointment/ConfirmAppointmentUpdate";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Flex,
  Strong,
  Text,
} from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { UserCheck } from "lucide-react";

export const appointment_column: ColumnDef<
  DB["appointments"]["Row"] & {
    patients: { middle_name?: string; last_name: string; first_name: string };
    appointment_types: { name: string };
    clinics: { name: string };
  }
>[] = [
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const params = row.original;

      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <Card>
            <Flex justify={"between"}>
              <Flex gap={"2"} align={"center"}>
                <Avatar fallback={<UserCheck />} radius="full" size={"3"} />
                <Flex direction={"column"}>
                  <Flex gap={"1"} align={"center"}>
                    <Strong>
                      {params.patients?.first_name}{" "}
                      {params.patients?.middle_name}{" "}
                      {params.patients?.last_name} [
                      {params.patients_id.slice(0, 8).toUpperCase()}]
                    </Strong>
                  </Flex>
                  <Flex gap={"1"} align={"center"}>
                    <Text size={"1"}>
                      <Strong>created</Strong>
                    </Text>
                    .
                    <Text size={"1"}>
                      {format(params.created_at!, "LLL MM yyy, HH:mm a")}
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
                    {params.duration
                      ? format(
                          `${params.duration}`.slice(2, 20),
                          "LLL MM yyy, HH:mm a"
                        )
                      : "No date"}
                  </Badge>
                </div>
                <div>
                  <Badge radius="full" color="red">
                    To:{" "}
                    {params.duration
                      ? format(
                          `${params.duration}`.slice(24, 43),
                          "LLL MM yyy, HH:mm a"
                        )
                      : "No date"}
                  </Badge>
                </div>
              </Flex>
              <Strong>{params.appointment_types?.name.toUpperCase()}</Strong>
              <Flex gap={"2"} justify={"between"} align={"center"}>
                <Text>{params.clinics?.name}</Text>
                <div className="flex gap-2">
                  {params.is_waiting && (
                    <Badge color="amber">
                      waiting
                      <span className="p-1 bg-[var(--accent-9)] rounded-full animate-pulse" />
                    </Badge>
                  )}
                  {params.is_missed && (
                    <Badge color="red">
                      missed
                      <span className="p-1 bg-[var(--accent-9)] rounded-full animate-pulse" />
                    </Badge>
                  )}
                  {params.is_checkedin && (
                    <Badge color="blue">
                      checked in{" "}
                      <span className="p-1 bg-[var(--accent-9)] rounded-full animate-pulse" />
                    </Badge>
                  )}

                  {params.is_completed && (
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
                id={params.id}
                title="Move To Waiting?"
                triggleLabel="Waiting"
                disabled={true}
                warning="Are you sure you want to move this appointment to waiting?"
                actionFn={async () => {
                  await changeAppointmentStatus({
                    id: params.id,
                    isWaiting: true,
                    isCheckedIn: false,
                    isCompleted: false,
                    isMissed: false,
                  });
                  // queryClient.invalidateQueries({
                  //   queryKey: ["appointments"],
                  // });
                }}
              />

              <ConfirmAppointmentUpdate
                id={params.id}
                title="Mark As Missed?"
                triggleLabel="Missed"
                disabled={true}
                warning="Are you sure you want to mark this appointment as missed?"
                actionFn={async () => {
                  await changeAppointmentStatus({
                    id: params.id,
                    isMissed: true,
                    isWaiting: false,
                    isCheckedIn: false,
                    isCompleted: false,
                  });
                  // queryClient.invalidateQueries({
                  //   queryKey: ["appointments"],
                  // });
                }}
              />
              <ConfirmAppointmentUpdate
                id={params.id}
                title="Has Checked In?"
                triggleLabel="Checked In"
                disabled={true}
                warning="Are you sure this patient has checked in?"
                actionFn={async () => {
                  await changeAppointmentStatus({
                    id: params.id,
                    isCheckedIn: true,
                    isWaiting: false,
                    isCompleted: false,
                    isMissed: false,
                  });
                  // queryClient.invalidateQueries({
                  //   queryKey: ["appointments"],
                  // });
                }}
              />

              <Button disabled size={"2"} radius="full">
                Attend
              </Button>
            </Flex>
          </Card>
        </div>
      );
    },
  },
];
