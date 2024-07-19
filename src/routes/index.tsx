import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Container, Heading, SegmentedControl } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { FieldInfo } from "../components/FieldInfo";
import {
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  Spinner,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Footer } from "../components/Footer";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";
import supabase from "../supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Login,
});

function Login() {
  const [segment, setSegment] = useState("login");

  return (
    <section className="flex flex-col justify-between h-dvh w-full">
      <div className="flex flex-col mt-10 md:mt-20 lg:mt-40 gap-10">
        <Heading size={"7"} align={"center"}>
          Brightedge HMR
        </Heading>
        <Container size={"3"} mx={"2"}>
          <Card>
            <Flex
              direction={{
                initial: "column",
                md: "row",
                lg: "column",
                xl: "row",
              }}
              justify={"center"}
              align={"center"}
              gap={"6"}
            >
              <div className="flex flex-col">
                <SegmentedControl.Root
                  size={"3"}
                  defaultValue={segment}
                  mb={"2"}
                  onValueChange={setSegment}
                >
                  <SegmentedControl.Item value="login">
                    Login
                  </SegmentedControl.Item>
                  <SegmentedControl.Item value="signUp">
                    Sign Up
                  </SegmentedControl.Item>
                </SegmentedControl.Root>
                {segment === "login" && <SignIn />}
                {segment === "signUp" && <SignUp />}
              </div>
            </Flex>
          </Card>
        </Container>
      </div>
      <Footer />
    </section>
  );
}

function SignUp() {
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
    <Box>
      <Card className="shadow-md">
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
    </Box>
  );
}

function SignIn() {
  const [revealPassword, setRevealPassword] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      password: "",
      email: "",
    },
    onSubmit: async ({ value }) => {
      const authData = {
        email: value.email,
        password: value.password,
      };
      const { data, error } = await supabase.auth.signInWithPassword(authData);
      if (error) {
        toast.error(error.message);
      }
      if (data.user?.id) {
        toast.success("Logged in successfully");
        form.reset();
        navigate({ to: "/dashboard", replace: true });
      }
    },
  });

  return (
    <Box>
      <Card className="shadow-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <Flex direction={"column"} gap={"3"} p={"6"}>
            <form.Field
              name="email"
              validators={{
                onChange: z.string().email(),
              }}
              children={(field) => {
                return (
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
                      <TextField.Slot>
                        <Mail height="14" width="14" />
                      </TextField.Slot>
                    </TextField.Root>
                    <FieldInfo field={field} />
                  </Box>
                );
              }}
            />

            <form.Field
              validators={{
                onChange: z.string().min(5, {
                  message: "password must be atleast more than 5 characters ",
                }),
              }}
              name="password"
              children={(field) => {
                return (
                  <Box>
                    <TextField.Root
                      type={revealPassword ? "text" : "password"}
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      size="3"
                      placeholder="password"
                    >
                      <TextField.Slot>
                        <Lock />
                      </TextField.Slot>
                      <TextField.Slot>
                        <IconButton
                          size="1"
                          type="button"
                          variant="ghost"
                          onClick={() => setRevealPassword(!revealPassword)}
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
                );
              }}
            />

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button size={"4"} type="submit" disabled={!canSubmit}>
                  {isSubmitting ? <Spinner /> : "Login"}
                </Button>
              )}
            />
          </Flex>
        </form>
      </Card>
    </Box>
  );
}
