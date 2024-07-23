import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";

interface DeleteActionType {
  id: string;
  title: string;
  warning: string;
  inValidate: string;
  actionFn: ({ id }: { id: string }) => void;
}

export function DeleteActionForm({
  id,
  title,
  warning,
  inValidate,
  actionFn,
}: DeleteActionType) {
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      id: id,
    },
    onSubmit: async () => {
      actionFn({ id: id });
      queryClient.invalidateQueries({ queryKey: [inValidate] });
    },
  });

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" variant="ghost">
          <Trash size={16} />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">{warning}</AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <form
              onSubmit={(e) => {
                e.stopPropagation(), e.preventDefault(), form.handleSubmit();
                form.reset();
              }}
            >
              <Button type="submit" variant="solid" color="red">
                Confirm
              </Button>
            </form>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
