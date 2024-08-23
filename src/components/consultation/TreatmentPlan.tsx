import { Button, Select, Spinner, Text } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useState } from "react";
import { createPatientDiagnosisAction } from "../../actions/consultation/actions";
import {
	consultationTemplatesQueryOptions,
	treatmentPlanQueryOptions,
} from "../../actions/queries";
import { getProfile } from "../../lib/utils";
import { FieldInfo } from "../FieldInfo";
import PendingComponent from "../PendingComponent";
import { DataTable } from "../table/DataTable";
import { treatment_plan_column } from "../table/columns/consultation/plan";
import { RichEditor } from "../textEditor/RichTextEditor";

export function TreatmentPlan({
	isAdmission,
	patientId,
}: { isAdmission: boolean; patientId: string }) {
	const { data, isPending } = useQuery(treatmentPlanQueryOptions);
	if (isPending) return <PendingComponent />;

	return (
		<div>
			<TreatmentPlanForm patientId={patientId} isAdmission={isAdmission} />
			<div>
				<DataTable
					columns={treatment_plan_column}
					data={data?.plan_data ?? []}
					filterLabel="search by name..."
					filterer="name"
				/>
			</div>
		</div>
	);
}
function TreatmentPlanForm({
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

	const { patientId } = useParams({
		from: "/_layout/dashboard/appointments/$patientId",
	});

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
				patients_id: patientId,
				taken_by: `${prof?.id}`,
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
						<Button type="submit" disabled={!canSubmit} size={"4"}>
							{isSubmitting && <Spinner />}
							Save
						</Button>
					)}
				/>
			</form>
		</div>
	);
}
