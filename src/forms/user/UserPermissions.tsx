import { useProfile } from "@/lib/hooks";
import { Button, Flex, Spinner, Switch, Text } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { updateProfileAction } from "../../actions/config/user-profile";
import { FieldInfo } from "../../components/FieldInfo";
import { getProfileById } from "@/lib/utils";
import { useParams } from "@tanstack/react-router";

export function UserPermission() {
  const queryClient = useQueryClient();
  const { profileId } = useParams({
    from: "/_layout/dashboard/users/$profileId",
  });

  const {
    isProfilePending: isLoggedInProfilePending,
    profile_data: logged_in_profile_data,
  } = useProfile();

  const { data: profile_data, isPending: isProfilePending } = useQuery({
    queryKey: ["profileById"],
    queryFn: () => getProfileById(profileId),
  });

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
        branch_id: `${profile_data?.branch_id}`,
      });
      form.reset();
      queryClient.resetQueries();
    },
  });

  const allowed =
    logged_in_profile_data?.is_super_user ||
    logged_in_profile_data?.id === profileId;

  return isLoggedInProfilePending || isProfilePending ? (
    <Spinner />
  ) : (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-2">
        <form.Field
          name="is_super_user"
          validators={{
            onChange: z.boolean().optional(),
          }}
          children={(field) => (
            <div className="flex gap-2 items-center">
              <Switch
                size={"3"}
                disabled={!allowed}
                name={field.name}
                id={field.name}
                checked={Boolean(field.state.value)}
                onCheckedChange={(e) => field.handleChange(e)}
                onBlur={field.handleBlur}
              />
              <Text size={"3"}>{field.name}</Text>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="can_switch_branch"
          validators={{
            onChange: z.boolean().optional(),
          }}
          children={(field) => (
            <div className="flex gap-2 items-center">
              <Switch
                size={"3"}
                disabled={!allowed}
                name={field.name}
                id={field.name}
                checked={Boolean(field.state.value)}
                onCheckedChange={(e) => field.handleChange(e)}
                onBlur={field.handleBlur}
              />
              <Text size={"3"}>{field.name}</Text>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="has_access_to_config"
          validators={{
            onChange: z.boolean().optional(),
          }}
          children={(field) => (
            <div className="flex gap-2 items-center">
              <Switch
                size={"3"}
                disabled={!allowed}
                name={field.name}
                id={field.name}
                checked={Boolean(field.state.value)}
                onCheckedChange={(e) => field.handleChange(e)}
                onBlur={field.handleBlur}
              />
              <Text size={"3"}>{field.name}</Text>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="can_issue_request"
          validators={{
            onChange: z.boolean().optional(),
          }}
          children={(field) => (
            <div className="flex gap-2 items-center">
              <Switch
                size={"3"}
                disabled={!allowed}
                name={field.name}
                id={field.name}
                checked={Boolean(field.state.value)}
                onCheckedChange={(e) => field.handleChange(e)}
                onBlur={field.handleBlur}
              />
              <Text size={"3"}>{field.name}</Text>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="has_access_to_admission"
          validators={{
            onChange: z.boolean().optional(),
          }}
          children={(field) => (
            <div className="flex gap-2 items-center">
              <Switch
                size={"3"}
                disabled={!allowed}
                name={field.name}
                id={field.name}
                checked={Boolean(field.state.value)}
                onCheckedChange={(e) => field.handleChange(e)}
                onBlur={field.handleBlur}
              />
              <Text size={"3"}>{field.name}</Text>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="has_access_to_accounting"
          validators={{
            onChange: z.boolean().optional(),
          }}
          children={(field) => (
            <div className="flex gap-2 items-center">
              <Switch
                size={"3"}
                disabled={!allowed}
                name={field.name}
                id={field.name}
                checked={Boolean(field.state.value)}
                onCheckedChange={(e) => field.handleChange(e)}
                onBlur={field.handleBlur}
              />
              <Text size={"3"}>{field.name}</Text>
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Field
          name="has_access_to_billing"
          validators={{
            onChange: z.boolean().optional(),
          }}
          children={(field) => (
            <div className="flex gap-2 items-center">
              <Switch
                size={"3"}
                disabled={!allowed}
                name={field.name}
                id={field.name}
                checked={Boolean(field.state.value)}
                onCheckedChange={(e) => field.handleChange(e)}
                onBlur={field.handleBlur}
              />
              <Text size={"3"}>{field.name}</Text>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="has_access_to_doctor_priviledges"
          validators={{
            onChange: z.boolean().optional(),
          }}
          children={(field) => (
            <div className="flex gap-2 items-center">
              <Switch
                size={"3"}
                disabled={!allowed}
                name={field.name}
                id={field.name}
                checked={Boolean(field.state.value)}
                onCheckedChange={(e) => field.handleChange(e)}
                onBlur={field.handleBlur}
              />
              <Text size={"3"}>{field.name}</Text>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="has_access_to_documents"
          validators={{
            onChange: z.boolean().optional(),
          }}
          children={(field) => (
            <div className="flex gap-2 items-center">
              <Switch
                size={"3"}
                disabled={!allowed}
                name={field.name}
                id={field.name}
                checked={Boolean(field.state.value)}
                onCheckedChange={(e) => field.handleChange(e)}
                onBlur={field.handleBlur}
              />
              <Text size={"3"}>{field.name}</Text>
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Field
          name="has_access_to_lab"
          validators={{
            onChange: z.boolean().optional(),
          }}
          children={(field) => (
            <div className="flex gap-2 items-center">
              <Switch
                size={"3"}
                disabled={!allowed}
                name={field.name}
                id={field.name}
                checked={Boolean(field.state.value)}
                onCheckedChange={(e) => field.handleChange(e)}
                onBlur={field.handleBlur}
              />
              <Text size={"3"}>{field.name}</Text>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="has_access_to_nursing"
          validators={{
            onChange: z.boolean().optional(),
          }}
          children={(field) => (
            <div className="flex gap-2 items-center">
              <Switch
                size={"3"}
                disabled={!allowed}
                name={field.name}
                id={field.name}
                checked={Boolean(field.state.value)}
                onCheckedChange={(e) => field.handleChange(e)}
                onBlur={field.handleBlur}
              />
              <Text size={"3"}>{field.name}</Text>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="has_access_to_pharmacy"
          validators={{
            onChange: z.boolean().optional(),
          }}
          children={(field) => (
            <div className="flex gap-2 items-center">
              <Switch
                size={"3"}
                disabled={!allowed}
                name={field.name}
                id={field.name}
                checked={Boolean(field.state.value)}
                onCheckedChange={(e) => field.handleChange(e)}
                onBlur={field.handleBlur}
              />
              <Text size={"3"}>{field.name}</Text>
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Field
          name="has_access_to_radiology"
          validators={{
            onChange: z.boolean().optional(),
          }}
          children={(field) => (
            <div className="flex gap-2 items-center">
              <Switch
                size={"3"}
                disabled={!allowed}
                name={field.name}
                id={field.name}
                checked={Boolean(field.state.value)}
                onCheckedChange={(e) => field.handleChange(e)}
                onBlur={field.handleBlur}
              />
              <Text size={"3"}>{field.name}</Text>
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Field
          name="has_access_to_reports"
          validators={{
            onChange: z.boolean().optional(),
          }}
          children={(field) => (
            <div className="flex gap-2 items-center">
              <Switch
                size={"3"}
                disabled={!allowed}
                name={field.name}
                id={field.name}
                checked={Boolean(field.state.value)}
                onCheckedChange={(e) => field.handleChange(e)}
                onBlur={field.handleBlur}
              />
              <Text size={"3"}>{field.name}</Text>
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="has_access_to_users"
          validators={{
            onChange: z.boolean().optional(),
          }}
          children={(field) => (
            <div className="flex gap-2 items-center">
              <Switch
                size={"3"}
                disabled={!allowed}
                name={field.name}
                id={field.name}
                checked={Boolean(field.state.value)}
                onCheckedChange={(e) => field.handleChange(e)}
                onBlur={field.handleBlur}
              />
              <Text size={"3"}>{field.name}</Text>
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
              disabled={!canSubmit || !allowed || isProfilePending}
              loading={isSubmitting || isProfilePending}
              size={"4"}
            >
              Update
            </Button>
          )}
        />
      </Flex>
    </form>
  );
}
