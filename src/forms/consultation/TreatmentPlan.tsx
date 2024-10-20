import { createPlanAction } from "@/actions/consultation/actions";
import { useTemplatesQuery } from "@/actions/queries";
import { FieldInfo } from "@/components/FieldInfo";
import RichTextEditor from "@/components/textEditor/TipTapRichTextEditor";
import { useProfile } from "@/lib/hooks";
import { Select } from "@mantine/core";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

export function CreateTreatmentPlanForm({
  isAdmission,
  patientId,
}: {
  isAdmission: boolean;
  patientId: string;
}) {
  const { data, isPending } = useTemplatesQuery();

  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();

  const form = useForm({
    defaultValues: {
      patients_id: "",
      taken_by: "",
      note: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await createPlanAction({
        note: value.note,
        patients_id: patientId,
        taken_by: `${profile_data?.id}`,
        branch_id: `${profile_data?.branch_id}`,
        is_admission: isAdmission,
      });
      form.reset();
      close();
      queryClient.invalidateQueries({ queryKey: ["treatmentPlan"] });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-1 w-96">
        <Select
          label="Use a template?"
          onChange={(e) => {
            form.setFieldValue("note", e!);
          }}
          data={
            data?.consultation_templates_data?.map((t) => ({
              value: t.content,
              label: t.name,
            })) ?? []
          }
        />
      </div>
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
            <Text size={"3"}>Task</Text>
            <RichTextEditor
              content={field.state.value}
              onChange={field.handleChange}
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
              loading={isSubmitting || isProfilePending || isPending}
              type="submit"
              disabled={!canSubmit || isSubmitting}
              size={"4"}
            >
              Save
            </Button>
          )}
        </form.Subscribe>
      </Flex>
    </form>
  );
}
