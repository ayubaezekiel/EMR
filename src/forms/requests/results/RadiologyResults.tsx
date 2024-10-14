import { useTemplatesQuery } from "@/actions/queries";
import { FieldInfo } from "@/components/FieldInfo";
import RichTextEditor from "@/components/textEditor/TipTapRichTextEditor";
import { useProfile } from "@/lib/hooks";
import supabase from "@/supabase/client";
import { Button, Dialog, Flex, Select, Spinner } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export function CreateRadiologyResultsForm({
  requestId,
}: {
  requestId: string;
}) {
  const { data: temp_data, isPending: isTempPending } = useTemplatesQuery();
  const [open, onOpenChange] = useState(false);
  const [temp, setTemp] = useState("");
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();

  const form = useForm({
    defaultValues: {
      results: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      const { data, error } = await supabase.from("radiology_results").insert({
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
        queryClient.invalidateQueries({ queryKey: ["labResults"] });
      }
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger disabled={isTempPending || isProfilePending}>
        <Button size={"2"} radius="full">
          Process
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Radiology Report</Dialog.Title>
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
              {temp_data?.consultation_templates_data?.map((t) => (
                <Select.Item key={t.id} value={t.content}>
                  {t.name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          <form.Field
            name="results"
            validators={{
              onChange: z.string().min(1, {
                message: "content should be atleast 10 characters",
              }),
            }}
          >
            {(field) => {
              return (
                <div>
                  <RichTextEditor
                    content={temp}
                    onChange={field.handleChange}
                  />
                  <FieldInfo field={field} />
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

export function UpdateRadiologyResultsForm({
  id,
  request_id,
  results,
}: DB["radiology_results"]["Row"]) {
  const { data: temp_data, isPending: isTempPending } = useTemplatesQuery();
  const [temp, setTemp] = useState(results);
  const queryClient = useQueryClient();
  const { isProfilePending, profile_data } = useProfile();

  const form = useForm({
    defaultValues: {
      results: results,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      const { data, error } = await supabase
        .from("radiology_results")
        .update({
          created_by: `${profile_data?.id}`,
          request_id: `${request_id}`,
          results: value.results,
        })
        .eq("id", id);
      if (error && !data) {
        toast.error(error.message);
      } else {
        toast.success("Results updated successfully");
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["radResults"] });
      }
    },
  });

  return isProfilePending || isTempPending ? (
    <Spinner />
  ) : (
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
          {temp_data?.consultation_templates_data?.map((t) => (
            <Select.Item key={t.id} value={t.content}>
              {t.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <form.Field
        name="results"
        validators={{
          onChange: z.string().min(1, {
            message: "content should be atleast 10 characters",
          }),
        }}
      >
        {(field) => {
          return (
            <div>
              <RichTextEditor content={temp} onChange={field.handleChange} />
              <FieldInfo field={field} />
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
  );
}
