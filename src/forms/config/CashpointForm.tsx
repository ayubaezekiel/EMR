import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import {
  createCashpointAction,
  updateCashpointAction,
} from "../../actions/config/cashpoint";
import { useState } from "react";
import {
  AlertDialog,
  Button,
  Dialog,
  Flex,
  Select,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Edit, Trash } from "lucide-react";
import { FieldInfo } from "../../components/FieldInfo";
import { z } from "zod";
import supabase from "../../supabase/client";
import { toast } from "sonner";
import { useLoaderData, useNavigate } from "@tanstack/react-router";

export function CreateCashpointForm() {
  const [open, onOpenChange] = useState(false);
  const navigate = useNavigate();

  const { data } = useLoaderData({ from: "/_layout/dashboard/config/" });

  const form = useForm({
    defaultValues: {
      name: "",
      branch_id: "",
      clinics_id: "",
      service_type_id: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await createCashpointAction(value);
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
          <Dialog.Title>New cashpoint</Dialog.Title>
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
                onChange: z
                  .string()
                  .min(3, { message: "field must be atleast 3 characters" }),
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>Branch*</Text>
                  <Select.Root
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select branch..." />
                    <Select.Content position="popper">
                      {data.branch?.map((b) => (
                        <Select.Item key={b.id} value={b.id}>
                          {b.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </div>
              )}
            />
            <form.Field
              name="clinics_id"
              validators={{
                onChange: z
                  .string()
                  .min(3, { message: "field must be atleast 3 characters" }),
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>Clinic*</Text>
                  <Select.Root
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select clinic..." />
                    <Select.Content position="popper">
                      {data.clinics?.map((c) => (
                        <Select.Item key={c.id} value={c.id}>
                          {c.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </div>
              )}
            />
            <form.Field
              name="service_type_id"
              validators={{
                onChange: z
                  .string()
                  .min(3, { message: "field must be atleast 3 characters" }),
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>Service Type*</Text>
                  <Select.Root
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select service type..." />
                    <Select.Content position="popper">
                      {data.service_type?.map((s) => (
                        <Select.Item key={s.id} value={s.id}>
                          {s.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </div>
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

export function UpdateCashpointForm({
  id,
  ...values
}: CashpointType["Update"]) {
  const [open, onOpenChange] = useState(false);
  const navigate = useNavigate();

  const { data } = useLoaderData({ from: "/_layout/dashboard/config/" });

  const form = useForm({
    defaultValues: {
      id: id,
      ...values,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await updateCashpointAction(value);
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
          <Dialog.Title>Update Cashpoint</Dialog.Title>
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
                onChange: z
                  .string()
                  .min(3, { message: "field must be atleast 3 characters" }),
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>Branch*</Text>
                  <Select.Root
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select branch..." />
                    <Select.Content position="popper">
                      {data.branch?.map((b) => (
                        <Select.Item key={b.id} value={b.id}>
                          {b.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </div>
              )}
            />
            <form.Field
              name="clinics_id"
              validators={{
                onChange: z
                  .string()
                  .min(3, { message: "field must be atleast 3 characters" }),
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>Clinic*</Text>
                  <Select.Root
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select clinic..." />
                    <Select.Content position="popper">
                      {data.clinics?.map((c) => (
                        <Select.Item key={c.id} value={c.id}>
                          {c.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </div>
              )}
            />
            <form.Field
              name="service_type_id"
              validators={{
                onChange: z
                  .string()
                  .min(3, { message: "field must be atleast 3 characters" }),
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>Service Type*</Text>
                  <Select.Root
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select service type..." />
                    <Select.Content position="popper">
                      {data.service_type?.map((s) => (
                        <Select.Item key={s.id} value={s.id}>
                          {s.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </div>
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

export function DeleteCashpointForm({ id }: { id: string }) {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      id: id,
    },
    onSubmit: async ({ value }) => {
      const { error } = await supabase
        .from("cash_points")
        .delete()
        .eq("id", value.id);
      if (error) {
        toast.error(error.message);
      } else {
        navigate({ to: "/dashboard/config" });
        toast.success("cashpoint deleted successfull");
      }
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
        <AlertDialog.Title>Delete Cashpoint</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This cashpoint will be parmanently deleted from the
          database.
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
