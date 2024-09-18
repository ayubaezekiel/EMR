import {
	Button,
	Checkbox,
	Dialog,
	Flex,
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
	createPaymentMethodAction,
	updatePaymentMethodAction,
} from "../../actions/config/payment-method";
import { FieldInfo } from "../../components/FieldInfo";
import { useProfile } from "@/lib/hooks";

export function CreatePaymentMethodForm() {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();
	const { isProfilePending, profile_data } = useProfile();

	const form = useForm({
		defaultValues: {
			name: "",
			allow_only_financial_admin: false,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await createPaymentMethodAction({
				...value,
				branch_id: `${profile_data?.branch_id}`,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["paymentMethod"] });
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
				<Dialog.Title>New Payment Method</Dialog.Title>
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
						children={(field) => (
							<label htmlFor={field.name}>
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

					<form.Field
						name="allow_only_financial_admin"
						children={(field) => (
							<label
								htmlFor={field.name}
								className="flex gap-2 items-center mt-4"
							>
								<Text size={"3"}>Allow only financial admin?</Text>
								<Checkbox
									name={field.name}
									id={field.name}
									checked={field.state.value}
									onCheckedChange={(e) => field.handleChange(Boolean(e))}
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

export function UpdatePaymentMethodForm({
	...values
}: DB["payment_methods"]["Update"]) {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();
	const { isProfilePending, profile_data } = useProfile();

	const form = useForm({
		defaultValues: {
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updatePaymentMethodAction({
				...value,
				branch_id: `${profile_data?.branch_id}`,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["paymentMethod"] });
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
				<Dialog.Title>Update Payment Method</Dialog.Title>
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
						children={(field) => (
							<label htmlFor={field.name}>
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
					<form.Field
						name="allow_only_financial_admin"
						children={(field) => (
							<label
								htmlFor={field.name}
								className="flex gap-2 items-center mt-4"
							>
								<Text size={"3"}>Allow only financial admin?</Text>
								<Checkbox
									name={field.name}
									id={field.name}
									checked={field.state.value!}
									onCheckedChange={(e) => field.handleChange(Boolean(e))}
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
