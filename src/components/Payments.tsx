import { useCashpointsQuery, usePaymentMethodsQuery } from "@/actions/queries";
import { useProfile } from "@/lib/hooks";
import {
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
import { toast } from "sonner";
import { z } from "zod";
import supabase from "../supabase/client";
import { FieldInfo } from "./FieldInfo";

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
}: PaymentActionType) => {
  const { isPending: isPaymentMethodPending, data: payment_method_data } =
    usePaymentMethodsQuery();
  const { isPending: isCashpointPending, data: cashpoint_data } =
    useCashpointsQuery();
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient();

  const { isProfilePending, profile_data } = useProfile();

  const form = useForm({
    defaultValues: {
      amount: `N${new Intl.NumberFormat().format(Number(amount))}`,
      patient_id: patientId,
      cash_points_id: "",
      is_appointment: is_appointment,
      is_request: is_request,
      admissions_id: admissionId,
      is_admission: isAdmission,
      appointment_id: appointmentId,
      request_id: requestId,
      services: services,
      payments_method_id: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      const { error, data } = await supabase
        .from("payments")
        .insert({
          ...value,
          approved_by: `${profile_data?.id}`,
          amount: amount,
          branch_id: profile_data?.branch_id as string,
        })
        .select();
      if (error && !data) {
        toast.error(error.message);
      } else {
        toast.success("payment approved successfully");
        onOpenChange(false);
        if (is_appointment) {
          queryClient.invalidateQueries({
            queryKey: ["appointments"],
          });
        }

        if (is_request) {
          queryClient.invalidateQueries({
            queryKey: ["requests"],
          });
        }
        if (isAdmission) {
          queryClient.invalidateQueries({ queryKey: ["admissions"] });
        }
      }
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger
        disabled={
          isCashpointPending ||
          isPaymentMethodPending ||
          isProfilePending ||
          !profile_data?.has_access_to_billing
        }
      >
        <Button
          disabled={isApproved}
          loading={
            isCashpointPending ||
            isPaymentMethodPending ||
            !profile_data?.has_access_to_billing
          }
          size={"2"}
          radius="full"
        >
          Approve Payment
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Approve Payment</Dialog.Title>
        <Dialog.Description />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col gap-2 w-full">
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
              name="amount"
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
                  loading={isSubmitting}
                  disabled={!canSubmit || !profile_data?.has_access_to_billing}
                  size={"4"}
                >
                  Confirm
                </Button>
              )}
            />
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
