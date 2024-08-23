import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";

interface UpdateActionType {
	id: string;
	title: string;
	warning: string;
	triggleLabel: string;
	inValidate: string;
	disabled: boolean;
	actionFn: ({ id }: { id: string }) => void;
}
export const ConfirmAdmissionUpdate = ({
	actionFn,
	id,
	title,
	warning,
	triggleLabel,
	disabled,
	inValidate,
}: UpdateActionType) => {
	const queryClient = useQueryClient();
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button disabled={disabled} size={"2"} radius="full" variant="soft">
					{triggleLabel}
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
							disabled={disabled}
							variant="solid"
							color="red"
							onClick={() => {
								actionFn({ id: id });
								queryClient.invalidateQueries({ queryKey: [inValidate] });
							}}
						>
							Confirm
						</Button>
					</AlertDialog.Action>
				</Flex>
			</AlertDialog.Content>
		</AlertDialog.Root>
	);
};
