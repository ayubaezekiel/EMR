import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import {
	createClinicsAction,
	updateClinicsAction,
} from "../../actions/config/clinics";
import { useState } from "react";
import {
	AlertDialog,
	Button,
	Dialog,
	Flex,
	Spinner,
	Text,
	TextField,
} from "@radix-ui/themes";
import { Edit, Trash } from "lucide-react";
import { FieldInfo } from "../../components/FieldInfo";
import { z } from "zod";
import supabase from "../../supabase/client";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export function CreateClinicsForm() {
	const [open, onOpenChange] = useState(false);
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			name: "",
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await createClinicsAction(value);
			form.reset();
			onOpenChange(false);
			navigate({ to: "/dashboard/config" });
		},
	});

	return (
		<div>
			<Dialog.Root open={open} onOpenChange={onOpenChange}>
				<Dialog.Trigger>
					<Button variant="soft">New</Button>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Title>New Clinic</Dialog.Title>
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

export function UpdateClinicsForm({ id, ...values }: ClinicsType["Update"]) {
	const [open, onOpenChange] = useState(false);
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			id: id,
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updateClinicsAction(value);
			form.reset();
			onOpenChange(false);

			navigate({ to: "/dashboard/config" });
		},
	});

	return (
		<div>
			<Dialog.Root open={open} onOpenChange={onOpenChange}>
				<Dialog.Trigger>
					<Button variant="ghost">
						<Edit size={16} />
					</Button>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Title>Update clinic</Dialog.Title>
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

export function DeleteClinicsForm({ id }: { id: string }) {
	const navigate = useNavigate();
	const form = useForm({
		defaultValues: {
			id: id,
		},
		onSubmit: async ({ value }) => {
			const { error } = await supabase
				.from("clinics")
				.delete()
				.eq("id", value.id);
			if (error) {
				toast.error(error.message);
			} else {
				navigate({ to: "/dashboard/config" });
				toast.success("clinic deleted successfull");
			}
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
				<AlertDialog.Title>Delete Clinic</AlertDialog.Title>
				<AlertDialog.Description size="2">
					Are you sure? This clinic will be parmanently deleted from the
					database.
				</AlertDialog.Description>

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
