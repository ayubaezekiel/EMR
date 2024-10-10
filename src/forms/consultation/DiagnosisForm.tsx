import {
  createPatientDiagnosisAction,
  updatePatientDiagnosisAction,
} from "@/actions/consultation/actions";
import { useDiagnosis, useProfile } from "@/lib/hooks";
import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Select,
  Text,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit, X } from "lucide-react";
import { useState } from "react";

export function CreatePatientDiagnosisForm({
  isAdmission,
  patientId,
}: {
  isAdmission: boolean;
  patientId: string;
}) {
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();
  const { diagnosis_data, isDiagnosisPending } = useDiagnosis();

  const [open, onOpenChange] = useState(false);
  const form = useForm({
    defaultValues: {
      diagnosis: [{ name: "" }],
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      await createPatientDiagnosisAction({
        diagnosis: value.diagnosis,
        patients_id: patientId,
        taken_by: `${profile_data?.id}`,
        branch_id: `${profile_data?.branch_id}`,
        is_admission: isAdmission,
      });
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["diagnosis"] });
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger
        disabled={
          isProfilePending || !profile_data?.has_access_to_doctor_priviledges
        }
      >
        <Button size="4" loading={isProfilePending || isDiagnosisPending}>
          Add New
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth={"60rem"}>
        <Dialog.Title>New Diagnosis</Dialog.Title>
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field name="diagnosis" mode="array">
            {(field) => {
              return (
                <div>
                  {field.state.value.map((_, i) => {
                    return (
                      <form.Field key={i} name={`diagnosis[${i}].name`}>
                        {(subField) => {
                          return (
                            <div>
                              <Text size={"3"}>Name*</Text>
                              <Flex gap={"2"} align={"center"}>
                                <Select.Root
                                  size={"3"}
                                  value={subField.state.value}
                                  onValueChange={(e) =>
                                    subField.handleChange(e)
                                  }
                                >
                                  <Select.Trigger
                                    className="w-[95%]"
                                    placeholder="select diagnosis..."
                                  />
                                  <Select.Content position="popper">
                                    {diagnosis_data?.diagnosis_data?.map(
                                      (d) => (
                                        <Select.Item value={d.name}>
                                          {d.name}
                                        </Select.Item>
                                      )
                                    )}
                                  </Select.Content>
                                </Select.Root>
                                <IconButton
                                  disabled={field.state.value.length === 1}
                                  color="red"
                                  onClick={() => field.removeValue(i)}
                                >
                                  <X />
                                </IconButton>
                              </Flex>
                            </div>
                          );
                        }}
                      </form.Field>
                    );
                  })}
                  <Button
                    variant="soft"
                    mt={"2"}
                    onClick={() => field.pushValue({ name: "" })}
                    type="button"
                  >
                    Add More
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
      </Dialog.Content>
    </Dialog.Root>
  );
}

export function UpdatePatientDiagnosisForm({
  ...values
}: DB["patient_diagnosis"]["Update"] & { isAdmission: boolean }) {
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();
  const { diagnosis_data, isDiagnosisPending } = useDiagnosis();

  const [open, onOpenChange] = useState(false);

  const diagnosis = JSON.parse(JSON.stringify(values.diagnosis));

  const form = useForm({
    defaultValues: {
      diagnosis: diagnosis,
    },
    validatorAdapter: zodValidator(),

    onSubmit: async ({ value }) => {
      const { isAdmission, ...rest } = { ...values };
      isAdmission;
      await updatePatientDiagnosisAction({
        ...rest,
        branch_id: values.branch_id,

        diagnosis: value.diagnosis,
      });
      form.reset();
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["diagnosis"] });
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger
        disabled={
          isProfilePending || !profile_data?.has_access_to_doctor_priviledges
        }
      >
        <Button
          variant="ghost"
          loading={isProfilePending || isDiagnosisPending}
        >
          <Edit size={16} />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth={"60rem"}>
        <Dialog.Title>Update Diagnosis</Dialog.Title>

        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field name="diagnosis" mode="array">
            {(field) => {
              return (
                <div>
                  {field.state.value.map((_name: string, i: number) => {
                    return (
                      <form.Field key={i} name={`diagnosis.${i}.name`}>
                        {(subField) => {
                          return (
                            <div>
                              <Text size={"3"}>Name*</Text>
                              <Flex gap={"2"} align={"center"}>
                                <Select.Root
                                  size={"3"}
                                  value={subField.state.value}
                                  onValueChange={(e) =>
                                    subField.handleChange(e)
                                  }
                                >
                                  <Select.Trigger
                                    className="w-[95%]"
                                    placeholder="select diagnosis..."
                                  />
                                  <Select.Content position="popper">
                                    {diagnosis_data?.diagnosis_data?.map(
                                      (d) => (
                                        <Select.Item value={d.name}>
                                          {d.name}
                                        </Select.Item>
                                      )
                                    )}
                                  </Select.Content>
                                </Select.Root>
                                <IconButton
                                  disabled={field.state.value.length === 1}
                                  color="red"
                                  onClick={() => field.removeValue(i)}
                                >
                                  <X />
                                </IconButton>
                              </Flex>
                            </div>
                          );
                        }}
                      </form.Field>
                    );
                  })}
                  <Button
                    variant="soft"
                    mt={"2"}
                    onClick={() => field.pushValue({ name: "" })}
                    type="button"
                  >
                    Add More
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
      </Dialog.Content>
    </Dialog.Root>
  );
}
