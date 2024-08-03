import {
  Button,
  Dialog,
  Flex,
  Spinner,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import {
  createHMOCompaniesAction,
  updateHMOCompaniesAction,
} from "../../../actions/config/insurance";
import { FieldInfo } from "../../../components/FieldInfo";

export function CreateHMOCompaniesForm() {
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await createHMOCompaniesAction(value);
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["hmoCompanies"] });
    },
  });

  return (
    <div>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger>
          <Button variant="soft">New</Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>New HMO Company</Dialog.Title>
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
              name="email"
              validators={{
                onChange: z.string().email(),
              }}
              children={(field) => (
                <label htmlFor={field.name} className="flex flex-col">
                  <Text size={"3"}>Email*</Text>
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
              name="phone"
              validators={{
                onChange: z
                  .string()
                  .min(11, {
                    message: "field can not be less than 11 characters",
                  })
                  .max(11, { message: "field can not exceed 11 characters" }),
              }}
              children={(field) => (
                <label htmlFor={field.name} className="flex flex-col">
                  <Text size={"3"}>Phone*</Text>
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
              name="address"
              validators={{
                onChange: z
                  .string()
                  .min(5, { message: "field must be atleast 5 characters" }),
              }}
              children={(field) => (
                <label htmlFor={field.name} className="flex flex-col">
                  <Text size={"3"}>Address*</Text>
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

export function UpdateHMOCompaniesForm({
  id,
  ...values
}: DB["hmo_companies"]["Update"]) {
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      id: id,
      ...values,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await updateHMOCompaniesAction(value);
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["hmoCompanies"] });
    },
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
          <Dialog.Title>Update clinic</Dialog.Title>
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
                <label htmlFor={field.name}>
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
              name="email"
              validators={{
                onChange: z.string().email(),
              }}
              children={(field) => (
                <label htmlFor={field.name}>
                  <Text size={"3"}>Email*</Text>
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
              name="phone"
              validators={{
                onChange: z
                  .string()
                  .min(11, {
                    message: "field can not be less than 11 characters",
                  })
                  .max(11, { message: "field can not exceed 11 characters" }),
              }}
              children={(field) => (
                <label htmlFor={field.name}>
                  <Text size={"3"}>Phone*</Text>
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
              name="address"
              validators={{
                onChange: z
                  .string()
                  .min(5, { message: "field must be atleast 5 characters" }),
              }}
              children={(field) => (
                <label htmlFor={field.name}>
                  <Text size={"3"}>Address*</Text>
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
