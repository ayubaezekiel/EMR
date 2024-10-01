import {
  createHistoryTakingAction,
  updateHistoryTakingAction,
} from "@/actions/consultation/actions";
import { FieldInfo } from "@/components/FieldInfo";
import { useProfile } from "@/lib/hooks";
import { Button, Dialog, Flex, Text, TextArea } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export function CreateHistoryTakingForm({
  isAdmission,
  patientId,
}: {
  isAdmission: boolean;
  patientId: string;
}) {
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();
  const [open, onOpenChange] = useState(false);

  const form = useForm({
    defaultValues: {
      patients_id: "",
      taken_by: "",
      note: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await createHistoryTakingAction({
        note: value.note,
        patients_id: patientId,
        taken_by: `${profile_data?.id}`,
        branch_id: `${profile_data?.branch_id}`,
        is_admission: isAdmission,
      });
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["historyTaking"] });
    },
  });

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Trigger>
        <Button
          size="4"
          disabled={!profile_data?.has_access_to_doctor_priviledges}
          loading={isProfilePending}
        >
          Add New
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth={"60rem"}>
        <Dialog.Title>New History</Dialog.Title>
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="note"
            validators={{
              onChange: z
                .string()
                .min(10, { message: "must be atleast 3 characters" }),
            }}
          >
            {(field) => (
              <label htmlFor={field.name} className="flex flex-col">
                <Text size={"3"}>Note*</Text>
                <TextArea
                  size={"3"}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FieldInfo field={field} />
              </label>
            )}
          </form.Field>
          <Flex gap="3" mt="4" justify="end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  mt="4"
                  loading={isSubmitting}
                  type="submit"
                  disabled={!canSubmit}
                  size={"4"}
                >
                  Save
                </Button>
              )}
            </form.Subscribe>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export function UpdateHistoryTakingForm({
  id,
  ...values
}: DB["history_taking"]["Update"]) {
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();
  const [open, onOpenChange] = useState(false);

  const form = useForm({
    defaultValues: {
      ...values,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await updateHistoryTakingAction({
        id: id,
        note: value.note,
        patients_id: values.patients_id,
        taken_by: `${profile_data?.id}`,
        branch_id: `${profile_data?.branch_id}`,
      });
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["historyTaking"] });
    },
  });

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Trigger
        disabled={
          isProfilePending || !profile_data?.has_access_to_doctor_priviledges
        }
      >
        <Button variant="ghost" loading={isProfilePending}>
          <Edit size={16} />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth={"60rem"}>
        <Dialog.Title>Update History</Dialog.Title>
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="note"
            validators={{
              onChange: z
                .string()
                .min(10, { message: "must be atleast 3 characters" }),
            }}
          >
            {(field) => (
              <label htmlFor={field.name} className="flex flex-col">
                <Text size={"3"}>Note*</Text>
                <TextArea
                  size={"3"}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FieldInfo field={field} />
              </label>
            )}
          </form.Field>
          <Flex gap="3" mt="4" justify="end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  mt="4"
                  loading={isSubmitting}
                  type="submit"
                  disabled={!canSubmit}
                  size={"4"}
                >
                  Update
                </Button>
              )}
            </form.Subscribe>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
