import {
	Button,
	Dialog,
	Flex,
	Select,
	Text,
	TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import {
	createFluidRoutesAction,
	updateFluidRoutesAction,
} from "../../../actions/config/admission";
import { FieldInfo } from "../../../components/FieldInfo";
import { useProfile } from "@/lib/hooks";

export function CreateFluidRoutesForm() {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();
	const { isProfilePending, profile_data } = useProfile();

	const form = useForm({
		defaultValues: {
			name: "",
			type: "",
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await createFluidRoutesAction({
				...value,
				branch_id: `${profile_data?.branch_id}`,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["fluidRoutes"] });
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
				<Dialog.Title>New Fluid Routes</Dialog.Title>
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
						name="name"
						validators={{
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
					>
						{(field) => (
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
					</form.Field>
					<form.Field
						name="type"
						validators={{
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
					>
						{(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Type*</Text>
								<Select.Root onValueChange={(e) => field.handleChange(e)}>
									<Select.Trigger placeholder="select type..." />
									<Select.Content>
										<Select.Item value="OUTPUT">Output</Select.Item>
										<Select.Item value="INPUT">Input</Select.Item>
									</Select.Content>
								</Select.Root>
								<FieldInfo field={field} />
							</div>
						)}
					</form.Field>

					<Flex gap="3" mt="4" justify="end">
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
						>
							{([canSubmit, isSubmitting]) => (
								<Button
									loading={isSubmitting}
									type="submit"
									disabled={!canSubmit || isSubmitting}
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

export function UpdateFluidRoutesForm({
	id,
	...values
}: DB["fluid_routes"]["Update"]) {
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
			await updateFluidRoutesAction({
				...value,
				branch_id: `${profile_data?.branch_id}`,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["fluidRoutes"] });
		},
	});

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger disabled={isProfilePending}>
				<Button variant="ghost" loading={isProfilePending}>
					<Edit size={16} />
				</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>Update Fluid Routes</Dialog.Title>
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
						name="name"
						validators={{
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
					>
						{(field) => (
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
					</form.Field>
					<form.Field
						name="type"
						validators={{
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
					>
						{(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Type*</Text>
								<Select.Root onValueChange={(e) => field.handleChange(e)}>
									<Select.Trigger placeholder="select type..." />
									<Select.Content>
										<Select.Item value="OUTPUT">Output</Select.Item>
										<Select.Item value="INPUT">Input</Select.Item>
									</Select.Content>
								</Select.Root>
								<FieldInfo field={field} />
							</div>
						)}
					</form.Field>

					<Flex gap="3" mt="4" justify="end">
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
						>
							{([canSubmit, isSubmitting]) => (
								<Button
									loading={isSubmitting}
									type="submit"
									disabled={!canSubmit || isSubmitting}
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
