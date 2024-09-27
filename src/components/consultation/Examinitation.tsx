import { useConsultationTemplatesQuery } from "@/actions/queries";
import { useProfile } from "@/lib/hooks";
import { Button, Modal, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Flex, Spinner, Text } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Editor } from "@tinymce/tinymce-react";
import { Edit } from "lucide-react";
import { useMemo } from "react";
import { z } from "zod";
import { getExaminationById } from "../../actions/actions";
import {
  createExaminationAction,
  updateExaminationAction,
} from "../../actions/consultation/actions";
import { FieldInfo } from "../FieldInfo";
import { DataTable } from "../table/DataTable";
import { patient_examination_column } from "../table/columns/consultation/patient_examination";
import { editor_plugins } from "../textEditor/RichTextEditor";
import { SharedConsultationTypes } from "./SharedTypes";

export function Examination({
  isAdmission,
  patientId,
}: {
  isAdmission: boolean;
  patientId: string;
}) {
  const { data, isPending } = useQuery({
    queryFn: () => getExaminationById(patientId),
    queryKey: ["examinations"],
  });

  const examination_data: SharedConsultationTypes[] =
    useMemo(
      () =>
        data?.examination_data?.map((d) => ({
          created_by: d.taken_by,
          created_at: d.created_at,
          id: d.id,
          note: d.note,
          patient_id: d.patients_id,
          profile: `${d.profile?.first_name} ${d.profile?.middle_name ?? ""} ${d.profile?.last_name}`,
          is_admission: Boolean(d.is_admission),
        })),
      [data?.examination_data]
    ) ?? [];

  return (
    <div>
      {isPending ? (
        <Spinner />
      ) : (
        <CreateExaminationForm
          patientId={patientId}
          isAdmission={isAdmission}
        />
      )}
      <div>
        <DataTable
          columns={patient_examination_column}
          data={examination_data}
          filterLabel="search by person recorded..."
          filterer="profile"
        />
      </div>
    </div>
  );
}
export function CreateExaminationForm({
  isAdmission,
  patientId,
}: {
  isAdmission: boolean;
  patientId: string;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  const { data, isPending } = useConsultationTemplatesQuery();
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();

  const form = useForm({
    defaultValues: {
      note: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await createExaminationAction({
        note: value.note,
        patients_id: patientId,
        taken_by: `${profile_data?.id}`,
        branch_id: `${profile_data?.branch_id}`,
        is_admission: isAdmission,
      });
      form.reset();
      close();
      queryClient.invalidateQueries({ queryKey: ["examinations"] });
    },
  });

  return (
    <>
      <Button size="md" onClick={open} loading={isProfilePending}>
        Add New
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title={"Examination"}
        size={"60rem"}
      >
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col gap-1 w-96">
            {isPending ? (
              <Spinner />
            ) : (
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
            )}
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
                <Editor
                  tinymceScriptSrc="/tinymce/tinymce.min.js"
                  licenseKey="gpl"
                  onBlur={(e) => {
                    field.handleChange(e.target.getContent());
                  }}
                  initialValue={field.state.value}
                  init={editor_plugins}
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
                  disabled={!canSubmit || isSubmitting}
                  size={"lg"}
                >
                  Save
                </Button>
              )}
            </form.Subscribe>
          </Flex>
        </form>
      </Modal>
    </>
  );
}

export function UpdateExaminationForm({
  id,
  ...values
}: DB["patient_examination"]["Update"]) {
  const { data, isPending } = useConsultationTemplatesQuery();
  const [opened, { open, close }] = useDisclosure(false);

  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();

  const form = useForm({
    defaultValues: {
      ...values,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await updateExaminationAction({
        id: id,
        note: value.note,
        patients_id: values.patients_id,
        taken_by: `${profile_data?.id}`,
        branch_id: `${profile_data?.branch_id}`,
      });
      form.reset();
      close();
      queryClient.invalidateQueries({ queryKey: ["examinations"] });
    },
  });

  return (
    <>
      <Button
        variant="subtle"
        size="compact-xs"
        onClick={open}
        loading={isProfilePending}
      >
        <Edit size={16} />
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title={"Update Examination"}
        size={"60rem"}
      >
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col gap-1 w-96">
            {isPending ? (
              <Spinner />
            ) : (
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
            )}
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
                <Editor
                  tinymceScriptSrc="/tinymce/tinymce.min.js"
                  licenseKey="gpl"
                  onBlur={(e) => {
                    field.handleChange(e.target.getContent());
                  }}
                  initialValue={field.state.value}
                  init={editor_plugins}
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
                  disabled={!canSubmit || isSubmitting}
                  size={"lg"}
                >
                  Save
                </Button>
              )}
            </form.Subscribe>
          </Flex>
        </form>
      </Modal>
    </>
  );
}
