import {
  AlertDialog,
  Button,
  Checkbox,
  Dialog,
  Flex,
  Select,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import {
  createInsuranceBillerAction,
  deleteInsuranceBillerAction,
  updateInsuranceBillerAction,
} from "../../../actions/config/insurance";
import { FieldInfo } from "../../../components/FieldInfo";

export function CreateInsuranceBillerForm() {
  const [open, onOpenChange] = useState(false);
  const navigate = useNavigate();

  const { data } = useLoaderData({ from: "/_layout/dashboard/config" });

  const form = useForm({
    defaultValues: {
      name: "",
      enrolment_amount: "",
      hmo_companies_id: "",
      hmo_group_id: "",
      max_number_of_beneficiaries: "",
      sign_up_amount: "",
      branch_id: "",
      email: "",
      is_insurance: false,
      logo_url: "",
      phone: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await createInsuranceBillerAction(value);
      form.reset();
      onOpenChange(false);
      navigate({ to: "/dashboard/config" });
    },
  });

  return (
    <div>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger>
          <Button variant="soft">New</Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>New insurance plan</Dialog.Title>
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
              name="branch_id"
              validators={{
                onChange: z.string(),
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>Branch*</Text>
                  <Select.Root
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select a branch..." />
                    <Select.Content position="popper">
                      {data.branch?.map((b) => (
                        <Select.Item key={b.id} value={b.id}>
                          {b.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  <FieldInfo field={field} />
                </div>
              )}
            />
            <form.Field
              name="hmo_companies_id"
              validators={{
                onChange: z.string(),
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>HMO Company*</Text>
                  <Select.Root
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select a company..." />
                    <Select.Content>
                      <Select.Item value="demo">demo</Select.Item>
                    </Select.Content>
                  </Select.Root>
                  <FieldInfo field={field} />
                </div>
              )}
            />
            <form.Field
              name="hmo_group_id"
              validators={{
                onChange: z.string(),
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>Group*</Text>
                  <Select.Root
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select a group..." />
                    <Select.Content>
                      <Select.Item value="demo">demo</Select.Item>
                    </Select.Content>
                  </Select.Root>
                  <FieldInfo field={field} />
                </div>
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
                    message: "field cant not be less than 11 characters",
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
              name="enrolment_amount"
              validators={{
                onChange: z.string().email(),
              }}
              children={(field) => (
                <label htmlFor={field.name}>
                  <Text size={"3"}>Erollment Amount*</Text>
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
              name="sign_up_amount"
              validators={{
                onChange: z.string().email(),
              }}
              children={(field) => (
                <label htmlFor={field.name}>
                  <Text size={"3"}>Signup Ammount*</Text>
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
              name="max_number_of_beneficiaries"
              validators={{
                onChange: z.string().email(),
              }}
              children={(field) => (
                <label htmlFor={field.name}>
                  <Text size={"3"}>Max Number of Beneficiaries*</Text>
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
            <div className="flex justify-between mt-4">
              <form.Field
                name="is_insurance"
                validators={{
                  onChange: z.string().email(),
                }}
                children={(field) => (
                  <label
                    htmlFor={field.name}
                    className="flex gap-2 items-center"
                  >
                    <Text size={"3"}>Is insured?</Text>
                    <Checkbox
                      name={field.name}
                      id={field.name}
                      checked={field.state.value}
                      onCheckedChange={(e) => field.handleChange(Boolean(e))}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />
              <form.Field
                name="logo_url"
                validators={{
                  onChange: z.string().email(),
                }}
                children={(field) => (
                  <label htmlFor={field.name} className="w-[70%]">
                    <Text size={"3"}>Logo URL</Text>
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

export function UpdateInsuranceBillerForm({
  id,
  ...values
}: InsuranceType["Update"]) {
  const [open, onOpenChange] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      id: id,
      ...values,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await updateInsuranceBillerAction(value);
      form.reset();
      onOpenChange(false);

      navigate({ to: "/dashboard/config" });
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
          <Dialog.Title>Update insurance plan</Dialog.Title>
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

export function DeleteInsuranceBillerForm({ id }: { id: string }) {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      id: id,
    },
    onSubmit: async () => {
      await deleteInsuranceBillerAction({ id: id });
      navigate({ to: "/dashboard/config" });
    },
  });

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" variant="ghost">
          <Trash size={16} />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete Insurance Biller</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This insurance biller will be parmanently deleted from
          the database.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <form
              onSubmit={(e) => {
                e.stopPropagation(), e.preventDefault(), form.handleSubmit();
                form.reset();
              }}
            >
              <Button type="submit" variant="solid" color="red">
                Confirm
              </Button>
            </form>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
