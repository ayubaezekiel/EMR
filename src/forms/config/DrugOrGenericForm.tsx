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
import { useState } from "react";
import { z } from "zod";

import { FieldInfo } from "../../components/FieldInfo";
import {
	createDrugOrGenericAction,
	updateDrugOrGenericAction,
} from "../../actions/config/drug-or-generic";
import { checkAuth } from "../../lib/utils";
import { drugOrGenericBrandQueryOptions } from "../../actions/queries";
import PendingComponent from "../../components/PendingComponent";

export function CreateDrugOrGeneric() {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();

	const { data, isPending } = useQuery(drugOrGenericBrandQueryOptions);

	const form = useForm({
		defaultValues: {
			name: "",
			default_price: "",
			drug_or_generic_brand_id: "",
			quantity: 0,
			is_consumable: false,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			const user = await checkAuth();
			await createDrugOrGenericAction({ created_by: `${user?.id}`, ...value });
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["drugOrGeneric"] });
		},
	});

	if (isPending) return <PendingComponent />;

	return (
		<div>
			<Dialog.Root open={open} onOpenChange={onOpenChange}>
				<Dialog.Trigger>
					<Button variant="soft">New</Button>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Title>New Drug/generic</Dialog.Title>
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
							name="drug_or_generic_brand_id"
							validators={{
								onChange: z.string().min(1, { message: "required" }),
							}}
							children={(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>Brand*</Text>
									<Select.Root
										name={field.name}
										value={field.state.value}
										onValueChange={(e) => field.handleChange(e)}
									>
										<Select.Trigger placeholder="select branch..." />
										<Select.Content position="popper">
											{data?.drug_or_generic_brand_data?.map((b) => (
												<Select.Item key={b.id} value={b.id}>
													{b.name}
												</Select.Item>
											))}
										</Select.Content>
									</Select.Root>
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
						<div className="flex gap-2 justify-between">
							<form.Field
								name="quantity"
								validators={{
									onChange: z.number(),
								}}
								children={(field) => (
									<label htmlFor={field.name} className="flex flex-col w-[70%]">
										<Text size={"3"}>Quantity*</Text>
										<TextField.Root
											type="number"
											name={field.name}
											id={field.name}
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(Number(e.target.value))
											}
											onBlur={field.handleBlur}
										/>
										<FieldInfo field={field} />
									</label>
								)}
							/>
							<form.Field
								name="is_consumable"
								validators={{
									onChange: z.boolean().optional(),
								}}
								children={(field) => (
									<label
										htmlFor={field.name}
										className="flex items-center gap-2"
									>
										<Text size={"3"}>Is Consumabe?</Text>
										<Checkbox
											name={field.name}
											id={field.name}
											checked={field.state.value!}
											onCheckedChange={(e) => field.handleChange(Boolean(e))}
										/>
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

export function UpdateDrugOrGeneric({
	id,
	...values
}: DB["drug_or_generic"]["Update"]) {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();

	const { data, isPending } = useQuery(drugOrGenericBrandQueryOptions);

	const form = useForm({
		defaultValues: {
			id: id,
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updateDrugOrGenericAction(value);
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["drugOrGeneric"] });
		},
	});
	if (isPending) return <PendingComponent />;

	return (
		<div>
			<Dialog.Root open={open} onOpenChange={onOpenChange}>
				<Dialog.Trigger>
					<Button variant="ghost">
						<Edit size={16} />
					</Button>
				</Dialog.Trigger>

				<Dialog.Content>
					<Dialog.Title>Update Drug/generic</Dialog.Title>
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
							name="drug_or_generic_brand_id"
							validators={{
								onChange: z.string().min(1, { message: "required" }),
							}}
							children={(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>Brand*</Text>
									<Select.Root
										name={field.name}
										value={field.state.value}
										onValueChange={(e) => field.handleChange(e)}
									>
										<Select.Trigger placeholder="select branch..." />
										<Select.Content position="popper">
											{data?.drug_or_generic_brand_data?.map((b) => (
												<Select.Item key={b.id} value={b.id}>
													{b.name}
												</Select.Item>
											))}
										</Select.Content>
									</Select.Root>
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
						<div className="flex gap-2 justify-between">
							<form.Field
								name="quantity"
								validators={{
									onChange: z.number(),
								}}
								children={(field) => (
									<label htmlFor={field.name} className="flex flex-col w-[70%]">
										<Text size={"3"}>Quantity*</Text>
										<TextField.Root
											type="number"
											name={field.name}
											id={field.name}
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(Number(e.target.value))
											}
											onBlur={field.handleBlur}
										/>
										<FieldInfo field={field} />
									</label>
								)}
							/>
							<form.Field
								name="is_consumable"
								validators={{
									onChange: z.boolean().optional(),
								}}
								children={(field) => (
									<label
										htmlFor={field.name}
										className="flex items-center gap-2"
									>
										<Text size={"3"}>Is Consumabe?</Text>
										<Checkbox
											name={field.name}
											id={field.name}
											checked={field.state.value!}
											onCheckedChange={(e) => field.handleChange(Boolean(e))}
										/>
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
