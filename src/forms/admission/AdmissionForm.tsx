import {
	Button,
	Checkbox,
	Dialog,
	Flex,
	Select,
	Spinner,
	Text,
	TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import {
	createAdmissionAction,
	updateAdmissionAction,
} from "../../actions/config/admission";
import {
	bedsQueryOptions,
	patientsQueryOptions,
	wardsQueryOptions,
} from "../../actions/queries";
import { FieldInfo } from "../../components/FieldInfo";
import { useProfile } from "../../lib/hooks";

export function CreateAdmissionForm() {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();

	const { data: wards_data, isPending: isWardPending } =
		useQuery(wardsQueryOptions);
	const { isProfilePending, profile_data } = useProfile();
	const { data: bed_data, isPending: isBedPending } =
		useQuery(bedsQueryOptions);
	const { data: patient_data, isPending: isPatientPending } =
		useQuery(patientsQueryOptions);

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
			await createAdmissionAction({
				admitted_by: `${profile_data?.id}`,
				...value,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["admissions"] });
		},
	});

	const filtered_beds = useMemo(
		() => bed_data?.beds_data?.filter((b) => b.is_available),
		[bed_data?.beds_data],
	);

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger disabled={isProfilePending}>
				<Button size={"4"} loading={isProfilePending}>
					Admit Patient
				</Button>
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
					<form.Field name="dischard_date">
						{(field) => (
							<label htmlFor={field.name} className="flex flex-col">
								<Text size={"3"}>Dischard Date*</Text>
								<TextField.Root
									required
									size={"3"}
									name={field.name}
									type="date"
									id={field.name}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
								/>
								<FieldInfo field={field} />
							</label>
						)}
					</form.Field>
					{isPatientPending ? (
						<Spinner />
					) : (
						<form.Field
							name="patient_id"
							validators={{
								onChange: z
									.string()
									.min(3, { message: "field must be atleast 3 characters" }),
							}}
						>
							{(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>Patient*</Text>
									<Select.Root
										size={"3"}
										onValueChange={(e) => field.handleChange(e)}
									>
										<Select.Trigger placeholder="select ward..." />
										<Select.Content position="popper">
											{patient_data?.patient_data?.map((w) => (
												<Select.Item key={w.id} value={w.id}>
													{w.first_name} {w.middle_name} {w.last_name} - [
													{w.id.slice(0, 8).toUpperCase()}]
												</Select.Item>
											))}
										</Select.Content>
									</Select.Root>
									<FieldInfo field={field} />
								</div>
							)}
						</form.Field>
					)}
					{isWardPending ? (
						<Spinner />
					) : (
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
									<Select.Root
										size={"3"}
										onValueChange={(e) => field.handleChange(e)}
									>
										<Select.Trigger placeholder="select ward..." />
										<Select.Content position="popper">
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
					)}
					{isBedPending ? (
						<Spinner />
					) : (
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
									<Select.Root
										size={"3"}
										onValueChange={(e) => field.handleChange(e)}
									>
										<Select.Trigger placeholder="select bed..." />
										<Select.Content position="popper">
											{filtered_beds?.map((w) => (
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
					)}

					<form.Field
						name="is_critical"
						validators={{
							onChange: z.boolean().optional(),
						}}
					>
						{(field) => (
							<div className="flex gap-2 items-center mt-4">
								<Text size={"3"}>Is critical?</Text>
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
	const { isProfilePending, profile_data } = useProfile();
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
			const { ...values } = value;
			await updateAdmissionAction({
				admitted_by: `${profile_data?.id}`,
				...values,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["admissions"] });
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
						<form.Field name="dischard_date">
							{(field) => (
								<label htmlFor={field.name} className="flex flex-col">
									<Text size={"3"}>Dischard Date*</Text>
									<TextField.Root
										required
										size={"3"}
										name={field.name}
										type="date"
										id={field.name}
										value={field.state.value!}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
									/>
									<FieldInfo field={field} />
								</label>
							)}
						</form.Field>

						{isWardPending ? (
							<Spinner />
						) : (
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
										<Select.Root
											size={"3"}
											onValueChange={(e) => field.handleChange(e)}
										>
											<Select.Trigger placeholder="select ward..." />
											<Select.Content position="popper">
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
						)}
						{isBedPending ? (
							<Spinner />
						) : (
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
										<Select.Root
											size={"3"}
											onValueChange={(e) => field.handleChange(e)}
										>
											<Select.Trigger placeholder="select bed..." />
											<Select.Content position="popper">
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
						)}

						<form.Field
							name="is_critical"
							validators={{
								onChange: z.boolean().optional(),
							}}
						>
							{(field) => (
								<div className="flex gap-2 items-center mt-4">
									<Text size={"3"}>Is critical?</Text>
									<Checkbox
										name={field.name}
										id={field.name}
										checked={field.state.value!}
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
