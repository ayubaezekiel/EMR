import {
  Button,
  Card,
  Dialog,
  Flex,
  IconButton,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit, X } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import {
  createLabTestTemplateAction,
  updateLabTestTemplateAction,
} from "../../../actions/config/lab-test";
import { useLabTestParamsQuery } from "../../../actions/queries";
import { FieldInfo } from "../../../components/FieldInfo";
import { useProfile } from "@/lib/hooks";

export function CreateLabTemplateForm() {
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();

  const { data: params, isPending: isParamPending } = useLabTestParamsQuery();

  const form = useForm({
    defaultValues: {
      name: "",
      parameter: [
        {
          name: "",
          reference_range: "",
        },
      ],
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await createLabTestTemplateAction({
        name: value.name,
        parameters: value.parameter,
        branch_id: `${profile_data?.branch_id}`,
      });
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["labTestTemps"] });
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger disabled={isParamPending || isProfilePending}>
        <Button loading={isParamPending || isProfilePending} variant="soft">
          New
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>New Template</Dialog.Title>
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
          <form.Field name="parameter" mode="array">
            {(field) => {
              return (
                <Card mt={"4"}>
                  <Text>Template Parameters</Text>
                  {field.state.value.map((_, i) => {
                    return (
                      <div key={i} className="mt-2">
                        <div className="flex gap-2 items-center">
                          <div className="grid grid-cols-2 gap-2">
                            <form.Field name={`parameter[${i}].name`}>
                              {(subField) => {
                                return (
                                  <Select.Root
                                    size={"3"}
                                    name={subField.name}
                                    value={subField.state.value}
                                    onValueChange={(e) =>
                                      subField.handleChange(e)
                                    }
                                  >
                                    <Select.Trigger placeholder="select a template parameter..." />
                                    <Select.Content position="popper">
                                      {params?.lab_params_data?.map((c) => (
                                        <Select.Item value={c.name} key={c.id}>
                                          {c.name}
                                        </Select.Item>
                                      ))}
                                    </Select.Content>
                                  </Select.Root>
                                );
                              }}
                            </form.Field>
                            <form.Field
                              name={`parameter[${i}].reference_range`}
                            >
                              {(subField) => {
                                return (
                                  <div className="flex flex-col">
                                    <TextField.Root
                                      size={"3"}
                                      placeholder="Reference Range"
                                      name={subField.name}
                                      id={subField.name}
                                      value={subField.state.value}
                                      onChange={(e) =>
                                        subField.handleChange(
                                          e.target.value as string
                                        )
                                      }
                                      onBlur={subField.handleBlur}
                                    />
                                    <FieldInfo field={subField} />
                                  </div>
                                );
                              }}
                            </form.Field>
                          </div>
                          <IconButton
                            type="button"
                            color="red"
                            disabled={field.state.value.length === 1}
                            onClick={() => field.removeValue(i)}
                          >
                            <X />
                          </IconButton>
                        </div>

                        <Button
                          type="button"
                          mt={"2"}
                          variant={"soft"}
                          onClick={() =>
                            field.pushValue({ name: "", reference_range: "" })
                          }
                        >
                          Add more
                        </Button>
                      </div>
                    );
                  })}
                </Card>
              );
            }}
          </form.Field>

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
  );
}

export function UpdateLabTemplateForm({
  ...values
}: DB["lab_test_template"]["Update"]) {
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();
  const { data: params, isPending: isParamPending } = useLabTestParamsQuery();

  const parameters = JSON.parse(JSON.stringify(values.parameters));

  const form = useForm({
    defaultValues: {
      name: values.name,
      parameter: parameters,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await updateLabTestTemplateAction({
        id: values.id,
        name: value.name,
        parameters: value.parameter,
        branch_id: `${profile_data?.branch_id}`,
      });
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["labTestTemps"] });
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger disabled={isParamPending || isProfilePending}>
        <Button variant="ghost" loading={isParamPending || isProfilePending}>
          <Edit size={16} />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Update Template</Dialog.Title>
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
          <form.Field name="parameter" mode="array">
            {(field) => {
              return (
                <Card mt={"4"}>
                  <Text>Template Parameters</Text>
                  {field.state.value.map((name: string, i: number) => {
                    return (
                      <div key={name} className="mt-2">
                        <div className="flex gap-2 items-center">
                          <div className="grid grid-cols-2">
                            <form.Field name={`parameter.${i}.name`}>
                              {(subField) => {
                                return (
                                  <Select.Root
                                    size={"3"}
                                    name={subField.name}
                                    value={subField.state.value}
                                    onValueChange={(e) =>
                                      subField.handleChange(e)
                                    }
                                  >
                                    <Select.Trigger
                                      className="w-[90%]"
                                      placeholder="select a template parameter..."
                                    />
                                    <Select.Content position="popper">
                                      {params?.lab_params_data?.map((c) => (
                                        <Select.Item value={c.name} key={c.id}>
                                          {c.name}
                                        </Select.Item>
                                      ))}
                                    </Select.Content>
                                  </Select.Root>
                                );
                              }}
                            </form.Field>

                            <form.Field name={`parameter.${i}.reference_range`}>
                              {(subField) => {
                                return (
                                  <div className="flex flex-col">
                                    <TextField.Root
                                      size={"3"}
                                      placeholder="Reference Range"
                                      name={subField.name}
                                      id={subField.name}
                                      value={subField.state.value}
                                      onChange={(e) =>
                                        subField.handleChange(
                                          e.target.value as string
                                        )
                                      }
                                      onBlur={subField.handleBlur}
                                    />
                                    <FieldInfo field={subField} />
                                  </div>
                                );
                              }}
                            </form.Field>
                          </div>
                          <IconButton
                            type="button"
                            color="red"
                            disabled={field.state.value.length === 1}
                            onClick={() => field.removeValue(i)}
                          >
                            <X />
                          </IconButton>
                        </div>

                        <Button
                          type="button"
                          mt={"2"}
                          variant={"soft"}
                          onClick={() =>
                            field.pushValue({ name: "", reference_range: "" })
                          }
                        >
                          Add more
                        </Button>
                      </div>
                    );
                  })}
                </Card>
              );
            }}
          </form.Field>

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
  );
}
