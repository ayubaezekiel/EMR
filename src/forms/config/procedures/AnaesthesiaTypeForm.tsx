import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import {
	createAnaesthesiaTypeAction,
	updateAnaesthesiaTypeAction,
} from "../../../actions/config/procedure";
import { FieldInfo } from "../../../components/FieldInfo";
import { useProfile } from "@/lib/hooks";

export function CreateAnaesthesiaTypeForm() {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();
	const { isProfilePending, profile_data } = useProfile();

	const form = useForm({
		defaultValues: {
			title: "",
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await createAnaesthesiaTypeAction({
				...value,
				branch_id: `${profile_data?.branch_id}`,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["anaesthesiaType"] });
		},
	});

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger disabled={isProfilePending}>
				<Button variant="soft" loading={isProfilePending}>
					New
				</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>New Anaesthesia Type</Dialog.Title>
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
						name="title"
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

export function UpdateAnaesthesiaTypeForm({
	id,
	...values
}: DB["anaesthesia_type"]["Update"]) {
	const [open, onOpenChange] = useState(false);

	const queryClient = useQueryClient();
	const { isProfilePending, profile_data } = useProfile();

	const form = useForm({
		defaultValues: {
			id: id,
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updateAnaesthesiaTypeAction({
				...value,
				branch_id: `${profile_data?.branch_id}`,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["anaesthesiaType"] });
		},
	});

	return (
		<div>
			<Dialog.Root open={open} onOpenChange={onOpenChange}>
				<Dialog.Trigger disabled={isProfilePending}>
					<Button variant="ghost" loading={isProfilePending}>
						<Edit size={16} />
					</Button>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Title>Update Anaesthesia Type</Dialog.Title>
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
							name="title"
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
		</div>
	);
}
