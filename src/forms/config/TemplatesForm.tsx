import RichTextEditor from "@/components/textEditor/TipTapRichTextEditor";
import { useProfile } from "@/lib/hooks";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit } from "lucide-react";
import { z } from "zod";
import {
  createConsultationTemplatesAction,
  updateConsultationTemplatesAction,
} from "../../actions/config/templates";
import { FieldInfo } from "../../components/FieldInfo";

export function CreateTemplateForm() {
  const [opened, { close, open }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();

  const form = useForm({
    defaultValues: {
      name: "",
      content: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await createConsultationTemplatesAction({
        ...value,
        branch_id: `${profile_data?.branch_id}`,
      });
      form.reset();
      close();
      queryClient.invalidateQueries({ queryKey: ["consultationTemplates"] });
    },
  });

  return (
    <>
      <Button onClick={open} variant="soft" loading={isProfilePending}>
        New
      </Button>
      <Modal
        size={"60rem"}
        title="New Template"
        opened={opened}
        onClose={close}
      >
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
                <RichTextEditor
                  content={field.state.value}
                  onChange={field.handleChange}
                />
                <FieldInfo field={field} />
              </label>
            )}
          />
          <Flex gap="3" mt="4" justify="end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  loading={isSubmitting}
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  size={"4"}
                >
                  Save
                </Button>
              )}
            />
          </Flex>
        </form>
      </Modal>
    </>
  );
}

export function UpdateTemplateForm({
  id,
  ...values
}: DB["templates"]["Update"]) {
  const [opened, { close, open }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();

  const form = useForm({
    defaultValues: {
      id: id,
      name: values.name,
      content: values.content,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await updateConsultationTemplatesAction({
        ...value,
        branch_id: `${profile_data?.branch_id}`,
      });
      form.reset();
      close();
      queryClient.invalidateQueries({ queryKey: ["consultationTemplates"] });
    },
  });

  return (
    <>
      <Button onClick={open} variant="soft" loading={isProfilePending}>
        <Edit size={16} />
      </Button>
      <Modal
        size={"60rem"}
        title="Update Template"
        opened={opened}
        onClose={close}
      >
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
                <RichTextEditor
                  content={field.state.value!}
                  onChange={field.handleChange}
                />
                <FieldInfo field={field} />
              </label>
            )}
          />
          <Flex gap="3" mt="4" justify="end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  loading={isSubmitting}
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  size={"4"}
                >
                  Save
                </Button>
              )}
            />
          </Flex>
        </form>
      </Modal>
    </>
  );
}
