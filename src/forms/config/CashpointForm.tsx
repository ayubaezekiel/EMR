import { useBranchQuery, useClinicsQuery } from "@/actions/queries";
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
	createCashpointAction,
	updateCashpointAction,
} from "../../actions/config/cashpoint";
import { FieldInfo } from "../../components/FieldInfo";
import { useProfile } from "@/lib/hooks";

export function CreateCashpointForm() {
	const [open, onOpenChange] = useState(false);

	const { data: branch, isPending: isBranchPending } = useBranchQuery();
	const { data: clinics, isPending: isClinicsPending } = useClinicsQuery();
	const queryClient = useQueryClient();
	const { isProfilePending, profile_data } = useProfile();

	const form = useForm({
		defaultValues: {
			name: "",
			branch_id: "",
			clinics_id: "",
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await createCashpointAction({
				...value,
				branch_id: `${profile_data?.branch_id}`,
			});
			form.reset();
			onOpenChange(false);
			queryClient.invalidateQueries({ queryKey: ["cashpoints"] });
		},
	});

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger
				disabled={isBranchPending || isClinicsPending || isProfilePending}
			>
				<Button
					loading={isBranchPending || isClinicsPending || isProfilePending}
					variant="soft"
				>
					New
				</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>New cashpoint</Dialog.Title>
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
							<label htmlFor={field.name}>
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
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Branch*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select branch..." />
									<Select.Content position="popper">
										{branch?.branch_data?.map((b) => (
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
						name="clinics_id"
						validators={{
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Clinic*</Text>
								<Select.Root
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
							</div>
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

export function UpdateCashpointForm({
	...values
}: DB["cash_points"]["Update"]) {
	const [open, onOpenChange] = useState(false);

	const { data: branch, isPending: isBranchPending } = useBranchQuery();
	const { data: clinics, isPending: isClinicsPending } = useClinicsQuery();
	const queryClient = useQueryClient();
	const { isProfilePending, profile_data } = useProfile();

	const form = useForm({
		defaultValues: {
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updateCashpointAction({
				...value,
				branch_id: `${profile_data?.branch_id}`,
			});
			form.reset();
			onOpenChange(false);

			queryClient.invalidateQueries({ queryKey: ["cashpoints"] });
		},
	});

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger
				disabled={isBranchPending || isClinicsPending || isProfilePending}
			>
				<Button
					loading={isBranchPending || isClinicsPending || isProfilePending}
					variant="ghost"
				>
					<Edit size={16} />
				</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>Update Cashpoint</Dialog.Title>
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
							<label htmlFor={field.name}>
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
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Branch*</Text>
								<Select.Root
									name={field.name}
									value={field.state.value}
									onValueChange={(e) => field.handleChange(e)}
								>
									<Select.Trigger placeholder="select branch..." />
									<Select.Content position="popper">
										{branch?.branch_data?.map((b) => (
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
						name="clinics_id"
						validators={{
							onChange: z
								.string()
								.min(3, { message: "field must be atleast 3 characters" }),
						}}
						children={(field) => (
							<div className="flex flex-col">
								<Text size={"3"}>Clinic*</Text>
								<Select.Root
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
							</div>
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
