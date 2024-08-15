import {
	Button,
	Checkbox,
	Dialog,
	Flex,
	Select,
	Text,
	TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import {
	createBedAction,
	updateBedAction,
} from "../../../actions/config/admission";
import { wardsQueryOptions } from "../../../actions/queries";
import { FieldInfo } from "../../../components/FieldInfo";
import PendingComponent from "../../../components/PendingComponent";

export function CreateBedForm() {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();

	const { data: wards_data, isPending: isWardPending } =
		useQuery(wardsQueryOptions);

	const form = useForm({
		defaultValues: {
			name: "",
			ward_id: "",
			default_price: "",
			is_available: false,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await createBedAction(value);
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["beds"] });
		},
	});

	if (isWardPending) return <PendingComponent />;

	return (
		<div>
			<Dialog.Root open={open} onOpenChange={onOpenChange}>
				<Dialog.Trigger>
					<Button variant="soft">New</Button>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Title>New Anaesthesia</Dialog.Title>
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
							name="default_price"
							validators={{
								onChange: z
									.string()
									.min(3, { message: "field must be atleast 3 characters" }),
							}}
						>
							{(field) => (
								<label htmlFor={field.name} className="flex flex-col">
									<Text size={"3"}>Default Price*</Text>
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
							name="ward_id"
							validators={{
								onChange: z
									.string()
									.min(3, { message: "field must be atleast 3 characters" }),
							}}
						>
							{(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>Ward*</Text>
									<Select.Root>
										<Select.Trigger placeholder="select type..." />
										<Select.Content>
											{wards_data?.wards_data?.map((w) => (
												<Select.Item key={w.id} value={w.id}>
													{w.name}
												</Select.Item>
											))}
										</Select.Content>
									</Select.Root>
									<FieldInfo field={field} />
								</div>
							)}
						</form.Field>
						<form.Field
							name="is_available"
							validators={{
								onChange: z.boolean().optional(),
							}}
						>
							{(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>Is Available?</Text>
									<Checkbox
										name={field.name}
										id={field.name}
										checked={field.state.value}
										onCheckedChange={(e) => field.handleChange(Boolean(e))}
										onBlur={field.handleBlur}
									/>
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
		</div>
	);
}

export function UpdateBedForm({ id, ...values }: DB["beds"]["Update"]) {
	const [open, onOpenChange] = useState(false);
	const { data: wards_data, isPending: isWardPending } =
		useQuery(wardsQueryOptions);

	const queryClient = useQueryClient();

	const form = useForm({
		defaultValues: {
			id: id,
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updateBedAction(value);
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["beds"] });
		},
	});

	if (isWardPending) return <PendingComponent />;

	return (
		<div>
			<Dialog.Root open={open} onOpenChange={onOpenChange}>
				<Dialog.Trigger>
					<Button variant="ghost">
						<Edit size={16} />
					</Button>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Title>Update Anaesthesia</Dialog.Title>
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
							name="default_price"
							validators={{
								onChange: z
									.string()
									.min(3, { message: "field must be atleast 3 characters" }),
							}}
						>
							{(field) => (
								<label htmlFor={field.name} className="flex flex-col">
									<Text size={"3"}>Default Price*</Text>
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
							name="ward_id"
							validators={{
								onChange: z
									.string()
									.min(3, { message: "field must be atleast 3 characters" }),
							}}
						>
							{(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>Ward*</Text>
									<Select.Root>
										<Select.Trigger placeholder="select type..." />
										<Select.Content>
											{wards_data?.wards_data?.map((w) => (
												<Select.Item key={w.id} value={w.id}>
													{w.name}
												</Select.Item>
											))}
										</Select.Content>
									</Select.Root>
									<FieldInfo field={field} />
								</div>
							)}
						</form.Field>
						<form.Field
							name="is_available"
							validators={{
								onChange: z.boolean().optional(),
							}}
						>
							{(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>Is Available?</Text>
									<Checkbox
										name={field.name}
										id={field.name}
										checked={Boolean(field.state.value)}
										onCheckedChange={(e) => field.handleChange(Boolean(e))}
										onBlur={field.handleBlur}
									/>
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
		</div>
	);
}
