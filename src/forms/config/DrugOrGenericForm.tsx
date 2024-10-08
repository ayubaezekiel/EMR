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

import { useDrugOrGenericBrandQuery } from "@/actions/queries";
import { useProfile, useQuantityType } from "@/lib/hooks";
import {
	createDrugOrGenericAction,
	updateDrugOrGenericAction,
} from "../../actions/config/drug-or-generic";
import { FieldInfo } from "../../components/FieldInfo";

export function CreateDrugOrGeneric() {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();
	const { isProfilePending, profile_data } = useProfile();
	const { isQuantityTypePending, quantity_type_data } = useQuantityType();

	const { data, isPending } = useDrugOrGenericBrandQuery();

	const form = useForm({
		defaultValues: {
			name: "",
			default_price: "",
			drug_or_generic_brand_id: "",
			quantity: 1,
			quantity_type_id: "",
			total_quantity: 1,
			is_consumable: false,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await createDrugOrGenericAction({
				...value,
				created_by: `${profile_data?.id}`,
				branch_id: `${profile_data?.branch_id}`,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["drugOrGeneric"] });
		},
	});

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger
				disabled={isPending || isQuantityTypePending || isProfilePending}
			>
				<Button
					variant="soft"
					loading={isPending || isQuantityTypePending || isProfilePending}
				>
					New
				</Button>
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
									size={"3"}
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
						name="quantity_type_id"
						validators={{
							onChange: z.string().min(1, { message: "required" }),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Quantity Type*</Text>
								<Select.Root
									size={"3"}
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select quantity type..." />
									<Select.Content position="popper">
										{quantity_type_data?.map((b) => (
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
						name="drug_or_generic_brand_id"
						validators={{
							onChange: z.string().min(1, { message: "required" }),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Brand*</Text>
								<Select.Root
									size={"3"}
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select brand..." />
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
									size={"3"}
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
							name="total_quantity"
							validators={{
								onChange: z.number(),
							}}
							children={(field) => (
								<label htmlFor={field.name} className="flex flex-col">
									<Text size={"3"}>Total Quantity*</Text>
									<TextField.Root
										size={"3"}
										type="number"
										name={field.name}
										id={field.name}
										value={field.state.value}
										onChange={(e) => field.handleChange(Number(e.target.value))}
										onBlur={field.handleBlur}
									/>
									<FieldInfo field={field} />
								</label>
							)}
						/>
						<form.Field
							name="quantity"
							validators={{
								onChangeListenTo: ["total_quantity"],
								onChange: ({ value, fieldApi }) => {
									if (value > fieldApi.form.getFieldValue("total_quantity")) {
										return "total quantity can not be less than quantity";
									}
									return undefined;
								},
							}}
							children={(field) => (
								<label htmlFor={field.name} className="flex flex-col">
									<Text size={"3"}>Quantity For Sale*</Text>
									<TextField.Root
										size={"3"}
										type="number"
										name={field.name}
										id={field.name}
										value={field.state.value}
										onChange={(e) => field.handleChange(Number(e.target.value))}
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
								<label htmlFor={field.name} className="flex items-center gap-2">
									<Text size={"1"}>Is Consumable?</Text>
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
	);
}

export function UpdateDrugOrGeneric({
	...values
}: DB["drug_or_generic"]["Update"]) {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();
	const { isProfilePending, profile_data } = useProfile();
	const { isQuantityTypePending, quantity_type_data } = useQuantityType();

	const { data, isPending } = useDrugOrGenericBrandQuery();

	const form = useForm({
		defaultValues: {
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updateDrugOrGenericAction({
				...value,
				created_by: `${profile_data?.id}`,
				branch_id: `${profile_data?.branch_id}`,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["drugOrGeneric"] });
		},
	});

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger
				disabled={isPending || isQuantityTypePending || isProfilePending}
			>
				<Button
					variant="ghost"
					loading={isPending || isQuantityTypePending || isProfilePending}
				>
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
									size={"3"}
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
						name="quantity_type_id"
						validators={{
							onChange: z.string().min(1, { message: "required" }),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Quantity Type*</Text>
								<Select.Root
									size={"3"}
									name={field.name}
									value={field.state.value!}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select quantity type..." />
									<Select.Content position="popper">
										{quantity_type_data?.map((b) => (
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
						name="drug_or_generic_brand_id"
						validators={{
							onChange: z.string().min(1, { message: "required" }),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Brand*</Text>
								<Select.Root
									size={"3"}
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select brand..." />
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
									size={"3"}
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
							name="total_quantity"
							validators={{
								onChange: z.number(),
							}}
							children={(field) => (
								<label htmlFor={field.name} className="flex flex-col">
									<Text size={"3"}>Total Quantity*</Text>
									<TextField.Root
										size={"3"}
										type="number"
										name={field.name}
										id={field.name}
										value={field.state.value!}
										onChange={(e) => field.handleChange(Number(e.target.value))}
										onBlur={field.handleBlur}
									/>
									<FieldInfo field={field} />
								</label>
							)}
						/>
						<form.Field
							name="quantity"
							validators={{
								onChangeListenTo: ["total_quantity"],
								onChange: ({ value, fieldApi }) => {
									if (value! > fieldApi.form.getFieldValue("total_quantity")!) {
										return "total quantity can not be less than quantity";
									}
									return undefined;
								},
							}}
							children={(field) => (
								<label htmlFor={field.name} className="flex flex-col">
									<Text size={"3"}>Quantity For Sale*</Text>
									<TextField.Root
										size={"3"}
										type="number"
										name={field.name}
										id={field.name}
										value={field.state.value}
										onChange={(e) => field.handleChange(Number(e.target.value))}
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
								<label htmlFor={field.name} className="flex items-center gap-2">
									<Text size={"1"}>Is Consumable?</Text>
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
	);
}
