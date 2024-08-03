import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import supabase from "../supabase/client";
import { toast } from "sonner";
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  IconButton,
  Spinner,
  TextField,
} from "@radix-ui/themes";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { FieldInfo } from "./FieldInfo";

export function SignUp() {
  const [revealPassword, setRevealPassword] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: async ({ value }) => {
      const userData = {
        email: value.email,
        password: value.password,
      };

      const { data, error } = await supabase.auth.signUp(userData);
      if (error) {
        toast.error(error.message);
      }
      if (data.user?.id) {
        toast.success(`${data.user.email} successfully signed up`);
        form.reset();
      }
    },
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>New user</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Create New User</Dialog.Title>
        <Dialog.Description size={"1"}>
          After creating this user,you can proceed to assign various permissions
          to the user else the user will have no access rights.
        </Dialog.Description>
        <Card className="shadow-md" mt={"5"}>
          <form
            onSubmit={(e) => {
              e.stopPropagation(), e.preventDefault(), form.handleSubmit();
            }}
          >
            <Flex direction={"column"} gap={"3"} p={"6"}>
              <form.Field
                name="email"
                children={(field) => (
                  <Box>
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
                  </Box>
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
        </Card>
      </Dialog.Content>
    </Dialog.Root>
  );
}
