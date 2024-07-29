import { DateRangePicker } from "@nextui-org/react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Dialog,
  Flex,
  Heading,
  Select,
  Spinner,
  Strong,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { UserCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteAppointmentAction } from "../../../actions/appointment";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import {
  appointmentsQueryOptions,
  appointmentsTypesQueryOptions,
  cashpointsQueryOptions,
  paymentMethodsQueryOptions,
} from "../../../actions/queries";
import PendingComponent from "../../../components/PendingComponent";
import { UpdateAppointmentForm } from "../../../forms/AppointmentForm";
import { PatientForm } from "../../../forms/PatientForm";
import supabase from "../../../supabase/client";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { FieldInfo } from "../../../components/FieldInfo";

export const Route = createFileRoute("/_layout/dashboard/billing")({
  component: () => (
    <div>
      <Heading>Billing</Heading>
      <BillingCards />
    </div>
  ),
});

function BillingCards() {
  const [type, setType] = useState("");

  const { data: appointments, isPending: appointmentPending } = useQuery(
    appointmentsQueryOptions
  );
  const { data: appointment_type, isPending: appointmentType } = useQuery(
    appointmentsTypesQueryOptions
  );

  if (appointmentPending || appointmentType) return <PendingComponent />;

  const appointment_type_data = appointment_type?.appointment_type_data;

  const appointment_data_pending = appointments?.appointment_data?.filter(
    (a) => {
      if (type.length < 1) {
        return (
          a.is_completed === false &&
          a.is_checkedin === false &&
          a.is_missed === false &&
          a.is_waiting === false
        );
      } else {
        return (
          a.appointments_types?.name.toLowerCase() === type.toLowerCase() &&
          a.is_completed === false &&
          a.is_checkedin === false &&
          a.is_missed === false &&
          a.is_waiting === false
        );
      }
    }
  );

  return (
    <div className="w-full">
      <Card variant="ghost" my={"3"} style={{ background: "var(--accent-2)" }}>
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
              <ApprovePayment
                isFollowUp={Boolean(a.follow_up)}
                appointmentId={a.id}
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

interface PaymentActionType {
  isFollowUp: boolean;
  appointmentId: string;
  amount: string;
}
const ApprovePayment = ({
  amount,
  appointmentId,
  isFollowUp,
}: PaymentActionType) => {
  const { isPending: isPaymentMethodPending, data: payment_method_data } =
    useQuery(paymentMethodsQueryOptions);
  const { isPending: isCashpointPending, data: cashpoint_data } = useQuery(
    cashpointsQueryOptions
  );
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      ammount: amount,
      appointments_id: appointmentId,
      cash_points_id: "",
      payments_method_id: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async (values) => {
      const { error } = await supabase
        .from("payments")
        .insert(values.value)
        .select();
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("payment approved successfully");
        onOpenChange(false);
        queryClient.invalidateQueries({ queryKey: ["appointments"] });
      }
    },
  });

  if (isCashpointPending || isPaymentMethodPending) return <PendingComponent />;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Button size={"2"} radius="full">
          Approve Payment
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Approve Patient Payment</Dialog.Title>

        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col gap-2 w-full">
            {isFollowUp && (
              <Flex justify={"end"} my={"2"}>
                <Badge>Follow Up</Badge>
              </Flex>
            )}
            <form.Field
              name="payments_method_id"
              validators={{
                onChange: z
                  .string()
                  .min(3, { message: "select a payment method" }),
              }}
              children={(field) => (
                <div className="flex flex-col w-full">
                  <Text size={"3"}>Payment Method*</Text>
                  <Select.Root
                    required
                    size={"3"}
                    name={field.name}
                    onValueChange={(e) => field.handleChange(e)}
                    value={field.state.value}
                  >
                    <Select.Trigger placeholder="select payment method...." />
                    <Select.Content position="popper">
                      {payment_method_data?.payment_method_data?.map((p) => (
                        <Select.Item key={p.id} value={p.id}>
                          {p.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  <FieldInfo field={field} />
                </div>
              )}
            />
            <form.Field
              name="cash_points_id"
              validators={{
                onChange: z.string().min(3, { message: "select a cashpoint" }),
              }}
              children={(field) => (
                <div className="flex flex-col w-full">
                  <Text size={"3"}>Cashpoint*</Text>
                  <Select.Root
                    size={"3"}
                    name={field.name}
                    onValueChange={(e) => field.handleChange(e)}
                    value={field.state.value}
                  >
                    <Select.Trigger placeholder="select cashpoint...." />
                    <Select.Content position="popper">
                      {cashpoint_data?.cashpoint_data?.map((p) => (
                        <Select.Item key={p.id} value={p.id}>
                          {p.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  <FieldInfo field={field} />
                </div>
              )}
            />
            <form.Field
              name="ammount"
              validators={{
                onChange: z.string(),
              }}
              children={(field) => (
                <div className="flex flex-col w-full">
                  <Text size={"3"}>Amount*</Text>
                  <TextField.Root
                    variant="soft"
                    size={"3"}
                    name={field.name}
                    disabled
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Amount..."
                    value={field.state.value}
                  />
                </div>
              )}
            />
          </div>
          <Flex gap="3" mt="4" justify="end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  variant="soft"
                  type="submit"
                  disabled={!canSubmit}
                  size={"4"}
                >
                  {isSubmitting && <Spinner />} Confirm
                </Button>
              )}
            />
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
