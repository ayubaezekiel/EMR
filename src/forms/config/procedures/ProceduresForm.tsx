import {
	Button,
	Dialog,
	Flex,
	Select,
	Switch,
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
	createProcedureAction,
	updateProcedureAction,
} from "../../../actions/config/procedure";
import {
	useAnaesthesiaQuery,
	useProcedureCatQuery,
	useTheatreQuery,
} from "../../../actions/queries";
import { FieldInfo } from "../../../components/FieldInfo";
import { useProfile } from "@/lib/hooks";

export function CreateProceduresForm() {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();
	const { isProfilePending, profile_data } = useProfile();
	const { data: procedure_cat, isPending: isProcedureCatPending } =
		useProcedureCatQuery();
	const { data: anaesthesia, isPending: isAnaesthesiaPending } =
		useAnaesthesiaQuery();
	const { data: theatre, isPending: isTheatrePending } = useTheatreQuery();

	const form = useForm({
		defaultValues: {
			name: "",
			anaesthesia_id: "",
			procedure_category_id: "",
			is_theatre: false,
			procedure_price: "",
			surgeon_price: "",
			theatre_id: "",
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await createProcedureAction({
				...value,
				branch_id: `${profile_data?.branch_id}`,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["procedure"] });
		},
	});

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger
				disabled={
					isProcedureCatPending ||
					isAnaesthesiaPending ||
					isTheatrePending ||
					isProfilePending
				}
			>
				<Button
					variant="soft"
					loading={
						isProcedureCatPending ||
						isAnaesthesiaPending ||
						isTheatrePending ||
						isProfilePending
					}
				>
					New
				</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>New Procedure</Dialog.Title>
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
						name="procedure_price"
						validators={{
							onChange: z.string().min(1, { message: "required" }),
						}}
						children={(field) => (
							<label htmlFor={field.name} className="flex flex-col">
								<Text size={"3"}>Procedure Price*</Text>
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
						name="procedure_category_id"
						validators={{
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Procedure Category*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select a category..." />
									<Select.Content position="popper">
										{procedure_cat?.procedure_categories_data?.map((c) => (
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
						name="anaesthesia_id"
						validators={{
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Anaesthesia*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select a category..." />
									<Select.Content position="popper">
										{anaesthesia?.anaesthesia_data?.map((c) => (
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
						name="theatre_id"
						validators={{
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Theatre*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select a category..." />
									<Select.Content position="popper">
										{theatre?.theatre_data?.map((c) => (
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
					<div className="flex justify-between mt-3">
						<form.Field
							name="surgeon_price"
							validators={{
								onChange: z.string().min(1, { message: "required" }),
							}}
							children={(field) => (
								<label htmlFor={field.name} className="flex flex-col">
									<Text size={"3"}>Surgeon Price*</Text>
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
							name="is_theatre"
							validators={{
								onChange: z.boolean().optional(),
							}}
							children={(field) => (
								<div className="flex items-center gap-2">
									<Text size={"3"}>Has Theatre</Text>
									<Switch
										name={field.name}
										id={field.name}
										checked={field.state.value}
										onCheckedChange={(e) => field.handleChange(e)}
									/>
									<FieldInfo field={field} />
								</div>
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

export function UpdateProceduresForm({ ...values }: DB["procedure"]["Update"]) {
	const [open, onOpenChange] = useState(false);

	const { data: procedure_cat, isPending: isProcedureCatPending } =
		useProcedureCatQuery();

	const { data: anaesthesia, isPending: isAnaesthesiaPending } =
		useAnaesthesiaQuery();

	const { data: theatre, isPending: isTheatrePending } = useTheatreQuery();

	const queryClient = useQueryClient();
	const { isProfilePending, profile_data } = useProfile();

	const form = useForm({
		defaultValues: {
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updateProcedureAction({
				...value,
				branch_id: `${profile_data?.branch_id}`,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["procedure"] });
		},
	});

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger
				disabled={
					isProcedureCatPending ||
					isAnaesthesiaPending ||
					isTheatrePending ||
					isProfilePending
				}
			>
				<Button
					variant="ghost"
					loading={
						isProcedureCatPending ||
						isAnaesthesiaPending ||
						isTheatrePending ||
						isProfilePending
					}
				>
					<Edit size={16} />
				</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>Update Procedure</Dialog.Title>
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
						name="procedure_price"
						validators={{
							onChange: z.string().min(1, { message: "required" }),
						}}
						children={(field) => (
							<label htmlFor={field.name} className="flex flex-col">
								<Text size={"3"}>Procedure Price*</Text>
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
					<form.Field
						name="procedure_category_id"
						validators={{
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Procedure Category*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select a category..." />
									<Select.Content position="popper">
										{procedure_cat?.procedure_categories_data?.map((c) => (
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
						name="anaesthesia_id"
						validators={{
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Anaesthesia*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select a category..." />
									<Select.Content position="popper">
										{anaesthesia?.anaesthesia_data?.map((c) => (
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
						name="theatre_id"
						validators={{
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Theatre*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value!}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select a category..." />
									<Select.Content position="popper">
										{theatre?.theatre_data?.map((c) => (
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

					<div className="flex justify-between mt-3">
						<form.Field
							name="surgeon_price"
							validators={{
								onChange: z.string().min(1, { message: "required" }),
							}}
							children={(field) => (
								<label htmlFor={field.name} className="flex flex-col">
									<Text size={"3"}>Surgeon Price*</Text>
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
						<form.Field
							name="is_theatre"
							validators={{
								onChange: z.boolean().optional(),
							}}
							children={(field) => (
								<div className="flex items-center gap-2">
									<Text size={"3"}>Has Theatre</Text>
									<Switch
										name={field.name}
										id={field.name}
										checked={field.state.value!}
										onCheckedChange={(e) => field.handleChange(e)}
									/>
									<FieldInfo field={field} />
								</div>
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
