import { useDocumentType, useProfile } from "@/lib/hooks";
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
import { Edit } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { FieldInfo } from "../../components/FieldInfo";
import {
  createUserReportAction,
  updateUserReportAction,
} from "@/actions/config/user_report";

export function CreateUserReportForm() {
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();
  const { document_type_data, isDocumentTypePending } = useDocumentType();

  const form = useForm({
    defaultValues: {
      created_by: `${profile_data?.id}`,
      document_type_id: "",
      file_url: "",
      title: "",
      branch_id: `${profile_data?.branch_id}`,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await createUserReportAction(value);
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["userReports"] });
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger disabled={isProfilePending || isDocumentTypePending}>
        <Button size={"4"} loading={isProfilePending || isDocumentTypePending}>
          New Report
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>New User Report</Dialog.Title>
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
            name="title"
            validators={{
              onChange: z
                .string()
                .min(3, { message: "field must be atleast 3 characters" }),
            }}
            children={(field) => (
              <label htmlFor={field.name} className="flex flex-col">
                <Text size={"3"}>Title*</Text>
                <TextField.Root
                  size={"3"}
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
            name="document_type_id"
            validators={{
              onChange: z
                .string()
                .min(3, { message: "field must be atleast 3 characters" }),
            }}
            children={(field) => (
              <label htmlFor={field.name} className="flex flex-col">
                <Text size={"3"}>Document Type*</Text>
                <Select.Root
                  size={"3"}
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(e) => field.handleChange(e)}
                >
                  <Select.Trigger placeholder="select a document type..." />
                  <Select.Content>
                    {document_type_data?.map((d) => (
                      <Select.Item value={d.id}>{d.name}</Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
                <FieldInfo field={field} />
              </label>
            )}
          />

          <form.Field
            name="file_url"
            validators={{
              onChange: z.string().url(),
            }}
            children={(field) => (
              <label htmlFor={field.name} className="flex flex-col">
                <Text size={"3"}>File URL*</Text>
                <TextField.Root
                  size={"3"}
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

          <Flex gap="3" mt="4" justify="end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={!canSubmit || isSubmitting}
                  size={"4"}
                >
                  Save
                </Button>
              )}
            />
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export function UpdateUserReportForm({
  ...values
}: DB["document_reports"]["Update"]) {
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();
  const { document_type_data, isDocumentTypePending } = useDocumentType();

  const form = useForm({
    defaultValues: {
      id: values.id,
      created_by: `${profile_data?.id}`,
      document_type_id: values.document_type_id,
      file_url: values.file_url,
      title: values.title,
      branch_id: `${profile_data?.branch_id}`,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await updateUserReportAction(value);
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["userReports"] });
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger disabled={isProfilePending || isDocumentTypePending}>
        <Button
          variant="ghost"
          loading={isProfilePending || isDocumentTypePending}
        >
          <Edit size={16} />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Update User Report</Dialog.Title>
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
            name="title"
            validators={{
              onChange: z
                .string()
                .min(3, { message: "field must be atleast 3 characters" }),
            }}
            children={(field) => (
              <label htmlFor={field.name} className="flex flex-col">
                <Text size={"3"}>Title*</Text>
                <TextField.Root
                  size={"3"}
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
            name="document_type_id"
            validators={{
              onChange: z
                .string()
                .min(3, { message: "field must be atleast 3 characters" }),
            }}
            children={(field) => (
              <label htmlFor={field.name} className="flex flex-col">
                <Text size={"3"}>Document Type*</Text>
                <Select.Root
                  size={"3"}
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(e) => field.handleChange(e)}
                >
                  <Select.Trigger placeholder="select a document type..." />
                  <Select.Content>
                    {document_type_data?.map((d) => (
                      <Select.Item value={d.id}>{d.name}</Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
                <FieldInfo field={field} />
              </label>
            )}
          />

          <form.Field
            name="file_url"
            validators={{
              onChange: z.string().url(),
            }}
            children={(field) => (
              <label htmlFor={field.name} className="flex flex-col">
                <Text size={"3"}>File URL*</Text>
                <TextField.Root
                  size={"3"}
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

          <Flex gap="3" mt="4" justify="end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={!canSubmit || isSubmitting}
                  size={"4"}
                >
                  Save
                </Button>
              )}
            />
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
