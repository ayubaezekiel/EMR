import {
  Button,
  Dialog,
  Flex,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import {
  createConsultationTemplatesAction,
  updateConsultationTemplatesAction,
} from "../../actions/config/templates";
import { FieldInfo } from "../../components/FieldInfo";
import { RichEditor } from "../../components/textEditor/RichTextEditor";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

export function CreateConsultationTemplateForm() {
  const [open, onOpenChange] = useState(false);
  const [tempalte, setTemplate] = useState("");
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      name: "",
      content: tempalte,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await createConsultationTemplatesAction(value);
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["consultationTemplates"] });
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

    content: tempalte,
  });

  return (
    <div>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger>
          <Button variant="soft">New</Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>New Consultation Template</Dialog.Title>
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
              name="name"
              validators={{
                onChange: z
                  .string()
                  .min(3, { message: "field must be atleast 3 characters" }),
              }}
              children={(field) => (
                <label htmlFor={field.name} className="flex flex-col">
                  <Text size={"3"}>Name*</Text>
                  <TextField.Root
                    name={field.name}
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <FieldInfo field={field} />
                </label>
              )}
            />

            <form.Field
              name="content"
              validators={{
                onChange: z
                  .string()
                  .min(10, { message: "field must contain some content" }),
              }}
              children={(field) => (
                <label htmlFor={field.name} className="flex flex-col">
                  <Text size={"3"}>Content*</Text>
                  <RichEditor editor={editor} />
                  <FieldInfo field={field} />
                </label>
              )}
            />
            <Flex gap="3" mt="4" justify="end">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit} size={"4"}>
                    {isSubmitting && <Spinner />} Save
                  </Button>
                )}
              />
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

export function UpdateConsultationTemplateForm({
  id,
  ...values
}: DB["consultation_templates"]["Update"]) {
  const [open, onOpenChange] = useState(false);
  const [tempalte, setTemplate] = useState(values.content);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      id: id,
      name: values.name,
      content: tempalte,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await updateConsultationTemplatesAction(value);
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["consultationTemplates"] });
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

    content: tempalte,
  });

  return (
    <div>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger>
          <Button variant="ghost">
            <Edit size={16} />
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>Update Consultation Template</Dialog.Title>
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
              name="name"
              validators={{
                onChange: z
                  .string()
                  .min(3, { message: "field must be atleast 3 characters" }),
              }}
              children={(field) => (
                <label htmlFor={field.name} className="flex flex-col">
                  <Text size={"3"}>Name*</Text>
                  <TextField.Root
                    name={field.name}
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <FieldInfo field={field} />
                </label>
              )}
            />
            <form.Field
              name="content"
              validators={{
                onChange: z
                  .string()
                  .min(10, { message: "field must contain some content" }),
              }}
              children={(field) => (
                <label htmlFor={field.name} className="flex flex-col">
                  <Text size={"3"}>Content*</Text>
                  <RichEditor editor={editor} />
                  <FieldInfo field={field} />
                </label>
              )}
            />

            <Flex gap="3" mt="4" justify="end">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit} size={"4"}>
                    {isSubmitting && <Spinner />} Update
                  </Button>
                )}
              />
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
