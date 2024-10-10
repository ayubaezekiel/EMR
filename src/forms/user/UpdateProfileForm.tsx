import {
  useBranchQuery,
  useDepartmentsQuery,
  useJobPositionsQuery,
} from "@/actions/queries";
import { getProfileById } from "@/lib/utils";
import { Button, Flex, Select, Text, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { updateProfileAction } from "../../actions/config/user-profile";
import { FieldInfo } from "../../components/FieldInfo";
import { useProfile } from "@/lib/hooks";

export function UpdateProfileForm() {
  const queryClient = useQueryClient();
  const { profileId } = useParams({
    from: "/_layout/dashboard/users/$profileId",
  });
  const { data: dept_data, isPending: isDeptPending } = useDepartmentsQuery();
  const { data, isPending } = useBranchQuery();

  const { data: profile_data, isPending: isProfilePending } = useQuery({
    queryKey: ["profileById"],
    queryFn: () => getProfileById(profileId),
  });

  const {
    isProfilePending: isLoggedInProfilePending,
    profile_data: logged_in_profile_data,
  } = useProfile();
  const { data: job_pos_data, isPending: isJobPosPending } =
    useJobPositionsQuery();

  const { branch, ...rest } = { ...profile_data };
  branch;

  const form = useForm({
    defaultValues: {
      ...rest,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await updateProfileAction({
        ...value,
      });
      form.reset();
      queryClient.resetQueries();
    },
  });

  const pending =
    isProfilePending ||
    isJobPosPending ||
    isDeptPending ||
    isPending ||
    isLoggedInProfilePending;

  const allowed =
    logged_in_profile_data?.id === profileId ||
    logged_in_profile_data?.is_super_user;
  const super_user_allowed = logged_in_profile_data?.is_super_user;

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        form.handleSubmit();
      }}
    >
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
          defaultValue={profile_data?.department_id}
          name="department_id"
          children={(field) => (
            <div className="flex flex-col">
              <Text size={"3"}>Department*</Text>
              <Select.Root
                required
                disabled={!super_user_allowed}
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
          defaultValue={profile_data?.job_position_id}
          children={(field) => (
            <div className="flex flex-col">
              <Text size={"3"}>Job Position*</Text>
              <Select.Root
                required
                disabled={!super_user_allowed}
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
          defaultValue={profile_data?.branch_id}
          children={(field) => (
            <div className="flex flex-col">
              <Text size={"3"}>Branch</Text>
              <Select.Root
                required
                disabled={!super_user_allowed}
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
              Update
            </Button>
          )}
        />
      </Flex>
    </form>
  );
}
