import { useForm as useMantineForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import {
	Button,
	Callout,
	Dialog,
	Flex,
	IconButton,
	Select,
	Spinner,
	Text,
	TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { AlertCircle, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import {
	createVitalsAction,
	updateVitalsAction,
} from "../../actions/config/vitals";
import { vitalsQueryOptions } from "../../actions/queries";
import { FieldInfo } from "../../components/FieldInfo";
import { Label } from "../../components/ui/label";
import { getProfile } from "../../lib/utils";
import supabase from "../../supabase/client";

export function CreateVitalsForm() {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm({
		defaultValues: {
			name: "",
			unit: "",
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await createVitalsAction(value);
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["vitals"] });
		},
	});

	return (
		<div>
			<Dialog.Root open={open} onOpenChange={onOpenChange}>
				<Dialog.Trigger>
					<Button variant="soft">New</Button>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Title>New Vitals</Dialog.Title>
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
						<form.Field
							name="unit"
							validators={{
								onChange: z.string().optional(),
							}}
							children={(field) => (
								<label htmlFor={field.name} className="flex flex-col">
									<Text size={"3"}>Unit</Text>
									<TextField.Root
										placeholder="e.g kg, mol etc..."
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

export function UpdateVitalsForm({ id, ...values }: DB["vitals"]["Update"]) {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm({
		defaultValues: {
			id: id,
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updateVitalsAction(value);
			form.reset();
			onOpenChange(false);

			queryClient.invalidateQueries({ queryKey: ["vitals"] });
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
					<Dialog.Title>Update Vitals</Dialog.Title>
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

						<form.Field
							name="unit"
							validators={{
								onChange: z.string().optional(),
							}}
							children={(field) => (
								<label htmlFor={field.name} className="flex flex-col">
									<Text size={"3"}>Unit</Text>
									<TextField.Root
										placeholder="e.g kg, mol etc..."
										name={field.name}
										id={field.name}
										value={field.state.value!}
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

export function CreatePatientVitalsForm({ patientId }: { patientId: string }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { data, isPending } = useQuery(vitalsQueryOptions);

	const queryClient = useQueryClient();

	const [open, onOpenChange] = useState(false);

	const form = useMantineForm({
		mode: "uncontrolled",
		initialValues: {
			patient_id: patientId,
			vitals: [{ name: "", value: "", unit: "", key: randomId() }],
		},
	});

	const fitered_vitals = new Set(data?.vitals_data?.map((v) => v.unit));

	const vitals_data = Array.from(fitered_vitals);

	const fields = form.getValues().vitals.map((item, index) => (
		<Flex key={item.key} gap={"2"} mt={"2"}>
			<div className="flex flex-col gap-1 w-full">
				<Label>Name*</Label>
				<Select.Root
					required
					size={"3"}
					key={form.key(`vitals.${index}.name`)}
					onValueChange={(e) =>
						form.getInputProps(`vitals.${index}.name`).onChange(e)
					}
				>
					<Select.Trigger placeholder="select vitals..." />
					<Select.Content position="popper">
						{data?.vitals_data?.map((v) => (
							<Select.Item key={v.id} value={v.name}>
								{v.name}
							</Select.Item>
						))}
					</Select.Content>
				</Select.Root>
			</div>

			<div className="flex flex-col gap-1">
				<Label>Value*</Label>
				<TextField.Root
					required
					size={"3"}
					style={{ flex: 1 }}
					key={form.key(`vitals.${index}.name`)}
					{...form.getInputProps(`vitals.${index}.value`)}
				/>
			</div>
			{isPending ? (
				<Spinner />
			) : (
				<div className="flex flex-col gap-1 w-40">
					<Label>Unit</Label>
					<Select.Root
						size={"3"}
						key={form.key(`vitals.${index}.unit`)}
						onValueChange={(e) =>
							form.getInputProps(`vitals.${index}.unit`).onChange(e)
						}
					>
						<Select.Trigger placeholder="kg" />
						<Select.Content position="popper">
							{vitals_data.map((v) => (
								<Select.Item value={`${v!.length > 0 ? v : "---"}`}>
									{v!.length < 1 ? "---" : v}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>
				</div>
			)}
			<div className="flex flex-col mt-5">
				<IconButton
					type="button"
					color="red"
					onClick={() => form.removeListItem("vitals", index)}
				>
					<Trash size="1rem" />
				</IconButton>
			</div>
		</Flex>
	));

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger>
				<Button variant="soft" radius="full">
					Record Vitals
				</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Title>Record Vitals</Dialog.Title>
				<form
					onSubmit={form.onSubmit(async (values) => {
						setIsSubmitting(true);
						const p_vitals = values.vitals.map((n) => ({
							name: n.name,
							unit: n.unit,
							value: n.value,
						}));
						const prof = await getProfile();
						const { error } = await supabase
							.from("patient_vitals")
							.insert({
								patient_id: patientId,
								taken_by: `${prof?.id}`,
								vitals: p_vitals,
							})
							.select();

						if (error) {
							toast.error(error.message);
							setIsSubmitting(false);
						} else {
							setIsSubmitting(false);
							onOpenChange(false);
							toast.success("patient vitals recorded successfully");
							queryClient.invalidateQueries({
								queryKey: ["patientVitalsById"],
							});
						}
					})}
				>
					{fields.length < 0 && (
						<Callout.Root color="red">
							<Callout.Icon>
								<AlertCircle />
								<Callout.Text ml={"2"}>Empty</Callout.Text>
							</Callout.Icon>
						</Callout.Root>
					)}

					{fields}

					<Flex justify="end" mt="4">
						<Button
							type="button"
							variant="soft"
							onClick={() =>
								form.insertListItem("vitals", {
									name: "",
									value: "",
									unit: "",
									key: randomId(),
								})
							}
						>
							Add more
						</Button>
					</Flex>
					<Button
						disabled={!form.isValid() || isSubmitting}
						size={"4"}
						loading={isSubmitting}
						type="submit"
					>
						Record
					</Button>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	);
}

export function UpdatePatientVitalsForm({
	id,
	...values
}: DB["patient_vitals"]["Update"]) {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { data, isPending } = useQuery(vitalsQueryOptions);

	const vitals = JSON.parse(JSON.stringify(values.vitals));

	const form = useMantineForm({
		initialValues: {
			patient: values.patient_id,
			id: id,
			vitals: [...vitals],
		},
	});

	const fitered_vitals = new Set(data?.vitals_data?.map((v) => v.unit));

	const vitals_data = Array.from(fitered_vitals);

	const fields = form.getValues().vitals.map((item, index) => (
		<Flex key={item.key} gap={"2"} mt={"2"}>
			<div className="flex flex-col gap-1 w-full">
				<Label>Name*</Label>
				<Select.Root
					required
					size={"3"}
					key={form.key(`vitals.${index}.name`)}
					onValueChange={(e) =>
						form.getInputProps(`vitals.${index}.name`).onChange(e)
					}
				>
					<Select.Trigger placeholder="select vitals..." />
					<Select.Content position="popper">
						{data?.vitals_data?.map((v) => (
							<Select.Item key={v.id} value={v.name}>
								{v.name}
							</Select.Item>
						))}
					</Select.Content>
				</Select.Root>
			</div>

			<div className="flex flex-col gap-1">
				<Label>Value*</Label>
				<TextField.Root
					required
					size={"3"}
					style={{ flex: 1 }}
					key={form.key(`vitals.${index}.name`)}
					{...form.getInputProps(`vitals.${index}.value`)}
				/>
			</div>
			{isPending ? (
				<Spinner />
			) : (
				<div className="flex flex-col gap-1 w-40">
					<Label>Unit</Label>
					<Select.Root
						size={"3"}
						key={form.key(`vitals.${index}.unit`)}
						onValueChange={(e) =>
							form.getInputProps(`vitals.${index}.unit`).onChange(e)
						}
					>
						<Select.Trigger placeholder="kg" />
						<Select.Content position="popper">
							{vitals_data.map((v) => (
								<Select.Item value={`${v!.length > 0 ? v : "---"}`}>
									{v!.length < 1 ? "---" : v}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>
				</div>
			)}
			<div className="flex flex-col mt-5">
				<IconButton
					type="button"
					color="red"
					onClick={() => form.removeListItem("vitals", index)}
				>
					<Trash size="1rem" />
				</IconButton>
			</div>
		</Flex>
	));

	return (
		<div>
			<Dialog.Root open={open} onOpenChange={onOpenChange}>
				<Dialog.Trigger>
					<Button variant="ghost">
						<Edit size={16} />
					</Button>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Title>Update Patient Vitals</Dialog.Title>
					<Dialog.Description size="2" mb="4">
						Fill out the form information
					</Dialog.Description>
					<form
						onSubmit={form.onSubmit(async (values) => {
							setIsSubmitting(true);
							const p_vitals = values.vitals.map((n) => ({
								name: n.name,
								unit: n.unit,
								value: n.value,
							}));
							const prof = await getProfile();
							const { error } = await supabase
								.from("patient_vitals")
								.update({
									patient: values.patient,
									taken_by: `${prof?.id}`,
									vitals: p_vitals,
								})
								.eq("id", `${id}`);

							if (error) {
								toast.error(error.message);
								setIsSubmitting(false);
							} else {
								setIsSubmitting(false);
								onOpenChange(false);
								toast.success("patient vitals updated successfully");
								queryClient.invalidateQueries({
									queryKey: ["patientVitalsById"],
								});
							}
						})}
					>
						{fields.length < 0 && (
							<Callout.Root color="red">
								<Callout.Icon>
									<AlertCircle />
									<Callout.Text ml={"2"}>Empty</Callout.Text>
								</Callout.Icon>
							</Callout.Root>
						)}

						{fields}

						<Flex justify="end" mt="4">
							<Button
								type="button"
								variant="soft"
								onClick={() =>
									form.insertListItem("vitals", {
										name: "",
										value: "",
										unit: "",
										key: randomId(),
									})
								}
							>
								Add more
							</Button>
						</Flex>
						<Button
							disabled={!form.isValid() || isSubmitting}
							loading={isSubmitting}
							size={"4"}
							type="submit"
						>
							Update
						</Button>
					</form>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	);
}
