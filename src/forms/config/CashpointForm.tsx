import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import {
  createCashpointAction,
  updateCashpointAction,
} from "../../actions/config/cashpoint";
import { branchQueryOptions, clinicsQueryOptions } from "../../actions/queries";
import { FieldInfo } from "../../components/FieldInfo";
import PendingComponent from "../../components/PendingComponent";

export function CreateCashpointForm() {
  const [open, onOpenChange] = useState(false);

  const { data: branch, isPending: isBranchPending } =
    useQuery(branchQueryOptions);
  const { data: clinics, isPending: isClinicsPending } =
    useQuery(clinicsQueryOptions);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      name: "",
      branch_id: "",
      clinics_id: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await createCashpointAction(value);
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["hmoPlan"] });
    },
  });

  if (isClinicsPending || isBranchPending) return <PendingComponent />;

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
                      {branch?.branch_data?.map((b) => (
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
                      {clinics?.clinics_data?.map((c) => (
                        <Select.Item key={c.id} value={c.id}>
                          {c.name}
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
    </div>
  );
}

export function UpdateCashpointForm({
  id,
  ...values
}: DB["cash_points"]["Update"]) {
  const [open, onOpenChange] = useState(false);

  const { data: branch, isPending: isBranchPending } =
    useQuery(branchQueryOptions);
  const { data: clinics, isPending: isClinicsPending } =
    useQuery(clinicsQueryOptions);
  const queryClient = useQueryClient();

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

      queryClient.invalidateQueries({ queryKey: ["cashpoints"] });
    },
  });

  if (isClinicsPending || isBranchPending) return <PendingComponent />;

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
                      {branch?.branch_data?.map((b) => (
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
                      {clinics?.clinics_data?.map((c) => (
                        <Select.Item key={c.id} value={c.id}>
                          {c.name}
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
    </div>
  );
}
