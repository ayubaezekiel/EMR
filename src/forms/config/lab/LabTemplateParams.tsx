import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import {
  createLabTestParamsAction,
  updateLabTestParamsAction,
} from "../../../actions/config/lab-test";
import { FieldInfo } from "../../../components/FieldInfo";
import { useProfile } from "@/lib/hooks";

export function CreateLabParamsForm() {
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();

  const form = useForm({
    defaultValues: {
      name: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await createLabTestParamsAction({
        ...value,
        branch_id: `${profile_data?.branch_id}`,
      });
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["labTestParams"] });
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger disabled={isProfilePending}>
        <Button variant="soft" loading={isProfilePending}>
          New
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>New Lab Parameter</Dialog.Title>
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
          <div className="grid md:grid-cols-2 gap-2">
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
          </div>

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
      </Dialog.Content>
    </Dialog.Root>
  );
}

export function UpdateLabParamsForm({
  ...values
}: DB["lab_test_parameter"]["Update"]) {
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();

  const form = useForm({
    defaultValues: {
      ...values,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      updateLabTestParamsAction({
        ...value,
        branch_id: `${profile_data?.branch_id}`,
      });
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["labTestParams"] });
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger disabled={isProfilePending}>
        <Button variant="ghost" loading={isProfilePending}>
          <Edit size={16} />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Update Lab Parameter</Dialog.Title>
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
          <div className="grid md:grid-cols-2 gap-2">
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
          </div>

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
      </Dialog.Content>
    </Dialog.Root>
  );
}
