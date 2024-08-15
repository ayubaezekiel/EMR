import {
	Button,
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
import { useState } from "react";
import { z } from "zod";
import {
	createLabTestAction,
	updateLabTestAction,
} from "../../../actions/config/lab-test";
import {
	labTestCatQueryOptions,
	labTestTempQueryOptions,
} from "../../../actions/queries";
import { FieldInfo } from "../../../components/FieldInfo";
import PendingComponent from "../../../components/PendingComponent";

export function CreateLabTestForm() {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();
	const { data: cat, isPending: isCatPending } = useQuery(
		labTestCatQueryOptions,
	);
	const { data: temp, isPending: isTempPending } = useQuery(
		labTestTempQueryOptions,
	);

	const form = useForm({
		defaultValues: {
			name: "",
			lab_test_category_id: "",
			template_id: "",
			default_price: "",
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await createLabTestAction(value);
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["labTests"] });
		},
	});

	if (isCatPending || isTempPending) return <PendingComponent />;

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger>
				<Button variant="soft">New</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>New Lab Test</Dialog.Title>
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
						name="lab_test_category_id"
						validators={{
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Category*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select a category..." />
									<Select.Content position="popper">
										{cat?.lab_test_categories_data?.map((c) => (
											<Select.Item value={c.id} key={c.id}>
												{c.name}
											</Select.Item>
										))}
									</Select.Content>
								</Select.Root>
								<FieldInfo field={field} />
							</div>
						)}
					/>
					<form.Field
						name="template_id"
						validators={{
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Template*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select a template..." />
									<Select.Content position="popper">
										{temp?.lab_test_template_data?.map((c) => (
											<Select.Item value={c.id} key={c.id}>
												{c.name}
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
							onChange: z
								.string()
								.min(1, { message: "field must not be empty" }),
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
								<Button type="submit" disabled={!canSubmit} size={"4"}>
									{isSubmitting && <Spinner />} Save
								</Button>
							)}
						/>
					</Flex>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	);
}

export function UpdateLabTestForm({
	id,
	...values
}: DB["lab_tests"]["Update"]) {
	const [open, onOpenChange] = useState(false);

	const { data: cat, isPending: isCatPending } = useQuery(
		labTestCatQueryOptions,
	);
	const { data: temp, isPending: isTempPending } = useQuery(
		labTestTempQueryOptions,
	);

	const queryClient = useQueryClient();

	const form = useForm({
		defaultValues: {
			id: id,
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updateLabTestAction(value);
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["labTests"] });
		},
	});

	if (isCatPending || isTempPending) return <PendingComponent />;

	return (
		<div>
			<Dialog.Root open={open} onOpenChange={onOpenChange}>
				<Dialog.Trigger>
					<Button variant="ghost">
						<Edit size={16} />
					</Button>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Title>Update Lab Test</Dialog.Title>
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
							name="lab_test_category_id"
							validators={{
								onChange: z
									.string()
									.min(3, { message: "field must be atleast 3 characters" }),
							}}
							children={(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>Category*</Text>
									<Select.Root
										name={field.name}
										value={field.state.value}
										onValueChange={(e) => field.handleChange(e)}
									>
										<Select.Trigger placeholder="select a category..." />
										<Select.Content position="popper">
											{cat?.lab_test_categories_data?.map((c) => (
												<Select.Item value={c.id} key={c.id}>
													{c.name}
												</Select.Item>
											))}
										</Select.Content>
									</Select.Root>
									<FieldInfo field={field} />
								</div>
							)}
						/>
						<form.Field
							name="template_id"
							validators={{
								onChange: z
									.string()
									.min(3, { message: "field must be atleast 3 characters" }),
							}}
							children={(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>Template*</Text>
									<Select.Root
										name={field.name}
										value={field.state.value}
										onValueChange={(e) => field.handleChange(e)}
									>
										<Select.Trigger placeholder="select a template..." />
										<Select.Content position="popper">
											{temp?.lab_test_template_data?.map((c) => (
												<Select.Item value={c.id} key={c.id}>
													{c.name}
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
								onChange: z
									.string()
									.min(1, { message: "field must not be empty" }),
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
