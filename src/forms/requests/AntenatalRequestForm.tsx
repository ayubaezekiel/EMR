import { usePatientsQuery, useTemplatesQuery } from "@/actions/queries";
import { FieldInfo } from "@/components/FieldInfo";
import RichTextEditor from "@/components/textEditor/TipTapRichTextEditor";
import { useAntenatalPackage, useProfile } from "@/lib/hooks";
import supabase from "@/supabase/client";
import { Group } from "@mantine/core";
import { Button, Dialog, Select, Text, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export function CreateAntenatalRequestForm() {
  const [open, onOpenChange] = useState(false);
  const { antenatal_package_data, isAntenatalPackagePending } =
    useAntenatalPackage();
  const { data, isPending } = useTemplatesQuery();
  const { data: patient_data, isPending: isPatientsPending } =
    usePatientsQuery();

  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();

  const form = useForm({
    defaultValues: {
      services: {
        package: "",
        note: "",
        expected_delivary_date: "",
        amount: 0,
      },
      patients_id: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      const pkg = value.services.package.split("**")[0];
      const amount = value.services.package.split("**")[1];

      const { error, data } = await supabase.from("requests").insert({
        patients_id: `${value.patients_id}`,
        taken_by: `${profile_data?.id}`,
        branch_id: `${profile_data?.branch_id}`,
        is_antenatal: true,
        services: {
          package: pkg,
          note: value.services.note,
          expected_delivary_date: value.services.expected_delivary_date,
          amount: amount,
        },
      });
      if (error && !data) {
        toast.error(error.message);
      } else {
        toast.success("patient enrolled successfully");
        form.reset();
        onOpenChange(false);
        queryClient.invalidateQueries({ queryKey: ["requests"] });
      }
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Button
          size={"4"}
          disabled={!profile_data?.can_issue_request}
          loading={
            isPatientsPending ||
            isPending ||
            isAntenatalPackagePending ||
            isProfilePending
          }
        >
          Enrol For Antental
        </Button>
      </Dialog.Trigger>

      <Dialog.Content title={"Antenatal Request"} maxWidth={"60rem"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col gap-1">
            <Text>Use a template?</Text>
            <Select.Root
              size={"3"}
              onValueChange={(e) => {
                form.setFieldValue("services.note", e!);
              }}
            >
              <Select.Trigger placeholder="Select a template" />
              <Select.Content position="popper">
                {data?.consultation_templates_data?.map((t) => (
                  <Select.Item value={t.content}>{t.name}</Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>

          <div className="grid md:grid-cols-3 gap-2 mt-4">
            <form.Field
              name="patients_id"
              validators={{
                onChange: z.string().min(2, { message: "required" }),
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <Text>Patient*</Text>
                  <Select.Root
                    size={"3"}
                    required
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e!)}
                  >
                    <Select.Trigger placeholder="Select patient" />
                    <Select.Content position="popper">
                      {patient_data?.patient_data?.map((p) => (
                        <Select.Item key={p.id} value={p.id}>
                          {p.first_name} {p.middle_name ?? ""} {p.last_name} - [
                          {p.id.slice(0, 8).toUpperCase()}]
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  <FieldInfo field={field} />
                </div>
              )}
            />
            <form.Field
              name="services.expected_delivary_date"
              validators={{
                onChange: z.string(),
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <TextField.Root
                    type="date"
                    required
                    size={"3"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Select date"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            />
            <form.Field
              name="services.package"
              validators={{
                onChange: z.string().min(2, { message: "required" }),
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <Text>Patient*</Text>
                  <Select.Root
                    size={"3"}
                    required
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e!)}
                  >
                    <Select.Trigger placeholder="Select patient" />
                    <Select.Content position="popper">
                      {antenatal_package_data?.map((p) => (
                        <Select.Item
                          key={p.id}
                          value={`${p.name}**${p.default_price}`}
                        >
                          {p.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>

                  <FieldInfo field={field} />
                </div>
              )}
            />
          </div>

          <form.Field
            name="services.note"
            validators={{
              onChange: z
                .string()
                .min(10, { message: "must be atleast 3 characters" }),
            }}
          >
            {(field) => (
              <label htmlFor={field.name} className="flex flex-col">
                <Text size={"3"}>Note*</Text>
                <RichTextEditor
                  content={field.state.value}
                  onChange={field.handleChange}
                />
                <FieldInfo field={field} />
              </label>
            )}
          </form.Field>
          <Group gap="3" mt="lg" justify="end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  loading={isSubmitting}
                  type="submit"
                  disabled={!canSubmit || !profile_data?.can_issue_request}
                  size={"4"}
                >
                  Enroll Patient
                </Button>
              )}
            />
          </Group>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
