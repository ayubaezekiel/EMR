import { Button, Dialog, Select, Spinner, Text } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Edit } from "lucide-react";
import { useState } from "react";
import {
	createExaminationAction,
	updateExaminationAction,
} from "../../actions/consultation/actions";
import {
	consultationTemplatesQueryOptions,
	examinationQueryOptions,
} from "../../actions/queries";
import { checkAuth, getProfile } from "../../lib/utils";
import { FieldInfo } from "../FieldInfo";
import PendingComponent from "../PendingComponent";
import { DataTable } from "../table/DataTable";
import { patient_examination_column } from "../table/columns/consultation/patient_examination";
import { RichEditor } from "../textEditor/RichTextEditor";

export function Examination({
	isAdmission,
	patientId,
}: { isAdmission: boolean; patientId: string }) {
	const { data, isPending } = useQuery(examinationQueryOptions);
	if (isPending) return <PendingComponent />;

	return (
		<div>
			<ExaminationForm patientId={patientId} isAdmission={isAdmission} />
			<div>
				<DataTable
					columns={patient_examination_column}
					data={data?.examination_data ?? []}
					filterLabel="search by name..."
					filterer="name"
				/>
			</div>
		</div>
	);
}
function ExaminationForm({
	isAdmission,
	patientId,
}: { isAdmission: boolean; patientId: string }) {
	const [template, setTemplate] = useState("");
	const { data, isPending } = useQuery(consultationTemplatesQueryOptions);

	const queryClient = useQueryClient();

	const form = useForm({
		defaultValues: {
			patients_id: "",
			taken_by: "",
			note: template,
		},

		onSubmit: async () => {
			const prof = await getProfile();
			await createExaminationAction({
				note: `${template}`,
				patients_id: patientId,
				taken_by: `${prof?.id}`,
				is_admission: isAdmission,
			});
			form.reset();
			queryClient.invalidateQueries({ queryKey: ["examination"] });
		},
	});

	if (isPending) return <PendingComponent />;

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.stopPropagation();
					e.preventDefault();
					form.handleSubmit();
				}}
				className="space-y-6"
			>
				<div className="flex flex-col gap-1 w-96">
					<Text size={"3"}>Use a template?</Text>
					<Select.Root onValueChange={(e) => setTemplate(e)}>
						<Select.Trigger placeholder="select a template..." />
						<Select.Content position="popper">
							{data?.consultation_templates_data?.map((t) => (
								<Select.Item key={t.id} value={t.content}>
									{t.name}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>
				</div>
				<form.Field
					defaultValue={template}
					name="note"
					children={(field) => (
						<div className="flex flex-col">
							<Text size={"3"}>
								Note <Text size={"1"}>(should be atleast 10 characters)</Text>*
							</Text>
							<RichEditor
								initialValue={field.state.value!}
								onChange={(e) => field.handleChange(e)}
							/>
							<FieldInfo field={field} />
						</div>
					)}
				/>

				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
					children={([canSubmit, isSubmitting]) => (
						<Button
							type="submit"
							disabled={!canSubmit || template.length < 10}
							size={"4"}
						>
							{isSubmitting && <Spinner />}
							Save
						</Button>
					)}
				/>
			</form>
		</div>
	);
}

export function UpdateExaminationForm({
	id,
	...values
}: DB["patient_examination"]["Update"]) {
	const [open, onOpenChange] = useState(false);
	const [template, setTemplate] = useState(values.note);
	const { data, isPending } = useQuery(consultationTemplatesQueryOptions);

	const queryClient = useQueryClient();

	const { patientId } = useParams({
		from: "/_layout/dashboard/appointments/$patientId",
	});

	const form = useForm({
		defaultValues: {
			...values,
			note: template,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async () => {
			const user = await checkAuth();
			await updateExaminationAction({
				id: id,
				note: `${template}`,
				patients_id: patientId,
				taken_by: `${user?.id}`,
			});
			form.reset();
			queryClient.invalidateQueries({ queryKey: ["examination"] });
		},
	});

	if (isPending) return <PendingComponent />;

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger>
				<Button variant="ghost">
					<Edit size={16} />
				</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>Update Examination</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					Fill out the form information
				</Dialog.Description>
				<div>
					<form
						onSubmit={(e) => {
							e.stopPropagation();
							e.preventDefault();
							form.handleSubmit();
						}}
						className="space-y-6"
					>
						<div className="flex flex-col gap-1 w-96">
							<Text size={"3"}>Use a template?</Text>
							<Select.Root onValueChange={(e) => setTemplate(e)}>
								<Select.Trigger placeholder="select a template..." />
								<Select.Content position="popper">
									{data?.consultation_templates_data?.map((t) => (
										<Select.Item key={t.id} value={t.content}>
											{t.name}
										</Select.Item>
									))}
								</Select.Content>
							</Select.Root>
						</div>
						<form.Field
							defaultValue={template}
							name="note"
							children={(field) => (
								<div className="flex flex-col">
									<Text size={"3"}>
										Note{" "}
										<Text size={"1"}>(should be atleast 10 characters)</Text>*
									</Text>
									<RichEditor
										initialValue={field.state.value!}
										onChange={(e) => field.handleChange(e)}
									/>
									<FieldInfo field={field} />
								</div>
							)}
						/>

						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<Button
									type="submit"
									disabled={!canSubmit || template!.length < 10}
									size={"4"}
								>
									{isSubmitting && <Spinner />}
									Save
								</Button>
							)}
						/>
					</form>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	);
}
