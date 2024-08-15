import { Button, Checkbox, Dialog, Flex, Select, Text } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import {
	createAdmissionAction,
	updateAdmissionAction,
} from "../../../actions/config/admission";
import { bedsQueryOptions, wardsQueryOptions } from "../../../actions/queries";
import { FieldInfo } from "../../../components/FieldInfo";
import PendingComponent from "../../../components/PendingComponent";

export function CreateAdmissionForm() {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();
	const { data: wards_data, isPending: isWardPending } =
		useQuery(wardsQueryOptions);

	const { data: bed_data, isPending: isBedPending } =
		useQuery(bedsQueryOptions);

	const form = useForm({
		defaultValues: {
			patient_id: "",
			wards_id: "",
			beds_id: "",
			dischard_date: "",
			is_critical: false,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await createAdmissionAction(value);
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["admissions"] });
		},
	});

	if (isWardPending || isBedPending) return <PendingComponent />;

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger>
				<Button variant="soft">New</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>New Admission</Dialog.Title>
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
						name="wards_id"
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
						name="beds_id"
						validators={{
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
					>
						{(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Bed*</Text>
								<Select.Root>
									<Select.Trigger placeholder="select type..." />
									<Select.Content>
										{bed_data?.beds_data?.map((w) => (
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
						name="is_critical"
						validators={{
							onChange: z.boolean().optional(),
						}}
					>
						{(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Is Critical?</Text>
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
	);
}

export function UpdateAdmissionForm({
	id,
	...values
}: DB["admissions"]["Update"]) {
	const [open, onOpenChange] = useState(false);

	const { data: wards_data, isPending: isWardPending } =
		useQuery(wardsQueryOptions);

	const { data: bed_data, isPending: isBedPending } =
		useQuery(bedsQueryOptions);

	const queryClient = useQueryClient();

	const form = useForm({
		defaultValues: {
			id: id,
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updateAdmissionAction(value);
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["admissions"] });
		},
	});

	if (isWardPending || isBedPending) return <PendingComponent />;

	return (
		<div>
			<Dialog.Root open={open} onOpenChange={onOpenChange}>
				<Dialog.Trigger>
					<Button variant="ghost">
						<Edit size={16} />
					</Button>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Title>Update Admission</Dialog.Title>
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
							name="wards_id"
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
							name="beds_id"
							validators={{
								onChange: z
									.string()
									.min(3, { message: "field must be atleast 3 characters" }),
							}}
						>
							{(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>Bed*</Text>
									<Select.Root>
										<Select.Trigger placeholder="select type..." />
										<Select.Content>
											{bed_data?.beds_data?.map((w) => (
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
							name="is_critical"
							validators={{
								onChange: z.boolean().optional(),
							}}
						>
							{(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>Is Critical?</Text>
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
