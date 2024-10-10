import {
  useBranchQuery,
  useDepartmentsQuery,
  useJobPositionsQuery,
} from "@/actions/queries";
import { useProfile } from "@/lib/hooks";
import supabase from "@/supabase/client";
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
import { toast } from "sonner";
import { z } from "zod";
import { FieldInfo } from "../../components/FieldInfo";
import { getUsers } from "@/actions/actions";
import { useState } from "react";

export function CreateProfileForm() {
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();
  const { data: dept_data, isPending: isDeptPending } = useDepartmentsQuery();
  const { data, isPending } = useBranchQuery();
  const { data: users, isPending: isUsersPending } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const { data: job_pos_data, isPending: isJobPosPending } =
    useJobPositionsQuery();

  const form = useForm({
    defaultValues: {
      branch_id: "",
      email: "",
      department_id: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      gender: "",
      job_position_id: "",
      user_id: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      const { data, error } = await supabase.from("profile").insert({
        ...value,
      });

      if (error && !data) {
        toast.error(error.message);
      } else {
        toast.success("Profile created successfully");
      }
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });

  const pending =
    isJobPosPending ||
    isDeptPending ||
    isPending ||
    isProfilePending ||
    isUsersPending;

  const allowed = profile_data?.is_super_user;

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Trigger>
        <Button>New Profile</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>New Profile</Dialog.Title>
        <Dialog.Description size={"1"} mb={"4"}>
          Create profile for new users before assigning permissions
        </Dialog.Description>
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="user_id"
            children={(field) => (
              <div className="flex flex-col">
                <Text size={"3"}>User</Text>
                <Select.Root
                  required
                  disabled={!allowed}
                  onValueChange={(e) => field.handleChange(e)}
                  value={field.state.value!}
                  name={field.name}
                  size={"3"}
                >
                  <Select.Trigger placeholder="select user..." />
                  <Select.Content position="popper">
                    {users?.user_data.users?.map((b) => (
                      <Select.Item value={b.id}>{b.email}</Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
                <FieldInfo field={field} />
              </div>
            )}
          />
          <form.Field
            name="first_name"
            validators={{
              onChange: z
                .string()
                .min(3, { message: "field must be atleast 3 characters" }),
            }}
            children={(field) => (
              <label htmlFor={field.name} className="flex flex-col">
                <Text size={"3"}>First Name*</Text>
                <TextField.Root
                  disabled={!allowed}
                  size={"3"}
                  name={field.name}
                  id={field.name}
                  value={field.state.value as string}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FieldInfo field={field} />
              </label>
            )}
          />
          <form.Field
            name="middle_name"
            children={(field) => (
              <label htmlFor={field.name} className="flex flex-col">
                <Text size={"3"}>Middle Name</Text>
                <TextField.Root
                  disabled={!allowed}
                  size={"3"}
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
            name="last_name"
            validators={{
              onChange: z
                .string()
                .min(3, { message: "field must be atleast 3 characters" }),
            }}
            children={(field) => (
              <label htmlFor={field.name} className="flex flex-col">
                <Text size={"3"}>Last Name*</Text>
                <TextField.Root
                  disabled={!allowed}
                  size={"3"}
                  name={field.name}
                  id={field.name}
                  value={field.state.value as string}
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
                <Text size={"3"}>Alternative Email*</Text>
                <TextField.Root
                  disabled={!allowed}
                  size={"3"}
                  name={field.name}
                  id={field.name}
                  value={field.state.value as string}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FieldInfo field={field} />
              </label>
            )}
          />
          <div>
            <form.Field
              name="department_id"
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>Department*</Text>
                  <Select.Root
                    required
                    disabled={!allowed}
                    onValueChange={(e) => field.handleChange(e)}
                    value={field.state.value!}
                    name={field.name}
                    size={"3"}
                  >
                    <Select.Trigger placeholder="select department..." />
                    <Select.Content position="popper">
                      {dept_data?.department_data?.map((b) => (
                        <Select.Item value={b.id}>{b.name}</Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  <FieldInfo field={field} />
                </div>
              )}
            />
            <form.Field
              name="job_position_id"
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>Job Position*</Text>
                  <Select.Root
                    required
                    disabled={!allowed}
                    onValueChange={(e) => field.handleChange(e)}
                    value={field.state.value!}
                    name={field.name}
                    size={"3"}
                  >
                    <Select.Trigger placeholder="select job position..." />
                    <Select.Content position="popper">
                      {job_pos_data?.job_positions_data?.map((b) => (
                        <Select.Item value={b.id}>{b.name}</Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  <FieldInfo field={field} />
                </div>
              )}
            />
            <form.Field
              name="branch_id"
              children={(field) => (
                <div className="flex flex-col">
                  <Text size={"3"}>Branch</Text>
                  <Select.Root
                    required
                    disabled={!allowed}
                    onValueChange={(e) => field.handleChange(e)}
                    value={field.state.value!}
                    name={field.name}
                    size={"3"}
                  >
                    <Select.Trigger placeholder="select job position..." />
                    <Select.Content position="popper">
                      {data?.branch_data?.map((b) => (
                        <Select.Item value={b.id}>{b.name}</Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  <FieldInfo field={field} />
                </div>
              )}
            />
          </div>
          <Flex gap="3" mt="4" justify="end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || !allowed}
                  size={"4"}
                  loading={pending || isSubmitting}
                >
                  Create Profile
                </Button>
              )}
            />
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
