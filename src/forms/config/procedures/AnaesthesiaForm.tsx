import {
	Button,
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
	createAnaesthesiaAction,
	updateAnaesthesiaAction,
} from "../../../actions/config/procedure";
import { anaesthesiaTypeQueryOptions } from "../../../actions/queries";
import { FieldInfo } from "../../../components/FieldInfo";

export function CreateAnaesthesiaForm() {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();

	const { data: anaesthesia_type, isPending: isAnaesthesiaTypePending } =
		useQuery(anaesthesiaTypeQueryOptions);

	const form = useForm({
		defaultValues: {
			name: "",
			anaesthesia_type_id: "",
			default_price: "",
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await createAnaesthesiaAction(value);
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["anaesthesia"] });
		},
	});

	return (
		<div>
			<Dialog.Root open={open} onOpenChange={onOpenChange}>
				<Dialog.Trigger disabled={isAnaesthesiaTypePending}>
					<Button loading={isAnaesthesiaTypePending} variant="soft">
						New
					</Button>
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
							name="anaesthesia_type_id"
							validators={{
								onChange: z.string(),
							}}
							children={(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>Anaesthesia Type*</Text>
									<Select.Root onValueChange={field.handleChange}>
										<Select.Trigger placeholder="select anaesthesia type..." />
										<Select.Content position="popper">
											{anaesthesia_type?.anaesthesia_type_data?.map((c) => (
												<Select.Item value={c.id} key={c.id}>
													{c.title}
												</Select.Item>
											))}
										</Select.Content>
									</Select.Root>
									<FieldInfo field={field} />
								</div>
							)}
						/>

						<form.Field
							name="default_price"
							validators={{
								onChange: z.string().min(1, { message: "required" }),
							}}
							children={(field) => (
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

export function UpdateAnaesthesiaForm({
	id,
	...values
}: DB["anaesthesia"]["Update"]) {
	const [open, onOpenChange] = useState(false);
	const { data: anaesthesia_type, isPending: isAnaesthesiaTypePending } =
		useQuery(anaesthesiaTypeQueryOptions);

	const queryClient = useQueryClient();

	const form = useForm({
		defaultValues: {
			id: id,
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updateAnaesthesiaAction(value);
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["anaesthesia"] });
		},
	});

	return (
		<div>
			<Dialog.Root open={open} onOpenChange={onOpenChange}>
				<Dialog.Trigger disabled={isAnaesthesiaTypePending}>
					<Button variant="ghost" loading={isAnaesthesiaTypePending}>
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
							name="anaesthesia_type_id"
							validators={{
								onChange: z.string(),
							}}
							children={(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>Anaesthesia Type*</Text>
									<Select.Root onValueChange={field.handleChange}>
										<Select.Trigger placeholder="select anaesthesia type..." />
										<Select.Content position="popper">
											{anaesthesia_type?.anaesthesia_type_data?.map((c) => (
												<Select.Item value={c.id} key={c.id}>
													{c.title}
												</Select.Item>
											))}
										</Select.Content>
									</Select.Root>
									<FieldInfo field={field} />
								</div>
							)}
						/>
						<form.Field
							name="default_price"
							validators={{
								onChange: z.string().min(1, { message: "required" }),
							}}
							children={(field) => (
								<label htmlFor={field.name} className="flex flex-col">
									<Text size={"3"}>Default Price*</Text>
									<TextField.Root
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
