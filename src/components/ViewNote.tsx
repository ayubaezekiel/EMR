import { Button, Card, Dialog } from "@radix-ui/themes";
import { Eye } from "lucide-react";

export function ViewNote({ note }: { note: string }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="ghost" color="green">
          <Eye size={16} />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Note</Dialog.Title>
        <Card>
          <div dangerouslySetInnerHTML={{ __html: note }} />
        </Card>
      </Dialog.Content>
    </Dialog.Root>
  );
}
