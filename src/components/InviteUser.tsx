import {
  Box,
  Button,
  Dialog,
  Flex,
  IconButton,
  Spinner,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import supabase_admin from "../supabase/supabase-admin";
import { FieldInfo } from "./FieldInfo";
import { useProfile } from "@/lib/hooks";

export function InviteUser() {
  const { isProfilePending, profile_data } = useProfile();
  const [revealPassword, setRevealPassword] = useState(false);
  const [open, onOpenChange] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: async ({ value }) => {
      const { data, error } = await supabase_admin.auth.admin.generateLink({
        email: value.email,
        password: value.password,
        type: "signup",
        // options: {
        // 	data: {
        // 		first_name: "",
        // 		middle_name: "",
        // 		last_name: "",
        // 	},
        // },
      });

      if (error) {
        toast.error(error.message);
        console.log(error);
      }
      if (data.user?.id) {
        toast.success(
          `check your email ${data.user.email} and verify to complete the registration`
        );
        form.reset();
        onOpenChange(false);
      }
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger
        disabled={isProfilePending || Boolean(!profile_data?.is_super_user)}
      >
        <Button
          disabled={Boolean(!profile_data?.is_super_user)}
          loading={isProfilePending}
        >
          New user
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Create New User</Dialog.Title>
        <Dialog.Description size={"1"}>
          After creating this user, he must verify his email then you can
          proceed to assign various permissions or access rights to the user
          else the user will have no access rights.
        </Dialog.Description>
        <form
          onSubmit={(e) => {
            e.stopPropagation(), e.preventDefault(), form.handleSubmit();
          }}
        >
          <Flex direction={"column"} gap={"3"} p={"6"}>
            <form.Field
              name="email"
              children={(field) => (
                <div className="flex flex-col">
                  <TextField.Root
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    size="3"
                    placeholder="email"
                  >
                    <TextField.Slot>
                      <Mail />
                    </TextField.Slot>
                  </TextField.Root>
                  <FieldInfo field={field} />
                </div>
              )}
            />
            <form.Field
              name="password"
              children={(field) => (
                <Box>
                  <TextField.Root
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    size="3"
                    placeholder="password"
                    type="password"
                  >
                    <TextField.Slot>
                      <Lock />
                    </TextField.Slot>
                    <TextField.Slot>
                      <IconButton
                        onClick={() => setRevealPassword(!revealPassword)}
                        type="button"
                        size="1"
                        variant="ghost"
                      >
                        {revealPassword ? (
                          <Eye height="14" width="14" />
                        ) : (
                          <EyeOff height="14" width="14" />
                        )}
                      </IconButton>
                    </TextField.Slot>
                  </TextField.Root>
                  <FieldInfo field={field} />
                </Box>
              )}
            />
            <form.Field
              name="confirm_password"
              validators={{
                onChangeListenTo: ["password"],
                onChange: ({ value, fieldApi }) => {
                  if (value !== fieldApi.form.getFieldValue("password")) {
                    return "password do not match";
                  }
                  return undefined;
                },
              }}
              children={(field) => (
                <Box>
                  <TextField.Root
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    size="3"
                    type="password"
                    placeholder="confirm password"
                  >
                    <TextField.Slot>
                      <Lock />
                    </TextField.Slot>
                    <TextField.Slot>
                      <IconButton
                        onClick={() => setRevealPassword(!revealPassword)}
                        type="button"
                        size="1"
                        variant="ghost"
                      >
                        {revealPassword ? (
                          <Eye height="14" width="14" />
                        ) : (
                          <EyeOff height="14" width="14" />
                        )}
                      </IconButton>
                    </TextField.Slot>
                  </TextField.Root>
                  <FieldInfo field={field} />
                </Box>
              )}
            />

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button size={"4"} type="submit" disabled={!canSubmit}>
                  {isSubmitting ? <Spinner /> : "Sign Up"}
                </Button>
              )}
            />
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
