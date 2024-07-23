import {
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
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import {
  createAppointmentAction,
  updateAppointmentAction,
} from "../actions/appointment";
import { FieldInfo } from "../components/FieldInfo";
import supabase from "../supabase/client";

export function CreateAppointmentForm() {
  const {
    appointment_type_data,
    clinics_data,
    patient_data,
    specialties_data,
  } = useLoaderData({
    from: "/_layout/dashboard/appointments/",
  });

  const [open, onOpenChange] = useState(false);
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const form = useForm({
    defaultValues: {
      appointments_type_id: "",
      clinics_id: "",
      duration: `[${from},${to})`,
      patients_id: "",
      specialties_id: "",
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
            <div className="flex md:gap-4 md:flex-row flex-col gap-2">
              <label className="flex flex-col">
                <Text size={"3"}>Starting*</Text>
                <TextField.Root
                  required
                  size={"3"}
                  type="datetime-local"
                  onChange={(e) => setFrom(e.target.value)}
                />
              </label>
              <label className="flex flex-col">
                <Text size={"3"}>Ending*</Text>
                <TextField.Root
                  required
                  size={"3"}
                  type="datetime-local"
                  onChange={(e) => setTo(e.target.value)}
                />
              </label>
            </div>
            <form.Field
              name="patients_id"
              validators={{
                onChange: z.string(),
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>Patient*</Text>
                  <Select.Root
                    size={"3"}
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select patient..." />
                    <Select.Content position="popper">
                      {patient_data?.map((p) => (
                        <Select.Item key={p.id} value={p.id}>
                          {p.first_name} {p.middle_name} {p.last_name} - [
                          {p.id.slice(0, 8).toUpperCase()}]
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
                    size={"3"}
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select appointment type..." />
                    <Select.Content position="popper">
                      {appointment_type_data?.map((a) => (
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
                    size={"3"}
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select clinic..." />
                    <Select.Content position="popper">
                      {clinics_data?.map((c) => (
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
                    size={"3"}
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select specialty..." />
                    <Select.Content position="popper">
                      {specialties_data?.map((s) => (
                        <Select.Item key={s.id} value={s.id}>
                          {s.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </div>
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
}: DB["appointments"]["Update"]) {
  const {
    patient_data,
    clinics_data,
    appointment_type_data,
    specialties_data,
  } = useLoaderData({
    from: "/_layout/dashboard/appointments/",
  });

  const [open, onOpenChange] = useState(false);
  const navigate = useNavigate();
  const [from, setFrom] = useState(`${values.duration}`.slice(2, 24));
  const [to, setTo] = useState(`${values.duration}`.slice(27, 49));

  const form = useForm({
    defaultValues: {
      id: id,
      duration: `[${from},${to})`,
      appointments_type_id: values.appointments_type_id,
      clinics_id: values.clinics_id,
      created_by: values.created_by,
      follow_up: values.follow_up,
      is_all_day: values.follow_up,
      patients_id: values.patients_id,
      specialties_id: values.specialties_id,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        toast.error(error.message);
      } else {
        await updateAppointmentAction({
          ...value,
          id: id,
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
          <Button variant="ghost">
            <Edit size={16} />
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>Update Patient Appointment</Dialog.Title>
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
            <div className="flex md:gap-4 md:flex-row flex-col gap-2">
              <label className="flex flex-col">
                <Text size={"3"}>Starting*</Text>
                <TextField.Root
                  required
                  size={"3"}
                  type="datetime-local"
                  onChange={(e) => setFrom(e.target.value)}
                />
              </label>
              <label className="flex flex-col">
                <Text size={"3"}>Ending*</Text>
                <TextField.Root
                  required
                  size={"3"}
                  type="datetime-local"
                  onChange={(e) => setTo(e.target.value)}
                />
              </label>
            </div>
            <form.Field
              name="patients_id"
              validators={{
                onChange: z.string(),
              }}
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>Patient*</Text>
                  <Select.Root
                    size={"3"}
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select patient..." />
                    <Select.Content position="popper">
                      {patient_data?.map((p) => (
                        <Select.Item key={p.id} value={p.id}>
                          {p.first_name} {p.middle_name} {p.last_name} - [
                          {p.id.slice(0, 8).toUpperCase()}]
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
                    size={"3"}
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select appointment type..." />
                    <Select.Content position="popper">
                      {appointment_type_data?.map((a) => (
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
                    size={"3"}
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select clinic..." />
                    <Select.Content position="popper">
                      {clinics_data?.map((c) => (
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
                    size={"3"}
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <Select.Trigger placeholder="select specialty..." />
                    <Select.Content position="popper">
                      {specialties_data?.map((s) => (
                        <Select.Item key={s.id} value={s.id}>
                          {s.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </div>
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
                      defaultChecked={field.state.value!}
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
