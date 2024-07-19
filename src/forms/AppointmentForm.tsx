import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useState } from "react";
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
import { Edit, Trash } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import {
  createAppointmentAction,
  updateAppointmentAction,
} from "../actions/appointment";
import { FieldInfo } from "../components/FieldInfo";
import supabase from "../supabase/client";

export function CreateAppointmentForm() {
  const { patients, appointment_type, clinics, specialties } = useLoaderData({
    from: "/_layout/dashboard/appointments",
  });

  const [open, onOpenChange] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      appointments_type_id: "",
      clinics_id: "",
      ending: "",
      patients_id: "",
      specialties_id: "",
      starting: "",
      follow_up: false,
      is_all_day: false,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        toast.error(error.message);
      } else {
        await createAppointmentAction({
          ...value,
          created_by: `${data.session?.user.id}`,
        });
        form.reset();
        onOpenChange(false);
        navigate({ to: "/dashboard/appointments" });
      }
    },
  });

  return (
    <div>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger>
          <Button>New Patient Appointment</Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>Schedule Patient Appointment</Dialog.Title>
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
              name="patients_id"
              validators={{
                onChange: z.string(),
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>Patient*</Text>
                  <Select.Root
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select patient..." />
                    <Select.Content position="popper">
                      {patients?.map((p) => (
                        <Select.Item key={p.id} value={p.id}>
                          {p.first_name} {p.middle_name} {p.last_name} - [
                          {p.id.slice(0, 10).toUpperCase()}]
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </div>
              )}
            />
            <form.Field
              name="appointments_type_id"
              validators={{
                onChange: z.string(),
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>Appointment Type*</Text>
                  <Select.Root
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select appointment type..." />
                    <Select.Content position="popper">
                      {appointment_type?.map((a) => (
                        <Select.Item key={a.id} value={a.id}>
                          {a.name}
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
                onChange: z.string(),
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
                      {clinics?.map((c) => (
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
              name="specialties_id"
              validators={{
                onChange: z.string(),
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>Specialty*</Text>
                  <Select.Root
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select specialty..." />
                    <Select.Content position="popper">
                      {specialties?.map((s) => (
                        <Select.Item key={s.id} value={s.id}>
                          {s.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </div>
              )}
            />
            <form.Field
              name="starting"
              validators={{
                onChange: z.string(),
              }}
              children={(field) => (
                <label htmlFor={field.name}>
                  <Text size={"3"}>Starting*</Text>
                  <TextField.Root
                    name={field.name}
                    id={field.name}
                    type="datetime-local"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <FieldInfo field={field} />
                </label>
              )}
            />

            <form.Field
              name="ending"
              validators={{
                onChange: z.string(),
              }}
              children={(field) => (
                <label htmlFor={field.name}>
                  <Text size={"3"}>Ending*</Text>
                  <TextField.Root
                    name={field.name}
                    id={field.name}
                    type="datetime-local"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <FieldInfo field={field} />
                </label>
              )}
            />
            <div className="flex gap-4 items-center mt-4">
              <form.Field
                name="follow_up"
                children={(field) => (
                  <label
                    htmlFor={field.name}
                    className="flex gap-2 items-center"
                  >
                    <Text size={"3"}>Follow Up?</Text>
                    <Checkbox
                      size={"3"}
                      name={field.name}
                      id={field.name}
                      checked={Boolean(field.state.value)}
                      onCheckedChange={(e) => {
                        field.handleChange(Boolean(e)), console.log(e);
                      }}
                      onBlur={field.handleBlur}
                    />
                    <FieldInfo field={field} />
                  </label>
                )}
              />
              <form.Field
                name="is_all_day"
                children={(field) => (
                  <label
                    htmlFor={field.name}
                    className="flex gap-2 items-center"
                  >
                    <Text size={"3"}>Is all day?</Text>
                    <Checkbox
                      defaultChecked={field.state.value}
                      size={"3"}
                      name={field.name}
                      id={field.name}
                      checked={Boolean(field.state.value)}
                      onCheckedChange={(e) => {
                        field.handleChange(Boolean(e)), console.log(e);
                      }}
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

export function UpdateAppointmentForm({
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
      await updateAppointmentAction(value);
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

export function DeleteAppointmentForm({ id }: { id: string }) {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      id: id,
    },
    onSubmit: async ({ value }) => {
      const { error } = await supabase
        .from("insurance_plan")
        .delete()
        .eq("id", value.id);
      if (error) {
        toast.error(error.message);
      } else {
        navigate({ to: "/dashboard/config" });
        toast.success("insurance plan deleted successfull");
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
        <AlertDialog.Title>Revoke access</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This insurance plan will be parmanently deleted from the
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
