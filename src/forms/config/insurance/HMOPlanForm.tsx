import {
	Button,
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
	createHMOPlanAction,
	updateHMOPlanAction,
} from "../../../actions/config/insurance";
import {
	useBranchQuery,
	useHmoCompaniesQuery,
	useHmoGroupsQuery,
} from "../../../actions/queries";
import { FieldInfo } from "../../../components/FieldInfo";
import { useProfile } from "@/lib/hooks";

export function CreateHMOPlanForm() {
	const [open, onOpenChange] = useState(false);
	const queryClient = useQueryClient();

	const { data: hmo_companies, isPending: isHMOCompaniesPending } =
		useHmoCompaniesQuery();

	const { data: branch, isPending: isBranchPending } = useBranchQuery();
	const { isProfilePending, profile_data } = useProfile();
	const { data: hmo_groups, isPending: isHMOGroupPending } =
		useHmoGroupsQuery();

	const form = useForm({
		defaultValues: {
			name: "",
			enrolment_amount: "",
			hmo_companies_id: "",
			hmo_group_id: "",
			max_number_of_beneficiaries: "",
			sign_up_amount: "",
			branch_id: "",
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await createHMOPlanAction({
				...value,
				branch_id: `${profile_data?.branch_id}`,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["hmoPlans"] });
		},
	});

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger
				disabled={
					isBranchPending ||
					isHMOCompaniesPending ||
					isHMOGroupPending ||
					isProfilePending
				}
			>
				<Button
					loading={
						isBranchPending ||
						isHMOCompaniesPending ||
						isHMOGroupPending ||
						isProfilePending
					}
					variant="soft"
				>
					New
				</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>New HMO Plan</Dialog.Title>
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
						name="branch_id"
						validators={{
							onChange: z.string(),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Branch*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select a branch..." />
									<Select.Content position="popper">
										{branch?.branch_data?.map((b) => (
											<Select.Item key={b.id} value={b.id}>
												{b.name}
											</Select.Item>
										))}
									</Select.Content>
								</Select.Root>
								<FieldInfo field={field} />
							</div>
						)}
					/>
					<form.Field
						name="hmo_companies_id"
						validators={{
							onChange: z.string(),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>HMO Company*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select a company..." />
									<Select.Content position="popper">
										{hmo_companies?.hmo_companies_data?.map((c) => (
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
					<form.Field
						name="hmo_group_id"
						validators={{
							onChange: z.string(),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Group*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select a group..." />
									<Select.Content position="popper">
										{hmo_groups?.hmo_group_data?.map((g) => (
											<Select.Item key={g.id} value={g.id}>
												{g.name}
											</Select.Item>
										))}
									</Select.Content>
								</Select.Root>
								<FieldInfo field={field} />
							</div>
						)}
					/>

					<form.Field
						name="enrolment_amount"
						validators={{
							onChange: z
								.string()
								.min(1, { message: "field must be atleast 1 characters" }),
						}}
						children={(field) => (
							<label htmlFor={field.name} className="flex flex-col">
								<Text size={"3"}>Erollment Amount*</Text>
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
						name="sign_up_amount"
						validators={{
							onChange: z
								.string()
								.min(1, { message: "field must be atleast 1 characters" }),
						}}
						children={(field) => (
							<label htmlFor={field.name} className="flex flex-col">
								<Text size={"3"}>Signup Ammount*</Text>
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
						name="max_number_of_beneficiaries"
						validators={{
							onChange: z
								.string()
								.min(1, { message: "field must be atleast 1 characters" }),
						}}
						children={(field) => (
							<label htmlFor={field.name} className="flex flex-col">
								<Text size={"3"}>Max Number of Beneficiaries*</Text>
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
	);
}

export function UpdateHMOPlanForm({
	id,
	...values
}: DB["hmo_plans"]["Update"]) {
	const [open, onOpenChange] = useState(false);

	const queryClient = useQueryClient();
	const { isProfilePending, profile_data } = useProfile();

	const { data: hmo_companies, isPending: isHMOCompaniesPending } =
		useHmoCompaniesQuery();

	const { data: branch, isPending: isBranchPending } = useBranchQuery();

	const { data: hmo_groups, isPending: isHMOGroupPending } =
		useHmoGroupsQuery();

	const form = useForm({
		defaultValues: {
			id: id,
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updateHMOPlanAction({
				...value,
				branch_id: `${profile_data?.branch_id}`,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["hmoPlans"] });
		},
	});

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger
				disabled={
					isBranchPending ||
					isHMOCompaniesPending ||
					isHMOGroupPending ||
					isProfilePending
				}
			>
				<Button
					variant="ghost"
					disabled={
						isBranchPending ||
						isHMOCompaniesPending ||
						isHMOGroupPending ||
						isProfilePending
					}
				>
					<Edit size={16} />
				</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>Update HMO plan</Dialog.Title>
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
						name="branch_id"
						validators={{
							onChange: z.string(),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Branch*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value!}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select a branch..." />
									<Select.Content position="popper">
										{branch?.branch_data?.map((b) => (
											<Select.Item key={b.id} value={b.id}>
												{b.name}
											</Select.Item>
										))}
									</Select.Content>
								</Select.Root>
								<FieldInfo field={field} />
							</div>
						)}
					/>
					<form.Field
						name="hmo_companies_id"
						validators={{
							onChange: z.string(),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>HMO Company*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select a company..." />
									<Select.Content position="popper">
										{hmo_companies?.hmo_companies_data?.map((c) => (
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
					<form.Field
						name="hmo_group_id"
						validators={{
							onChange: z.string(),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Group*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select a group..." />
									<Select.Content position="popper">
										{hmo_groups?.hmo_group_data?.map((g) => (
											<Select.Item key={g.id} value={g.id}>
												{g.name}
											</Select.Item>
										))}
									</Select.Content>
								</Select.Root>
								<FieldInfo field={field} />
							</div>
						)}
					/>

					<form.Field
						name="enrolment_amount"
						validators={{
							onChange: z
								.string()
								.min(1, { message: "field must be atleast 1 characters" }),
						}}
						children={(field) => (
							<label htmlFor={field.name} className="flex flex-col">
								<Text size={"3"}>Erollment Amount*</Text>
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
						name="sign_up_amount"
						validators={{
							onChange: z
								.string()
								.min(1, { message: "field must be atleast 1 characters" }),
						}}
						children={(field) => (
							<label htmlFor={field.name} className="flex flex-col">
								<Text size={"3"}>Signup Ammount*</Text>
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
						name="max_number_of_beneficiaries"
						validators={{
							onChange: z
								.string()
								.min(1, { message: "field must be atleast 1 characters" }),
						}}
						children={(field) => (
							<label htmlFor={field.name} className="flex flex-col">
								<Text size={"3"}>Max Number of Beneficiaries*</Text>
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
	);
}
