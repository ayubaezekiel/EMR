import {
  Button,
  Callout,
  Dialog,
  Flex,
  IconButton,
  Select,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { AlertCircle, Edit, PlusCircle, Trash } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { updateSpecialtyAction } from "../../actions/config/specialty";
import {
  createVitalsAction,
  updateVitalsAction,
} from "../../actions/config/vitals";
import {
  patientsQueryOptions,
  vitalsQueryOptions,
} from "../../actions/queries";
import { FieldInfo } from "../../components/FieldInfo";
import { useForm as useMantineForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { Label } from "../../components/ui/label";
import { useForm } from "@tanstack/react-form";
import supabase from "../../supabase/client";
import { toast } from "sonner";

export function CreateVitalsForm() {
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      name: "",
      unit: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await createVitalsAction(value);
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["vitals"] });
    },
  });

  return (
    <div>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger>
          <Button variant="soft">New</Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>New Vitals</Dialog.Title>
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
              name="unit"
              validators={{
                onChange: z.string().optional(),
              }}
              children={(field) => (
                <label htmlFor={field.name} className="flex flex-col">
                  <Text size={"3"}>Unit</Text>
                  <TextField.Root
                    placeholder="e.g kg, mol etc..."
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

export function UpdateVitalsForm({ id, ...values }: DB["vitals"]["Update"]) {
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      id: id,
      ...values,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await updateVitalsAction(value);
      form.reset();
      onOpenChange(false);

      queryClient.invalidateQueries({ queryKey: ["vitals"] });
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
          <Dialog.Title>Update Vitals</Dialog.Title>
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
              name="unit"
              validators={{
                onChange: z.string().optional(),
              }}
              children={(field) => (
                <label htmlFor={field.name} className="flex flex-col">
                  <Text size={"3"}>Unit</Text>
                  <TextField.Root
                    placeholder="e.g kg, mol etc..."
                    name={field.name}
                    id={field.name}
                    value={field.state.value!}
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

export function CreatePatientVitalsForm() {
  const { data: patients } = useSuspenseQuery(patientsQueryOptions);
  const {
    data: { vitals_data },
  } = useSuspenseQuery(vitalsQueryOptions);
  const [open, onOpenChange] = useState(false);

  const form = useMantineForm({
    mode: "uncontrolled",
    initialValues: {
      patient: "",
      vitals: [{ name: "", value: "", unit: "", key: randomId() }],
    },
  });

  const fields = form.getValues().vitals.map((item, index) => (
    <Flex key={item.key} gap={"2"} mt={"2"}>
      <div className="flex flex-col gap-1 w-full">
        <Label>Name*</Label>
        <Select.Root
          required
          size={"3"}
          key={form.key(`vitals.${index}.name`)}
          onValueChange={(e) =>
            form.getInputProps(`vitals.${index}.name`).onChange(e)
          }
        >
          <Select.Trigger placeholder="select vitals..." />
          <Select.Content position="popper">
            {vitals_data?.map((v) => (
              <Select.Item value={v.id}>{v.name}</Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>

      <div className="flex flex-col gap-1">
        <Label>Value*</Label>
        <TextField.Root
          required
          size={"3"}
          style={{ flex: 1 }}
          key={form.key(`vitals.${index}.name`)}
          {...form.getInputProps(`vitals.${index}.value`)}
        />
      </div>
      <div className="flex flex-col gap-1 w-40">
        <Label>Unit</Label>
        <Select.Root
          size={"3"}
          key={form.key(`vitals.${index}.unit`)}
          onValueChange={(e) =>
            form.getInputProps(`vitals.${index}.unit`).onChange(e)
          }
        >
          <Select.Trigger placeholder="kg" />
          <Select.Content position="popper">
            {vitals_data?.map((v) => (
              <Select.Item value={v.unit!.length > 0 ? v.name : "nill"}>
                {v.unit!.length < 1 ? "--" : v.unit}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>
      <div className="flex flex-col mt-5">
        <IconButton
          type="button"
          color="red"
          onClick={() => form.removeListItem("vitals", index)}
        >
          <Trash size="1rem" />
        </IconButton>
      </div>
    </Flex>
  ));

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Button>
          <PlusCircle /> Record Patient Vitals
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <form
          onSubmit={form.onSubmit(async (values) => {
            const p_vitals = values.vitals.map((n) => ({
              name: n.name,
              unit: n.unit,
              value: n.value,
              patient: values.patient,
            }));
            const { error } = await supabase
              .from("patient_vitals")
              .insert(p_vitals)
              .select();

            if (error) {
              toast.error(error.message);
            }

            toast.success("patient vitals recorded successfully");
          })}
        >
          {fields.length > 0 ? (
            <Flex mb="xs">
              <Text size={"3"} style={{ flex: 1 }}>
                Patient*
              </Text>
            </Flex>
          ) : (
            <Callout.Root color="red">
              <Callout.Icon>
                <AlertCircle />
                <Callout.Text ml={"2"}>Empty</Callout.Text>
              </Callout.Icon>
            </Callout.Root>
          )}
          <div className="flex flex-col w-full">
            <Select.Root
              required
              size={"3"}
              onValueChange={(e) => form.setFieldValue("patient", e)}
            >
              <Select.Trigger placeholder="select patient..." />
              <Select.Content position="popper">
                {patients.patient_data?.map((p) => (
                  <Select.Item value={p.id}>
                    {p.first_name} {p.middle_name} {p.last_name} [
                    {p.id.slice(0, 8).toUpperCase()}]
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>
          {fields}

          <Flex justify="end" mt="4">
            <Button
              type="button"
              variant="soft"
              onClick={() =>
                form.insertListItem("vitals", {
                  name: "",
                  value: "",
                  unit: "",
                  key: randomId(),
                })
              }
            >
              Add more
            </Button>
          </Flex>
          <Button disabled={!form.isValid()} size={"4"} type="submit">
            Record
          </Button>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export function UpdatePatientVitalsForm({
  id,
  ...values
}: DB["patient_vitals"]["Update"]) {
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      id: id,
      ...values,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await updateSpecialtyAction(value);
      form.reset();
      onOpenChange(false);

      queryClient.invalidateQueries({ queryKey: ["patientVitals"] });
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
          <Dialog.Title>Update Patient Vitals</Dialog.Title>
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
              name="value"
              validators={{
                onChange: z
                  .string()
                  .min(1, { message: "field can not be empty" }),
              }}
              children={(field) => (
                <label htmlFor={field.name} className="flex flex-col">
                  <Text size={"3"}>Value*</Text>
                  <TextField.Root
                    name={field.name}
                    id={field.name}
                    value={field.state.value!}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <FieldInfo field={field} />
                </label>
              )}
            />

            <form.Field
              name="unit"
              validators={{
                onChange: z.string().optional(),
              }}
              children={(field) => (
                <label htmlFor={field.name} className="flex flex-col">
                  <Text size={"3"}>Unit</Text>
                  <TextField.Root
                    name={field.name}
                    id={field.name}
                    value={field.state.value!}
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
