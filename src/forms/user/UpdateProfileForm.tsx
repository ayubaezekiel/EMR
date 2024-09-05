import { Button, Flex, Select, Text, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { toast } from "sonner";
import { z } from "zod";
import { updateProfileAction } from "../../actions/config/user-profile";
import {
	branchQueryOptions,
	departmentsQueryOptions,
	jobPositionsQueryOptions,
} from "@/actions/queries";
import { FieldInfo } from "../../components/FieldInfo";
import { usePerms } from "@/lib/hooks";
import supabase from "@/supabase/client";

export function UpdateProfileForm() {
	const queryClient = useQueryClient();
	const { userId } = useParams({ from: "/_layout/dashboard/users/$userId" });

	const { isPermPending, perm_data } = usePerms();

	const { data: branch_data, isPending: isBranchPending } =
		useQuery(branchQueryOptions);

	const { data: dept_data, isPending: isDeptPending } = useQuery(
		departmentsQueryOptions,
	);

	const { data: job_pos_data, isPending: isJobPosPending } = useQuery(
		jobPositionsQueryOptions,
	);

	const { data: profile_data, isPending: isProfilePending } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("profile")
				.select("*")
				.eq("user_id", userId)
				.single();
			if (error) {
				toast.error(error.message);
			}
			return data;
		},
	});

	const form = useForm({
		defaultValues: {
			...profile_data,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await updateProfileAction(value);
			form.reset();
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
	});

	const pending =
		isProfilePending ||
		isBranchPending ||
		isJobPosPending ||
		isDeptPending ||
		isPermPending;

	const allowed = perm_data?.user_id === userId || perm_data?.is_super_user;

	return (
		<form
			onSubmit={(e) => {
				e.stopPropagation();
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.Field
				name="first_name"
				validators={{
					onChange: z
						.string()
						.min(3, { message: "field must be atleast 3 characters" }),
				}}
				children={(field) => (
					<label htmlFor={field.name} className="flex flex-col">
						<Text size={"3"}>First Name*</Text>
						<TextField.Root
							disabled={!allowed}
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
				name="middle_name"
				children={(field) => (
					<label htmlFor={field.name} className="flex flex-col">
						<Text size={"3"}>Middle Name</Text>
						<TextField.Root
							disabled={!allowed}
							size={"3"}
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
				name="last_name"
				validators={{
					onChange: z
						.string()
						.min(3, { message: "field must be atleast 3 characters" }),
				}}
				children={(field) => (
					<label htmlFor={field.name} className="flex flex-col">
						<Text size={"3"}>Last Name*</Text>
						<TextField.Root
							disabled={!allowed}
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
				name="email"
				validators={{
					onChange: z.string().email(),
				}}
				children={(field) => (
					<label htmlFor={field.name} className="flex flex-col">
						<Text size={"3"}>Alternative Email*</Text>
						<TextField.Root
							disabled={!allowed}
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

			<div>
				<form.Field
					name="branch_id"
					validators={{
						onChange: z.string().min(3, { message: "required" }),
					}}
					children={(field) => (
						<div className="flex flex-col">
							<Text size={"3"}>Branch*</Text>
							<Select.Root
								disabled={!allowed}
								onValueChange={(e) => field.handleChange(e)}
								value={field.state.value!}
								name={field.name}
								size={"3"}
							>
								<Select.Trigger placeholder="select branch..." />
								<Select.Content position="popper">
									{branch_data?.branch_data?.map((b) => (
										<Select.Item value={b.id}>{b.name}</Select.Item>
									))}
								</Select.Content>
							</Select.Root>
							<FieldInfo field={field} />
						</div>
					)}
				/>

				<form.Field
					name="department_id"
					validators={{
						onChange: z.string().min(3, { message: "required" }),
					}}
					children={(field) => (
						<div className="flex flex-col">
							<Text size={"3"}>Department*</Text>
							<Select.Root
								disabled={!allowed}
								onValueChange={(e) => field.handleChange(e)}
								value={field.state.value!}
								name={field.name}
								size={"3"}
							>
								<Select.Trigger placeholder="select department..." />
								<Select.Content position="popper">
									{dept_data?.department_data?.map((b) => (
										<Select.Item value={b.id}>{b.name}</Select.Item>
									))}
								</Select.Content>
							</Select.Root>
							<FieldInfo field={field} />
						</div>
					)}
				/>
				<form.Field
					name="job_position_id"
					validators={{
						onChange: z.string().min(3, { message: "required" }),
					}}
					children={(field) => (
						<div className="flex flex-col">
							<Text size={"3"}>Job Position*</Text>
							<Select.Root
								disabled={!allowed}
								onValueChange={(e) => field.handleChange(e)}
								value={field.state.value!}
								name={field.name}
								size={"3"}
							>
								<Select.Trigger placeholder="select job position..." />
								<Select.Content position="popper">
									{job_pos_data?.job_positions_data?.map((b) => (
										<Select.Item value={b.id}>{b.name}</Select.Item>
									))}
								</Select.Content>
							</Select.Root>
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
							type="submit"
							disabled={!canSubmit || !allowed}
							size={"4"}
							loading={pending || isSubmitting}
						>
							Update
						</Button>
					)}
				/>
			</Flex>
		</form>
	);
}
