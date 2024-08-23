import { Button, Dialog, Select, Spinner, Text } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useMemo, useState } from "react";
import { createPatientDiagnosisAction } from "../../actions/consultation/actions";
import { consultationTemplatesQueryOptions } from "../../actions/queries";
import { getProfile } from "../../lib/utils";
import { FieldInfo } from "../FieldInfo";
import PendingComponent from "../PendingComponent";
import { DataTable } from "../table/DataTable";
import { treatment_plan_column } from "../table/columns/consultation/plan";
import { RichEditor } from "../textEditor/RichTextEditor";
import { Edit } from "lucide-react";
import { SharedConsultationTypes } from "./SharedTypes";
import { getTreatmentPlanById } from "../../actions/actions";

export function TreatmentPlan({
	isAdmission,
	patientId,
}: { isAdmission: boolean; patientId: string }) {
	const { data, isPending } = useQuery({
		queryFn: () => getTreatmentPlanById(patientId),
		queryKey: ["treatmentPlan", patientId],
	});

	const plan_data: SharedConsultationTypes[] =
		useMemo(
			() =>
				data?.plan_data?.map((d) => ({
					created_by: d.taken_by,
					created_at: d.created_at,
					id: d.id,
					note: d.note,
					patient_id: d.patients_id,
					profile: `${d.profile?.first_name} ${d.profile?.middle_name ?? ""} ${d.profile?.last_name}`,
					is_admission: Boolean(d.is_admission),
				})),
			[data?.plan_data],
		) ?? [];
	if (isPending) return <PendingComponent />;

	return (
		<div>
			<CreateTreatmentPlanForm
				patientId={patientId}
				isAdmission={isAdmission}
			/>
			<div>
				<DataTable
					columns={treatment_plan_column}
					data={plan_data}
					filterLabel="search by name..."
					filterer="name"
				/>
			</div>
		</div>
	);
}
export function CreateTreatmentPlanForm({
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
		validatorAdapter: zodValidator(),
		onSubmit: async () => {
			const prof = await getProfile();
			await createPatientDiagnosisAction({
				note: `${template}`,
				patients_id: patientId,
				taken_by: `${prof?.id}`,
				is_admission: isAdmission,
			});
			form.reset();
			queryClient.invalidateQueries({ queryKey: ["treatmentPlan"] });
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

export function UpdateTreatmentPlanForm({
	...values
}: DB["treatment_plan"]["Update"]) {
	const [template, setTemplate] = useState(values.note);
	const { data, isPending } = useQuery(consultationTemplatesQueryOptions);

	const queryClient = useQueryClient();

	const form = useForm({
		defaultValues: {
			...values,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async () => {
			const prof = await getProfile();
			await createPatientDiagnosisAction({
				note: `${template}`,
				patients_id: values.patients_id as string,
				taken_by: `${prof?.id}`,
			});
			form.reset();
			queryClient.invalidateQueries({ queryKey: ["treatmentPlan"] });
		},
	});

	if (isPending) return <PendingComponent />;

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button variant="ghost">
					<Edit size={16} />
				</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Description>
					Update your plan by filling the form
				</Dialog.Description>
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
									Note <Text size={"1"}>(should be atleast 10 characters)</Text>
									*
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
							<Button type="submit" disabled={!canSubmit} size={"4"}>
								{isSubmitting && <Spinner />}
								Save
							</Button>
						)}
					/>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	);
}
