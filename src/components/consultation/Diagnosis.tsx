import { Button, Dialog, Select, Spinner, Text } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import Highlight from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import {
  createPatientDiagnosisAction,
  updatePatientDiagnosisAction,
} from "../../actions/consultation/actions";
import {
  consultationTemplatesQueryOptions,
  diagnosisQueryOptions,
} from "../../actions/queries";
import { checkAuth } from "../../lib/utils";
import { FieldInfo } from "../FieldInfo";
import PendingComponent from "../PendingComponent";
import { useStepper } from "../stepper";
import { DataTable } from "../table/DataTable";
import { patient_diagnosis_column } from "../table/columns/consultation/diagnosis";
import { RichEditor } from "../textEditor/RichTextEditor";
import { StepperFormActions } from "./StepperFormAction";

export function Diagnosis() {
  const { data, isPending } = useQuery(diagnosisQueryOptions);
  if (isPending) return <PendingComponent />;

  return (
    <div>
      <DiagnosisForm />
      <div>
        <DataTable
          columns={patient_diagnosis_column}
          data={data?.diagnosis_data ?? []}
          filterLabel="search by name..."
          filterer="name"
        />
      </div>
    </div>
  );
}
function DiagnosisForm() {
  const { nextStep } = useStepper();
  const { isLastStep } = useStepper();
  const [tempalte, setTemplate] = useState("");
  const { data, isPending } = useQuery(consultationTemplatesQueryOptions);

  const { appointmentId } = useParams({
    from: "/_layout/dashboard/appointments/$appointmentId",
  });

  const queryClient = useQueryClient();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    onUpdate: ({ editor }) => {
      setTemplate(editor.getHTML());
    },

    content: tempalte,
  });

  const form = useForm({
    defaultValues: {
      patients_id: "",
      taken_by: "",
      note: tempalte,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async () => {
      const user = await checkAuth();
      await createPatientDiagnosisAction({
        note: `${tempalte}`,
        patients_id: appointmentId,
        taken_by: `${user?.id}`,
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["diagnosis"] });
      nextStep();
    },
  });

  useEffect(() => {
    const updateEditor = () => {
      editor?.commands.setContent(tempalte);
    };
    updateEditor();
  }, [editor, tempalte]);

  if (isPending) return <PendingComponent />;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <div className="flex flex-col gap-1 w-96">
          <Text size={"3"}>Use a template?</Text>
          <Select.Root onValueChange={(e) => setTemplate(e)}>
            <Select.Trigger placeholder="select a template..." />
            <Select.Content position="popper">
              {data?.consultation_templates_data?.map((t) => (
                <Select.Item key={t.id} value={t.content}>
                  {t.name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>
        <form.Field
          name="note"
          validators={{
            onChange: z
              .string()
              .min(10, { message: "field must contain some content" }),
          }}
          children={(field) => (
            <label htmlFor={field.name} className="flex flex-col">
              <Text size={"3"}>Note*</Text>
              <RichEditor editor={editor} />
              <FieldInfo field={field} />
            </label>
          )}
        />

        <StepperFormActions
          submitComp={
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit} size={"4"}>
                  {isSubmitting && <Spinner />}
                  {isLastStep ? "Finish" : "Save and Continue"}
                </Button>
              )}
            />
          }
        />
      </form>
    </div>
  );
}

export function UpdateDiagnosisForm({
  id,
  ...values
}: DB["patient_diagnosis"]["Update"]) {
  const [open, onOpenChange] = useState(false);
  const [tempalte, setTemplate] = useState(values.note);
  const { data, isPending } = useQuery(consultationTemplatesQueryOptions);

  const queryClient = useQueryClient();

  const { appointmentId } = useParams({
    from: "/_layout/dashboard/appointments/$appointmentId",
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    onUpdate: ({ editor }) => {
      setTemplate(editor.getHTML());
    },

    content: tempalte,
  });

  const form = useForm({
    defaultValues: {
      ...values,
      note: tempalte,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async () => {
      const user = await checkAuth();
      await updatePatientDiagnosisAction({
        id: id,
        note: `${tempalte}`,
        patients_id: appointmentId,
        taken_by: `${user?.id}`,
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["diagnosis"] });
    },
  });

  useEffect(() => {
    const updateEditor = () => {
      editor?.commands.setContent(tempalte!);
    };
    updateEditor();
  }, [editor, tempalte]);

  if (isPending) return <PendingComponent />;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Button variant="ghost">
          <Edit size={16} />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Update Diagnosis</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Fill out the form information
        </Dialog.Description>
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1 w-96">
            <Text size={"3"}>Use a template?</Text>
            <Select.Root onValueChange={(e) => setTemplate(e)}>
              <Select.Trigger placeholder="select a template..." />
              <Select.Content position="popper">
                {data?.consultation_templates_data?.map((t) => (
                  <Select.Item key={t.id} value={t.content}>
                    {t.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>
          <form.Field
            name="note"
            validators={{
              onChange: z
                .string()
                .min(10, { message: "field must contain some content" }),
            }}
            children={(field) => (
              <label htmlFor={field.name} className="flex flex-col">
                <Text size={"3"}>Note*</Text>
                <RichEditor editor={editor} />
                <FieldInfo field={field} />
              </label>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit} size={"4"}>
                {isSubmitting && <Spinner />} Update
              </Button>
            )}
          />
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
