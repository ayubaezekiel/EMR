import { Badge, Flex, Strong, Text } from "@radix-ui/themes";
import { ApprovePayments } from "../Payments";

export function AppointmentBillingCards({
  first_name,
  middle_name,
  last_name,
  appointmentId,
  is_approved,
  patientId,
  appointment_type,
  clinic_name,
  appointment_type_default_price,
  appointment_type_follow_up_price,
  follow_up,
  duration,
}: {
  duration: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  is_approved: boolean;
  patientId: string;
  appointment_type: string;
  clinic_name: string;
  appointmentId: string;
  appointment_type_default_price: number;
  appointment_type_follow_up_price: number;
  follow_up: boolean;
}) {
  return (
    <div>
      <Flex gap={"2"} mb={"4"} direction={"column"} justify={"end"}>
        <Flex align={"center"} gap={"2"} justify={"between"}>
          <Text size={"1"}>Created By : </Text>

          <Badge>
            {first_name} {middle_name} {last_name}
          </Badge>
        </Flex>
        <div className="flex flex-col gap-2">
          <div>
            <Badge radius="full">
              From:{" "}
              {duration
                ? `${new Date(`${duration}`.slice(2, 20)).toLocaleString()}`
                : "No date"}
            </Badge>
          </div>
          <div>
            <Badge radius="full" color="red">
              To:{" "}
              {duration
                ? `${new Date(`${duration}`.slice(24, 43)).toLocaleString()}`
                : "No date"}
            </Badge>
          </div>
        </div>
      </Flex>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <Strong>{appointment_type.toUpperCase()}</Strong>

          <Text>{clinic_name}</Text>
        </div>
        <div className="flex flex-col">
          <div>
            <Text size={"1"}>Default price: </Text>
            <Badge>
              N
              {new Intl.NumberFormat().format(
                Number(appointment_type_default_price)
              )}
            </Badge>
          </div>
          <div>
            <Text size={"1"}>Follow up price: </Text>
            <Badge>
              N
              {new Intl.NumberFormat().format(
                Number(appointment_type_follow_up_price)
              )}
            </Badge>
          </div>
        </div>
      </div>
      <Flex justify={"between"} align={"center"} mt={"4"}>
        <div>
          Follow Up? :{" "}
          {follow_up ? <Badge>Yes</Badge> : <Badge color="red">No</Badge>}
        </div>
        <ApprovePayments
          isBulk={false}
          isApproved={is_approved}
          appointmentId={appointmentId}
          is_appointment
          is_request={false}
          services={[
            {
              name: appointment_type,
              amount: follow_up
                ? `${appointment_type_follow_up_price}`
                : `${appointment_type_default_price}`,
            },
          ]}
          patientId={patientId}
          amount={
            follow_up
              ? `${appointment_type_follow_up_price}`
              : `${appointment_type_default_price}`
          }
        />
      </Flex>
    </div>
  );
}
