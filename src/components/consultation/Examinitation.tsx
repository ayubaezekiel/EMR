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
import {
  createExaminationAction,
  updateExaminationAction,
} from "../../actions/consultation/actions";
import {
  consultationTemplatesQueryOptions,
  examinationQueryOptions,
} from "../../actions/queries";
import { checkAuth, getProfile } from "../../lib/utils";
import { FieldInfo } from "../FieldInfo";
import PendingComponent from "../PendingComponent";
import { useStepper } from "../stepper";
import { DataTable } from "../table/DataTable";
import { patient_examination_column } from "../table/columns/consultation/patient_examination";
import { RichEditor } from "../textEditor/RichTextEditor";
import { StepperFormActions } from "./StepperFormAction";

export function Examination() {
  const { data, isPending } = useQuery(examinationQueryOptions);
  if (isPending) return <PendingComponent />;

  return (
    <div>
      <ExaminationForm />
      <div>
        <DataTable
          columns={patient_examination_column}
          data={data?.examination_data ?? []}
          filterLabel="search by name..."
          filterer="name"
        />
      </div>
    </div>
  );
}
function ExaminationForm() {
  const { nextStep } = useStepper();
  const { isLastStep } = useStepper();
  const [template, setTemplate] = useState("");
  const { data, isPending } = useQuery(consultationTemplatesQueryOptions);

  const { appointmentId } = useParams({
    from: "/_layout/dashboard/appointments/$appointmentId",
  });

  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      patients_id: "",
      taken_by: "",
      note: template,
    },

    onSubmit: async () => {
      const prof = await getProfile();
      await createExaminationAction({
        note: `${template}`,
        patients_id: appointmentId,
        taken_by: `${prof?.id}`,
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["examination"] });
      nextStep();
    },
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
    content: template,
  });

  useEffect(() => {
    editor?.commands.setContent(template);
  }, [editor, template]);
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
          defaultValue={template}
          name="note"
          children={(field) => (
            <div className="flex flex-col">
              <Text size={"3"}>
                Note <Text size={"1"}>(should be atleast 10 characters)</Text>*
              </Text>
              <RichEditor editor={editor} />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit || template.length < 10}
              size={"4"}
            >
              {isSubmitting && <Spinner />}
              Save
            </Button>
          )}
        />
      </form>
      <StepperFormActions
        submitComp={
          <Button onClick={nextStep} size={"4"}>
            {isLastStep ? "Finish" : "Next"}
          </Button>
        }
      />
    </div>
  );
}

export function UpdateExaminationForm({
  id,
  ...values
}: DB["patient_examination"]["Update"]) {
  const [open, onOpenChange] = useState(false);
  const [template, setTemplate] = useState(values.note);
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

    content: template,
  });

  const form = useForm({
    defaultValues: {
      ...values,
      note: template,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async () => {
      const user = await checkAuth();
      await updateExaminationAction({
        id: id,
        note: `${template}`,
        patients_id: appointmentId,
        taken_by: `${user?.id}`,
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["examination"] });
    },
  });

  useEffect(() => {
    const updateEditor = () => {
      editor?.commands.setContent(template!);
    };
    updateEditor();
  }, [editor, template]);

  if (isPending) return <PendingComponent />;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Button variant="ghost">
          <Edit size={16} />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Update Examination</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Fill out the form information
        </Dialog.Description>
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
              defaultValue={template}
              name="note"
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>
                    Note{" "}
                    <Text size={"1"}>(should be atleast 10 characters)</Text>*
                  </Text>
                  <RichEditor editor={editor} />
                  <FieldInfo field={field} />
                </div>
              )}
            />

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || template!.length < 10}
                  size={"4"}
                >
                  {isSubmitting && <Spinner />}
                  Save
                </Button>
              )}
            />
          </form>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
