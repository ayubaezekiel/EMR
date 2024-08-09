import { useQuery } from "@tanstack/react-query";
import { appointmentsQueryOptions } from "../../actions/queries";
import PendingComponent from "../PendingComponent";
import { Avatar, Badge, Card, Flex, Strong, Text } from "@radix-ui/themes";
import { UserCheck } from "lucide-react";
import { UpdateAppointmentForm } from "../../forms/AppointmentForm";
import { DeleteActionForm } from "../../actions/DeleteAction";
import { deleteAppointmentAction } from "../../actions/appointment";
import { ApprovePayments } from "../Payments";
import { useMemo } from "react";

export function AppointmentBillingCards({
  type,
  typeName,
}: {
  type: string;
  typeName: string;
}) {
  const { data: appointments, isPending: isAppointmentPending } = useQuery(
    appointmentsQueryOptions
  );
  const appointment_data_pending = useMemo(
    () =>
      appointments?.appointment_data?.filter(
        (a) => a.appointment_types_id === type && a.is_approved === false
      ),
    [appointments?.appointment_data, type]
  );

  if (isAppointmentPending) return <PendingComponent />;

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
                  <Strong>{a.appointment_types?.name.toUpperCase()}</Strong>

                  <Text>{a.clinics?.name}</Text>
                </div>
                <div className="flex flex-col">
                  <div>
                    <Text size={"1"}>Default price: </Text>
                    <Badge>
                      N
                      {new Intl.NumberFormat().format(
                        Number(a.appointment_types?.default_price)
                      )}
                    </Badge>
                  </div>
                  <div>
                    <Text size={"1"}>Follow up price: </Text>
                    <Badge>
                      N
                      {new Intl.NumberFormat().format(
                        Number(a.appointment_types?.follow_up_price)
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
                      ? `${a.appointment_types?.follow_up_price}`
                      : `${a.appointment_types?.default_price}`,
                  },
                ]}
                patientId={a.patients_id}
                amount={
                  a.follow_up
                    ? `${a.appointment_types?.follow_up_price}`
                    : `${a.appointment_types?.default_price}`
                }
              />
            </Flex>
          </Card>
        ))}
      </div>
    </div>
  );
}
