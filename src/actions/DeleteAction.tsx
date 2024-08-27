import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";

interface DeleteActionType {
	id: string;
	title: string;
	warning: string;
	inValidate: string;
	actionFn: ({ id }: { id: string }) => Promise<void>;
}

export function DeleteActionForm({
	id,
	title,
	warning,
	inValidate,
	actionFn,
}: DeleteActionType) {
	const queryClient = useQueryClient();

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
						<Button
							onClick={async () => {
								await actionFn({ id: id });
								queryClient.invalidateQueries({ queryKey: [inValidate] });
							}}
							type="submit"
							variant="solid"
							color="red"
						>
							Confirm
						</Button>
					</AlertDialog.Action>
				</Flex>
			</AlertDialog.Content>
		</AlertDialog.Root>
	);
}
