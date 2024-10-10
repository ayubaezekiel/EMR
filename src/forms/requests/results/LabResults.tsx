import { useLabTestTempQuery } from "@/actions/queries";
import { FieldInfo } from "@/components/FieldInfo";
import { useProfile } from "@/lib/hooks";
import supabase from "@/supabase/client";
import {
  Button,
  Callout,
  Dialog,
  Flex,
  Select,
  Switch,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export function CreateLabResultsForm({ requestId }: { requestId: string }) {
  const [temp, setTemp] = useState(JSON.stringify([]));
  const { data: lab_temp_data, isPending: isLabTempPending } =
    useLabTestTempQuery();
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();

  const form = useForm({
    defaultValues: {
      template: "",
      results: JSON.parse(temp).map(
        (t: { name: string; reference_range: string }) => ({
          parameter: t.name,
          reference_range: t.reference_range,
          value: "",
          is_abnormal: false,
        })
      ),
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      const { data, error } = await supabase.from("lab_reports").insert({
        created_by: `${profile_data?.id}`,
        request_id: `${requestId}`,
        results: value.results,
      });
      if (error && !data) {
        toast.error(error.message);
      } else {
        toast.success("Results saved successfully");
        onOpenChange(false);
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["results"] });
      }
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger disabled={isLabTempPending || isProfilePending}>
        <Button size={"2"} radius="full">
          Process
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Laboratory Report</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Fill out the form information
        </Dialog.Description>

        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <Select.Root size={"3"} onValueChange={(e) => setTemp(e)}>
            <Select.Trigger placeholder="select template..." />
            <Select.Content position="popper">
              {lab_temp_data?.lab_test_template_data?.map((t) => (
                <Select.Item value={JSON.stringify(t.parameters)}>
                  {t.name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          <form.Field name="results" mode="array">
            {(field) => {
              return (
                <div>
                  {field.state.value.length === 0 ? (
                    <Callout.Root>Select a template</Callout.Root>
                  ) : (
                    field.state.value.map(
                      (params: { reference_range: string }, i: number) => {
                        return (
                          <div
                            key={i}
                            className="grid grid-cols-3 items-center gap-2 my-2"
                          >
                            <form.Field name={`results.${i}.parameter`}>
                              {(subField) => {
                                return (
                                  <div className="flex flex-col">
                                    <TextField.Root
                                      size={"3"}
                                      disabled
                                      value={subField.state.value}
                                      onChange={(e) => subField.handleChange(e)}
                                    />

                                    <Text size={"1"} ml={"2"}>
                                      {params.reference_range}
                                    </Text>
                                  </div>
                                );
                              }}
                            </form.Field>
                            <form.Field
                              name={`results.${i}.value`}
                              validators={{
                                onBlur: z
                                  .string()
                                  .min(1, { message: "required" }),
                              }}
                            >
                              {(subField) => {
                                return (
                                  <div>
                                    <TextField.Root
                                      mt={"-4"}
                                      placeholder="value"
                                      size={"3"}
                                      value={subField.state.value}
                                      onBlur={subField.handleBlur}
                                      onChange={(e) =>
                                        subField.handleChange(e.target.value)
                                      }
                                    />
                                    <FieldInfo field={subField} />
                                  </div>
                                );
                              }}
                            </form.Field>

                            <form.Field name={`results.${i}.is_abnormal`}>
                              {(field) => (
                                <Flex mt={"-4"} gap={"2"} justify={"end"}>
                                  <Switch
                                    size={"3"}
                                    checked={field.state.value}
                                    onCheckedChange={(e) =>
                                      field.handleChange(e)
                                    }
                                  />
                                  abnormal?
                                </Flex>
                              )}
                            </form.Field>
                          </div>
                        );
                      }
                    )
                  )}
                </div>
              );
            }}
          </form.Field>

          <Flex gap="3" mt="4" justify="end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  mt="4"
                  loading={isSubmitting}
                  type="submit"
                  disabled={!canSubmit}
                  size={"4"}
                >
                  Save
                </Button>
              )}
            </form.Subscribe>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export function UpdateLabResultsForm({
  id,
  request_id,
  results,
}: DB["lab_reports"]["Row"]) {
  const [temp, setTemp] = useState(JSON.stringify(results));
  const { data: lab_temp_data, isPending: isLabTempPending } =
    useLabTestTempQuery();
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();

  const form = useForm({
    defaultValues: {
      template: "",
      results: JSON.parse(temp).map(
        (t: {
          parameter: string;
          reference_range: string;
          is_abnormal: boolean;
          value: string;
        }) => ({
          parameter: t.parameter,
          reference_range: t.reference_range,
          value: t.value,
          is_abnormal: Boolean(t.is_abnormal),
        })
      ),
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      const { data, error } = await supabase
        .from("lab_reports")
        .update({
          created_by: `${profile_data?.id}`,
          request_id: request_id,
          results: value.results,
        })
        .eq("id", id);
      if (error && !data) {
        toast.error(error.message);
      } else {
        toast.success("Results updated successfully");
        onOpenChange(false);
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["results"] });
      }
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger disabled={isLabTempPending || isProfilePending}>
        <Button size={"2"} variant="soft">
          <Edit />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Laboratory Report</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Fill out the form information
        </Dialog.Description>

        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <Select.Root size={"3"} onValueChange={(e) => setTemp(e)}>
            <Select.Trigger placeholder="select template..." />
            <Select.Content position="popper">
              {lab_temp_data?.lab_test_template_data?.map((t) => (
                <Select.Item value={JSON.stringify(t.parameters)}>
                  {t.name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          <form.Field name="results" mode="array">
            {(field) => {
              return (
                <div>
                  {field.state.value.length === 0 ? (
                    <Callout.Root>Select a template</Callout.Root>
                  ) : (
                    field.state.value.map(
                      (params: { reference_range: string }, i: number) => {
                        return (
                          <div
                            key={i}
                            className="grid grid-cols-3 items-center gap-2 my-2"
                          >
                            <form.Field name={`results.${i}.parameter`}>
                              {(subField) => {
                                return (
                                  <div className="flex flex-col">
                                    <TextField.Root
                                      size={"3"}
                                      disabled
                                      value={subField.state.value}
                                      onChange={(e) => subField.handleChange(e)}
                                    />

                                    <Text size={"1"} ml={"2"}>
                                      {params.reference_range}
                                    </Text>
                                  </div>
                                );
                              }}
                            </form.Field>
                            <form.Field
                              name={`results.${i}.value`}
                              validators={{
                                onBlur: z
                                  .string()
                                  .min(1, { message: "required" }),
                              }}
                            >
                              {(subField) => {
                                return (
                                  <div>
                                    <TextField.Root
                                      mt={"-4"}
                                      placeholder="value"
                                      size={"3"}
                                      value={subField.state.value}
                                      onBlur={subField.handleBlur}
                                      onChange={(e) =>
                                        subField.handleChange(e.target.value)
                                      }
                                    />
                                    <FieldInfo field={subField} />
                                  </div>
                                );
                              }}
                            </form.Field>

                            <form.Field name={`results.${i}.is_abnormal`}>
                              {(field) => (
                                <Flex mt={"-4"} gap={"2"} justify={"end"}>
                                  <Switch
                                    size={"3"}
                                    checked={field.state.value}
                                    onCheckedChange={(e) =>
                                      field.handleChange(e)
                                    }
                                  />
                                  abnormal?
                                </Flex>
                              )}
                            </form.Field>
                          </div>
                        );
                      }
                    )
                  )}
                </div>
              );
            }}
          </form.Field>

          <Flex gap="3" mt="4" justify="end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  mt="4"
                  loading={isSubmitting}
                  type="submit"
                  disabled={!canSubmit}
                  size={"4"}
                >
                  Update
                </Button>
              )}
            </form.Subscribe>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
