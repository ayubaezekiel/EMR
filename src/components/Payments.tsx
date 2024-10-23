import { useCashpointsQuery, usePaymentMethodsQuery } from "@/actions/queries";
import { useProfile } from "@/lib/hooks";
import supabase from "@/supabase/client";
import {
  Badge,
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useState } from "react";
import { z } from "zod";
import { FieldInfo } from "./FieldInfo";
import { toast } from "sonner";

interface PaymentActionType {
  patientId: string;
  amount: string;
  services: [{ name: string; amount: string }];
  appointmentId?: string;
  admissionId?: string;
  requestId?: string;
  is_appointment?: boolean;
  is_request?: boolean;
  isApproved?: boolean;
  isAdmission?: boolean;
  isBulk: boolean;
}

export const ApprovePayments = ({
  amount,
  patientId,
  services,
  appointmentId,
  requestId,
  is_request,
  is_appointment,
  isApproved,
  isAdmission,
  admissionId,
  isBulk,
}: PaymentActionType) => {
  const { isPending: isPaymentMethodPending, data: payment_method_data } =
    usePaymentMethodsQuery();
  const { isPending: isCashpointPending, data: cashpoint_data } =
    useCashpointsQuery();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { isProfilePending, profile_data } = useProfile();

  const refined_amount = new Intl.NumberFormat("en-NG", {
    currency: "NGN",
    style: "currency",
  }).format(Number(amount));

  const form = useForm({
    defaultValues: {
      amount: refined_amount,
      patient_id: patientId,
      is_appointment: is_appointment,
      is_request: is_request,
      admissions_id: admissionId,
      is_admission: isAdmission,
      appointment_id: appointmentId,
      request_id: requestId,
      services: {
        services,
        payments_method: "",
        cash_point: "",
      },
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      const paymentData = {
        is_admission: Boolean(isAdmission),
        is_appointment: Boolean(is_appointment),
        is_request: Boolean(is_request),
        patient_id: patientId,
        services: value.services,
        approved_by: `${profile_data?.id}`,
        branch_id: profile_data?.branch_id as string,
      };

      if (isBulk) {
        // Handle bulk submission
        const bulkPayments = [
          { ...paymentData },
          { ...paymentData },
          { ...paymentData },
        ];
        console.log(bulkPayments);

        const { error, data } = await supabase
          .from("payments")
          .insert(bulkPayments)
          .select();

        if (error && !data) {
          toast.error(error.message);
        } else {
          toast.success("Bulk payments approved successfully");
          setOpen(false);
          queryClient.invalidateQueries({ queryKey: ["billingData"] });
        }
      } else {
        // Handle single submission
        const { error, data } = await supabase
          .from("payments")
          .insert(paymentData)
          .select();

        if (error && !data) {
          toast.error(error.message);
        } else {
          toast.success("Payment approved successfully");
          setOpen(false);
          queryClient.invalidateQueries({ queryKey: ["billingData"] });
        }
      }
    },
  });

  return (
    <Flex mt={"4"} justify={"between"} align={"center"}>
      {isBulk && <Badge>{refined_amount}</Badge>}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <Button
            disabled={
              isCashpointPending ||
              isPaymentMethodPending ||
              isProfilePending ||
              !profile_data?.has_access_to_billing ||
              isApproved
            }
            color={isBulk ? "red" : "grass"}
            radius="full"
          >
            {isBulk ? "Approve All" : "Approve Payment"}
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>
            Approve {isBulk ? "Bulk Payments" : "Payment"}
          </Dialog.Title>
          <Dialog.Description>
            {isBulk
              ? "This will approve all pending payments for this patient."
              : "Approve the payment for the selected service."}
          </Dialog.Description>

          <form
            onSubmit={(e) => {
              e.stopPropagation();
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="space-y-4">
              <form.Field
                name="services.payments_method"
                validators={{
                  onChange: z
                    .string()
                    .min(3, { message: "Select a payment method" }),
                }}
              >
                {(field) => (
                  <div>
                    <Text>Payment Method*</Text>
                    <Select.Root
                      size={"3"}
                      required
                      name={field.name}
                      onValueChange={field.handleChange}
                      value={field.state.value}
                    >
                      <Select.Trigger
                        className="w-full"
                        placeholder="Select payment method..."
                      />
                      <Select.Content>
                        {payment_method_data?.payment_method_data?.map((p) => (
                          <Select.Item key={p.id} value={p.name}>
                            {p.name}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                    <FieldInfo field={field} />
                  </div>
                )}
              </form.Field>

              <form.Field
                name="services.cash_point"
                validators={{
                  onChange: z
                    .string()
                    .min(3, { message: "Select a cashpoint" }),
                }}
              >
                {(field) => (
                  <div>
                    <Text>Cashpoint*</Text>
                    <Select.Root
                      size={"3"}
                      name={field.name}
                      onValueChange={field.handleChange}
                      value={field.state.value}
                    >
                      <Select.Trigger
                        className="w-full"
                        placeholder="Select cashpoint..."
                      />
                      <Select.Content>
                        {cashpoint_data?.cashpoint_data?.map((p) => (
                          <Select.Item key={p.id} value={p.name}>
                            {p.name}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                    <FieldInfo field={field} />
                  </div>
                )}
              </form.Field>

              <form.Field name="amount">
                {(field) => (
                  <div>
                    <Text>Amount*</Text>
                    <TextField.Root
                      size={"3"}
                      type="text"
                      name={field.name}
                      disabled
                      onChange={(e) => field.handleChange(e.target.value)}
                      value={field.state.value}
                      placeholder="Amount..."
                    />
                  </div>
                )}
              </form.Field>
            </div>

            <Flex justify="end" className="mt-4">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    size={"4"}
                    type="submit"
                    disabled={
                      !canSubmit || !profile_data?.has_access_to_billing
                    }
                    loading={isSubmitting}
                  >
                    Confirm {isBulk ? "Bulk Approval" : "Approval"}
                  </Button>
                )}
              </form.Subscribe>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
};
