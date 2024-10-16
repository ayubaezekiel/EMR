import supabase from "@/supabase/client";
import {
  Avatar,
  Badge,
  Card,
  Flex,
  Spinner,
  Strong,
  Text,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { UserCheck } from "lucide-react";
import { NoResultFound } from "../NoResultFound";

export function PatientAppointments({ patientId }: { patientId: string }) {
  const { data: appointments, isPending: isAppointmentPending } = useQuery({
    queryFn: async () => {
      const { data } = await supabase
        .from("appointments")
        .select("*,patients(*),appointment_types(*),clinics(*)")
        .eq("patients_id", patientId);
      return data;
    },
    queryKey: ["appointmentsById"],
  });

  const appointment_data = appointments;

  return isAppointmentPending ? (
    <Spinner />
  ) : appointment_data?.length === 0 ? (
    <NoResultFound />
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
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
        </Card>
      ))}
    </div>
  );
}
