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
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import {
	createAppointmentAction,
	updateAppointmentAction,
} from "../actions/appointment";
import {
	useAppointmentsTypesQuery,
	useClinicsQuery,
	usePatientsQuery,
} from "../actions/queries";
import { FieldInfo } from "../components/FieldInfo";
import { checkAuth } from "../lib/utils";

export function CreateAppointmentForm() {
	const { data: appointment_types, isPending } = useAppointmentsTypesQuery();
	const { data: clinics, isPending: isClinicsPending } = useClinicsQuery();

	const { data: patients, isPending: isPatientsPending } = usePatientsQuery();
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm({
		defaultValues: {
			appointment_types_id: "",
			clinics_id: "",
			start_date: "",
			end_date: "",
			patients_id: "",
			follow_up: false,
			is_all_day: false,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			const user = await checkAuth();
			await createAppointmentAction({
				clinics_id: value.clinics_id,
				patients_id: value.patients_id,
				appointment_types_id: value.appointment_types_id,
				follow_up: value.follow_up,
				is_all_day: value.is_all_day,
				duration: `[${value.start_date},${value.end_date})`,
				created_by: `${user?.id}`,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["appointments"] });
		},
	});

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger disabled={isPending}>
				<Button size={"4"} loading={isClinicsPending || isPatientsPending}>
					New Patient Appointment
				</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>Schedule Patient Appointment</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					Fill out the form
				</Dialog.Description>

				<form
					onSubmit={(e) => {
						e.stopPropagation();
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<div className="flex md:gap-4 md:flex-row flex-col gap-2">
						<form.Field
							name="start_date"
							validators={{
								onChange: z.string(),
							}}
						>
							{(field) => (
								<label className="flex flex-col">
									<Text size={"3"}>Starting*</Text>
									<TextField.Root
										name={field.name}
										value={field.state.value}
										size={"3"}
										type="datetime-local"
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									<FieldInfo field={field} />
								</label>
							)}
						</form.Field>
						<form.Field
							name="end_date"
							validators={{
								onChangeListenTo: ["start_date"],
								onChange: ({ value, fieldApi }) => {
									if (value == fieldApi.form.getFieldValue("start_date")) {
										return "End date must be greater than start date";
									}
									return undefined;
								},
							}}
						>
							{(field) => (
								<label className="flex flex-col">
									<Text size={"3"}>Ending*</Text>
									<TextField.Root
										name={field.name}
										value={field.state.value}
										size={"3"}
										type="datetime-local"
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									<FieldInfo field={field} />
								</label>
							)}
						</form.Field>
					</div>
					<form.Field
						name="patients_id"
						validators={{
							onChange: z.string(),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Patient*</Text>
								<Select.Root
									size={"3"}
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select patient..." />
									<Select.Content position="popper">
										{patients?.patient_data?.map((p) => (
											<Select.Item key={p.id} value={p.id}>
												{p.first_name} {p.middle_name} {p.last_name} - [
												{p.id.slice(0, 8).toUpperCase()}]
											</Select.Item>
										))}
									</Select.Content>
								</Select.Root>
								<FieldInfo field={field} />
							</div>
						)}
					/>
					<form.Field
						name="appointment_types_id"
						validators={{
							onChange: z.string(),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Appointment Type*</Text>
								<Select.Root
									size={"3"}
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select appointment type..." />
									<Select.Content position="popper">
										{appointment_types?.appointment_type_data?.map((a) => (
											<Select.Item key={a.id} value={a.id}>
												{a.name}
											</Select.Item>
										))}
									</Select.Content>
								</Select.Root>
								<FieldInfo field={field} />
							</div>
						)}
					/>
					<form.Field
						name="clinics_id"
						validators={{
							onChange: z.string(),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Clinic*</Text>
								<Select.Root
									size={"3"}
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select clinic..." />
									<Select.Content position="popper">
										{clinics?.clinics_data?.map((c) => (
											<Select.Item key={c.id} value={c.id}>
												{c.name}
											</Select.Item>
										))}
									</Select.Content>
								</Select.Root>
								<FieldInfo field={field} />
							</div>
						)}
					/>

					<div className="flex gap-4 items-center mt-4">
						<form.Field
							name="follow_up"
							children={(field) => (
								<label htmlFor={field.name} className="flex gap-2 items-center">
									<Text size={"3"}>Follow Up?</Text>
									<Checkbox
										size={"3"}
										name={field.name}
										id={field.name}
										checked={Boolean(field.state.value)}
										onCheckedChange={(e) => {
											field.handleChange(Boolean(e));
										}}
										onBlur={field.handleBlur}
									/>
									<FieldInfo field={field} />
								</label>
							)}
						/>
						<form.Field
							name="is_all_day"
							children={(field) => (
								<label htmlFor={field.name} className="flex gap-2 items-center">
									<Text size={"3"}>Is all day?</Text>
									<Checkbox
										defaultChecked={field.state.value}
										size={"3"}
										name={field.name}
										id={field.name}
										checked={Boolean(field.state.value)}
										onCheckedChange={(e) => {
											field.handleChange(Boolean(e));
										}}
										onBlur={field.handleBlur}
									/>
									<FieldInfo field={field} />
								</label>
							)}
						/>
					</div>
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

export function UpdateAppointmentForm({
	...values
}: DB["appointments"]["Update"]) {
	const { data: appointment_types, isPending } = useAppointmentsTypesQuery();
	const { data: clinics, isPending: isClinicsPending } = useClinicsQuery();

	const { data: patients, isPending: isPatientsPending } = usePatientsQuery();

	const queryClient = useQueryClient();

	const [open, onOpenChange] = useState(false);

	const start = new Date(`${values.duration}`.slice(2, 20)).toLocaleString();
	const end = new Date(`${values.duration}`.slice(24, 43)).toLocaleString();

	const form = useForm({
		defaultValues: {
			clinics_id: values.clinics_id,
			created_by: values.created_by,
			follow_up: values.follow_up,
			is_all_day: values.follow_up,
			patients_id: values.patients_id,
			appointment_types_id: values.appointment_types_id,
			start_date: start,
			end_date: end,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			const user = await checkAuth();
			await updateAppointmentAction({
				...value,
				duration: `[${value.start_date},${value.end_date})`,
				created_by: `${user?.id}`,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["appointments"] });
		},
	});

	const appointment_type_data = appointment_types?.appointment_type_data;
	const clinics_data = clinics?.clinics_data;
	const patient_data = patients?.patient_data;

	return (
		<div>
			<Dialog.Root open={open} onOpenChange={onOpenChange}>
				<Dialog.Trigger disabled={isPending}>
					<Button
						loading={isClinicsPending || isPatientsPending}
						size={"1"}
						color="red"
						variant="ghost"
					>
						<Edit />
					</Button>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Title>Update Patient Appointment</Dialog.Title>
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
						<div className="flex md:gap-4 md:flex-row flex-col gap-2">
							<form.Field
								name="start_date"
								validators={{
									onChange: z.string().datetime(),
								}}
							>
								{(field) => (
									<label className="flex flex-col">
										<Text size={"3"}>Starting*</Text>
										<TextField.Root
											name={field.name}
											value={field.state.value}
											size={"3"}
											type="datetime-local"
											onChange={(e) => field.handleChange(e.target.value)}
										/>
									</label>
								)}
							</form.Field>
							<form.Field
								name="end_date"
								validators={{
									onChangeListenTo: ["start_date"],
									onChange: ({ value, fieldApi }) => {
										if (value == fieldApi.form.getFieldValue("start_date")) {
											return "End date must be greater than start date";
										}
										return undefined;
									},
								}}
							>
								{(field) => (
									<label className="flex flex-col">
										<Text size={"3"}>Ending*</Text>
										<TextField.Root
											name={field.name}
											value={field.state.value}
											size={"3"}
											type="datetime-local"
											onChange={(e) => field.handleChange(e.target.value)}
										/>
										<FieldInfo field={field} />
									</label>
								)}
							</form.Field>
						</div>
						<form.Field
							name="patients_id"
							validators={{
								onChange: z.string(),
							}}
							children={(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>Patient*</Text>
									<Select.Root
										size={"3"}
										name={field.name}
										value={field.state.value}
										onValueChange={(e) => field.handleChange(e)}
									>
										<Select.Trigger placeholder="select patient..." />
										<Select.Content position="popper">
											{patient_data?.map((p) => (
												<Select.Item key={p.id} value={p.id}>
													{p.first_name} {p.middle_name} {p.last_name} - [
													{p.id.slice(0, 8).toUpperCase()}]
												</Select.Item>
											))}
										</Select.Content>
									</Select.Root>
									<FieldInfo field={field} />
								</div>
							)}
						/>
						<form.Field
							name="appointment_types_id"
							validators={{
								onChange: z.string(),
							}}
							children={(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>Appointment Type*</Text>
									<Select.Root
										size={"3"}
										name={field.name}
										value={field.state.value!}
										onValueChange={(e) => field.handleChange(e)}
									>
										<Select.Trigger placeholder="select appointment type..." />
										<Select.Content position="popper">
											{appointment_type_data?.map((a) => (
												<Select.Item key={a.id} value={a.id}>
													{a.name}
												</Select.Item>
											))}
										</Select.Content>
									</Select.Root>
									<FieldInfo field={field} />
								</div>
							)}
						/>
						<form.Field
							name="clinics_id"
							validators={{
								onChange: z.string(),
							}}
							children={(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>Clinic*</Text>
									<Select.Root
										size={"3"}
										name={field.name}
										value={field.state.value}
										onValueChange={(e) => field.handleChange(e)}
									>
										<Select.Trigger placeholder="select clinic..." />
										<Select.Content position="popper">
											{clinics_data?.map((c) => (
												<Select.Item key={c.id} value={c.id}>
													{c.name}
												</Select.Item>
											))}
										</Select.Content>
									</Select.Root>
									<FieldInfo field={field} />
								</div>
							)}
						/>

						<div className="flex gap-4 items-center mt-4">
							<form.Field
								name="follow_up"
								children={(field) => (
									<label
										htmlFor={field.name}
										className="flex gap-2 items-center"
									>
										<Text size={"3"}>Follow Up?</Text>
										<Checkbox
											size={"3"}
											name={field.name}
											id={field.name}
											checked={Boolean(field.state.value)}
											onCheckedChange={(e) => {
												field.handleChange(Boolean(e));
											}}
											onBlur={field.handleBlur}
										/>
										<FieldInfo field={field} />
									</label>
								)}
							/>
							<form.Field
								name="is_all_day"
								children={(field) => (
									<label
										htmlFor={field.name}
										className="flex gap-2 items-center"
									>
										<Text size={"3"}>Is all day?</Text>
										<Checkbox
											defaultChecked={field.state.value!}
											size={"3"}
											name={field.name}
											id={field.name}
											checked={Boolean(field.state.value)}
											onCheckedChange={(e) => {
												field.handleChange(Boolean(e));
											}}
											onBlur={field.handleBlur}
										/>
										<FieldInfo field={field} />
									</label>
								)}
							/>
						</div>
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
