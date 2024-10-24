import { useAdmissionsQuery } from "@/actions/queries";
import { Button, Dialog, Flex, Select, Text, TextArea } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useState } from "react";
import { z } from "zod";
import { createConsultationAction } from "../../actions/config/admission";
import { FieldInfo } from "../../components/FieldInfo";
import { useProfile } from "@/lib/hooks";

export function CreateConsultationRequestForm() {
  const [open, onOpenChange] = useState(false);
  const { isProfilePending, profile_data } = useProfile();
  const { data: admission_data, isPending: isAdmissionPending } =
    useAdmissionsQuery();

  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      admission_id: "",
      note: "",
      is_completed: false,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await createConsultationAction({
        admission_id: value.admission_id,
        created_by: `${profile_data?.id}`,
        note: value.note,
        branch_id: `${profile_data?.branch_id}`,
      });
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["consultations"] });
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger
        disabled={
          isAdmissionPending ||
          isProfilePending ||
          !profile_data?.can_issue_request
        }
      >
        <Button
          size={"4"}
          disabled={!profile_data?.can_issue_request}
          loading={isAdmissionPending || isProfilePending}
        >
          New Request
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Procedure Request</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Fill out the form information
        </Dialog.Description>

        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="admission_id"
            validators={{
              onChange: z
                .string()
                .min(3, { message: "field must be atleast 3 characters" }),
            }}
          >
            {(field) => (
              <div className="flex flex-col">
                <Text size={"3"}>Addmitted Patient*</Text>
                <Select.Root
                  size={"3"}
                  onValueChange={(e) => field.handleChange(e)}
                >
                  <Select.Trigger placeholder="select patient..." />
                  <Select.Content position="popper">
                    {admission_data?.admissions_data?.map((w) => (
                      <Select.Item key={w.id} value={w.id}>
                        {w.patients?.first_name} {w.patients?.middle_name}{" "}
                        {w.patients?.last_name} - [
                        {w.patients?.id.slice(0, 8).toUpperCase()}]
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Field
            name="note"
            validators={{
              onChange: z
                .string()
                .min(3, { message: "field must be atleast 3 characters" }),
            }}
          >
            {(field) => (
              <label htmlFor={field.name} className="flex flex-col">
                <Text size={"3"}>Note*</Text>
                <TextArea
                  name={field.name}
                  id={field.name}
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
                  loading={isSubmitting}
                  type="submit"
                  disabled={!canSubmit || !profile_data?.can_issue_request}
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
