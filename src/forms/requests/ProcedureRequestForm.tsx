import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import {
  Button,
  Callout,
  Checkbox,
  Dialog,
  Flex,
  IconButton,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  labTestQueryOptions,
  patientsQueryOptions,
} from "../../actions/queries";
import PendingComponent from "../../components/PendingComponent";
import { checkAuth } from "../../lib/utils";
import supabase from "../../supabase/client";

export function CreateProcedureRequestForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: lab_test_data, isPending: isLabPending } =
    useQuery(labTestQueryOptions);

  const { data: patient_data, isPending: patientsPending } =
    useQuery(patientsQueryOptions);
  const [open, onOpenChange] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      services: [{ service: "", note: "", is_urgent: false, key: randomId() }],
      patients_id: "",
    },
  });

  if (patientsPending || isLabPending) return <PendingComponent />;

  const fields = form.getValues().services.map((item, index) => (
    <Flex key={item.key} gap={"2"} mt={"4"}>
      <div className="flex flex-col gap-1 w-full">
        <Text size={"3"}>Test*</Text>
        <Select.Root
          required
          size={"3"}
          key={form.key(`services.${index}.service`)}
          onValueChange={(e) =>
            form.getInputProps(`services.${index}.service`).onChange(e)
          }
        >
          <Select.Trigger placeholder="select a test..." />
          <Select.Content position="popper">
            {lab_test_data?.lab_test_data?.map((v) => (
              <Select.Item
                key={v.id}
                value={JSON.stringify({
                  name: v.name,
                  amount: v.default_price,
                })}
              >
                {v.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>

      <div className="flex flex-col gap-1">
        <Text size={"3"}>Note*</Text>
        <TextField.Root
          required
          size={"3"}
          style={{ flex: 1 }}
          key={form.key(`services.${index}.note`)}
          {...form.getInputProps(`services.${index}.note`)}
        />
      </div>
      <div className="flex flex-col gap-1 w-40 items-center mt-6">
        <Text size={"1"}>urgent?</Text>
        <Checkbox
          size={"3"}
          key={form.key(`services.${index}.is_urgent`)}
          onCheckedChange={(e) => {
            form.getInputProps(`services.${index}.is_urgent`).onChange(e);
          }}
        />
      </div>
      <div className="flex flex-col mt-8 items-center">
        <IconButton
          type="button"
          color="red"
          size={"1"}
          onClick={() => form.removeListItem("services", index)}
        >
          <Trash size="1rem" />
        </IconButton>
      </div>
    </Flex>
  ));

  return (
    <div>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger>
          <Button size={"4"}>New Request</Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>Laboratory Request</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Fill out the form information
          </Dialog.Description>

          <form
            onSubmit={form.onSubmit(async (values) => {
              setIsLoading(true);

              const user = await checkAuth();
              const { error } = await supabase.from("requests").insert([
                {
                  patients_id: `${values.patients_id}`,
                  taken_by: `${user?.id}`,
                  is_lab: true,
                  services: values.services.map((v) => ({
                    service: JSON.parse(v.service),
                    note: v.note,
                    is_urgent: v.is_urgent,
                  })),
                },
              ]);
              if (error) {
                toast.error(error.message);
                setIsLoading(false);
              } else {
                toast.success("request issued successfully");
                form.reset();
                queryClient.invalidateQueries({ queryKey: ["requests"] });
                setIsLoading(false);
                onOpenChange(false);
              }
            })}
          >
            <div className="flex flex-col">
              <Text size={"3"}>Patient*</Text>
              <Select.Root
                size={"3"}
                onValueChange={(e) =>
                  form.getInputProps("patients_id").onChange(e)
                }
              >
                <Select.Trigger placeholder="select patient..." />
                <Select.Content position="popper">
                  {patient_data?.patient_data?.map((p) => (
                    <Select.Item key={p.id} value={p.id}>
                      {p.first_name} {p.middle_name} {p.last_name} - [
                      {p.id.slice(0, 8).toUpperCase()}]
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>

            {fields.length < 0 && (
              <Callout.Root color="red">
                <Callout.Icon>
                  <AlertCircle />
                  <Callout.Text ml={"2"}>Empty</Callout.Text>
                </Callout.Icon>
              </Callout.Root>
            )}

            {fields}
            <Flex justify="end" mt="4">
              <Button
                type="button"
                variant="soft"
                onClick={() =>
                  form.insertListItem("services", {
                    service: "",
                    note: "",
                    is_urgent: false,
                    key: randomId(),
                  })
                }
              >
                Add more
              </Button>
            </Flex>
            <Button
              loading={isLoading}
              disabled={!form.isValid() || isLoading}
              size={"4"}
              type="submit"
            >
              Request
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
