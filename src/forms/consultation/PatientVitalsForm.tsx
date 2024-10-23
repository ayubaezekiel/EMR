import { useVitalsQuery } from "@/actions/queries";
import { FieldInfo } from "@/components/FieldInfo";
import { useProfile } from "@/lib/hooks";
import supabase from "@/supabase/client";
import {
  Button,
  Dialog,
  Flex,
  IconButton,
  SegmentedControl,
  Select,
  Switch,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { CreateHistoryTakingForm } from "./HistoryTakingForm";

export function CreatePatientVitalsForm({ patientId }: { patientId: string }) {
  const { data, isPending } = useVitalsQuery();
  const [segment, setSegment] = useState("vitals");
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();
  const [open, onOpenChange] = useState(false);
  const form = useForm({
    defaultValues: {
      vitals:
        data?.vitals_data?.slice(0, 5).map((v) => ({
          name: JSON.stringify(`${v.name}###${v.unit}`),
          value: "",
          is_abnormal: false,
        })) ?? [],
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      const p_vitals = value.vitals.map((n) => ({
        name: n.name.split("###")[0].replace('"', ""),
        unit: n.name.split("###")[1].replace('"', ""),
        value: n.value,
        is_abnormal: n.is_abnormal,
      }));

      const { error, data } = await supabase
        .from("patient_vitals")
        .insert({
          patient_id: patientId,
          branch_id: `${profile_data?.branch_id}`,
          taken_by: `${profile_data?.id}`,
          vitals: p_vitals,
        })
        .select();

      if (error && !data) {
        toast.error(error.message);
      } else {
        onOpenChange(false);
        toast.success("patient vitals recorded successfully");
        queryClient.invalidateQueries({
          queryKey: ["patientVitalsById"],
        });
      }
    },
  });

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger disabled={isPending || isProfilePending}>
          <Button
            variant="soft"
            radius="full"
            loading={isPending || isProfilePending}
          >
            Nursing
          </Button>
        </Dialog.Trigger>
        <Dialog.Content maxWidth={"60rem"}>
          <Dialog.Title>Nursing</Dialog.Title>
          <Dialog.Description size={"1"} mb={"4"}>
            Record patient vitals or take history
          </Dialog.Description>
          <SegmentedControl.Root
            defaultValue={segment}
            onValueChange={setSegment}
          >
            <SegmentedControl.Item value="vitals">
              Vital Signs
            </SegmentedControl.Item>
            <SegmentedControl.Item value="history">
              History Taking
            </SegmentedControl.Item>
          </SegmentedControl.Root>
          {segment === "vitals" && (
            <form
              onSubmit={(e) => {
                e.stopPropagation();
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <form.Field name="vitals" mode="array">
                {(field) => {
                  return (
                    <div>
                      {field.state.value.map((params, i: number) => {
                        return (
                          <div
                            key={i}
                            className="flex items-center justify-between gap-2 my-2"
                          >
                            <form.Field
                              name={`vitals[${i}].name`}
                              validators={{
                                onChangeListenTo: [`vitals[${i}].name`],
                                onChange: ({ value, fieldApi }) => {
                                  if (
                                    fieldApi.form
                                      .getFieldValue("vitals")
                                      .filter((v) => v.name === value).length >
                                    1
                                  ) {
                                    return `${value.split("###")[0].replace('"', "")} already selected`;
                                  }
                                  return undefined;
                                },
                              }}
                            >
                              {(subField) => {
                                return (
                                  <div className="flex flex-col w-[70%] md:w-[50%]">
                                    <Select.Root
                                      size={"3"}
                                      defaultValue={params.name}
                                      onValueChange={(e) =>
                                        subField.handleChange(e)
                                      }
                                    >
                                      <Select.Trigger placeholder="parameter" />
                                      <Select.Content position="popper">
                                        {data?.vitals_data?.map((v) => (
                                          <Select.Item
                                            value={JSON.stringify(
                                              `${v.name}###${v.unit}`
                                            )}
                                          >
                                            {v.name}
                                          </Select.Item>
                                        ))}
                                      </Select.Content>
                                    </Select.Root>
                                    <Text size={"1"} ml={"1"} color="green">
                                      {subField.state.value.length > 2
                                        ? subField.state.value
                                            .split("###")[1]
                                            .replace('"', "")
                                        : ""}
                                    </Text>
                                    <FieldInfo field={subField} />
                                  </div>
                                );
                              }}
                            </form.Field>
                            <form.Field
                              name={`vitals[${i}].value`}
                              validators={{
                                onChange: z
                                  .string({ required_error: "required" })
                                  .min(1, { message: "required" }),
                              }}
                            >
                              {(subField) => {
                                return (
                                  <div className="flex flex-col">
                                    <TextField.Root
                                      required
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

                            <form.Field name={`vitals[${i}].is_abnormal`}>
                              {(field) => (
                                <Flex
                                  mt={"-4"}
                                  gap={"2"}
                                  justify={"end"}
                                  align={"center"}
                                >
                                  <Switch
                                    size={"3"}
                                    checked={field.state.value}
                                    onCheckedChange={(e) =>
                                      field.handleChange(e)
                                    }
                                  />
                                  <Text size={"1"}>abnormal?</Text>
                                </Flex>
                              )}
                            </form.Field>
                            <IconButton
                              size={"1"}
                              color="red"
                              mt={"-3"}
                              onClick={() => field.removeValue(i)}
                            >
                              <X />
                            </IconButton>
                          </div>
                        );
                      })}
                      <Button
                        type="button"
                        variant="soft"
                        onClick={() =>
                          field.pushValue({
                            is_abnormal: false,
                            name: "",
                            value: "",
                          })
                        }
                      >
                        Add more
                      </Button>
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
          )}
          {segment === "history" && (
            <CreateHistoryTakingForm isAdmission={false} />
          )}
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
