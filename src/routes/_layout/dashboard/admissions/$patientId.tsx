import { Button, Card, Dialog, Flex, Heading, Tabs } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
	getDiagnosisById,
	getExaminationById,
	getHistoryTakingById,
	getNursingReportsById,
	getTreatmentPlanById,
} from "../../../../actions/actions";
import PendingComponent from "../../../../components/PendingComponent";
import { CreateDiagnosisForm } from "../../../../components/consultation/Diagnosis";
import { CreateExaminationForm } from "../../../../components/consultation/Examinitation";
import { CreateHistoryTakingForm } from "../../../../components/consultation/HistoryTaking";
import { IssueRequests } from "../../../../components/consultation/IssueRequests";
import { PatientVitals } from "../../../../components/consultation/PatientVitals";
import { CreateTreatmentPlanForm } from "../../../../components/consultation/TreatmentPlan";
import { DataTable } from "../../../../components/table/DataTable";
import {
	NursingReportProps,
	nursing_report_column,
} from "../../../../components/table/columns/admission/nursing_report";
import { patient_diagnosis_column } from "../../../../components/table/columns/consultation/diagnosis";
import { history_taking_column } from "../../../../components/table/columns/consultation/history_taking";
import { patient_examination_column } from "../../../../components/table/columns/consultation/patient_examination";
import { RecordsAndTaskForm } from "../../../../forms/admission/RecordsAndTaskForm";
import { CreatePatientVitalsForm } from "../../../../forms/config/Vitals";
import { treatment_plan_column } from "../../../../components/table/columns/consultation/plan";
import { SharedConsultationTypes } from "../../../../components/consultation/SharedTypes";

export const Route = createFileRoute(
	"/_layout/dashboard/admissions/$patientId",
)({
	component: () => (
		<>
			<Card variant="ghost" mt={"3"} style={{ background: "var(--accent-3)" }}>
				<Flex justify={"between"} align={"center"}>
					<Heading mb={"3"}>Admissions</Heading>
					<SendRequest />
				</Flex>
			</Card>
			<AdmissionsPatientView />
		</>
	),
});

const AdmissionsPatientView = () => {
	const { patientId } = Route.useParams();

	const { data, isPending } = useQuery({
		queryFn: () => getNursingReportsById(patientId),
		queryKey: ["nursingReports", patientId],
	});
	const { data: diag, isPending: isDiagPending } = useQuery({
		queryFn: () => getDiagnosisById(patientId),
		queryKey: ["diagnosis"],
	});
	const { data: his_data, isPending: isHistoryPending } = useQuery({
		queryFn: () => getHistoryTakingById(patientId),
		queryKey: ["historyTaking", patientId],
	});
	const { data: plan, isPending: isPlanPending } = useQuery({
		queryFn: () => getTreatmentPlanById(patientId),
		queryKey: ["treatmentPlan", patientId],
	});
	const { data: exam_data, isPending: isExamPending } = useQuery({
		queryFn: () => getExaminationById(patientId),
		queryKey: ["examinations"],
	});

	const examination_data: SharedConsultationTypes[] =
		useMemo(
			() =>
				exam_data?.examination_data?.map((d) => ({
					created_by: d.taken_by,
					created_at: d.created_at,
					id: d.id,
					note: d.note,
					patient_id: d.patients_id,
					profile: `${d.profile?.first_name} ${d.profile?.middle_name ?? ""} ${d.profile?.last_name}`,
					is_admission: Boolean(d.is_admission),
				})),
			[exam_data?.examination_data],
		) ?? [];
	const diagnosis_data: SharedConsultationTypes[] =
		useMemo(
			() =>
				diag?.diagnosis_data?.map((d) => ({
					created_by: d.taken_by,
					created_at: d.created_at,
					id: d.id,
					note: d.note,
					patient_id: d.patients_id,
					profile: `${d.profile?.first_name} ${d.profile?.middle_name ?? ""} ${d.profile?.last_name}`,
					is_admission: Boolean(d.is_admission),
				})),
			[diag?.diagnosis_data],
		) ?? [];

	const report_data: NursingReportProps[] =
		useMemo(
			() =>
				data?.nursing_report_data
					?.map((n) => ({
						created_at: n.created_at as string,
						created_by: `${n.created_by}`,
						id: n.id as string,
						note: n.note as string,
						patient_id: n.patient_id as string,
						is_progress_note: Boolean(n.is_progress_note),
						profile: `${n.profile?.first_name} ${n.profile?.middle_name ?? ""} ${n.profile?.last_name}`,
					}))
					.filter((f) => !f.is_progress_note),
			[data?.nursing_report_data],
		) ?? [];

	const progress_notes_data: NursingReportProps[] =
		useMemo(
			() =>
				data?.nursing_report_data
					?.map((n) => ({
						created_at: n.created_at as string,
						created_by: `${n.created_by}`,
						id: n.id as string,
						note: n.note as string,
						patient_id: n.patient_id as string,
						is_progress_note: Boolean(n.is_progress_note),
						profile: `${n.profile?.first_name} ${n.profile?.middle_name ?? ""} ${n.profile?.last_name}`,
					}))
					.filter((f) => f.is_progress_note),
			[data?.nursing_report_data],
		) ?? [];

	const history_data: SharedConsultationTypes[] =
		useMemo(
			() =>
				his_data?.history_taking_data?.map((d) => ({
					created_by: d.taken_by,
					created_at: d.created_at,
					id: d.id,
					note: d.note,
					patient_id: d.patients_id,
					profile: `${d.profile?.first_name} ${d.profile?.middle_name ?? ""} ${d.profile?.last_name}`,
					is_admission: Boolean(d.is_admission),
				})),
			[his_data?.history_taking_data],
		) ?? [];

	const plan_data: SharedConsultationTypes[] =
		useMemo(
			() =>
				plan?.plan_data?.map((d) => ({
					created_by: d.taken_by,
					created_at: d.created_at,
					id: d.id,
					note: d.note,
					patient_id: d.patients_id,
					profile: `${d.profile?.first_name} ${d.profile?.middle_name ?? ""} ${d.profile?.last_name}`,
					is_admission: Boolean(d.is_admission),
				})),
			[plan?.plan_data],
		) ?? [];
	if (
		isPending ||
		isHistoryPending ||
		isDiagPending ||
		isHistoryPending ||
		isPlanPending ||
		isExamPending
	)
		return <PendingComponent />;

	return (
		<div>
			<Tabs.Root defaultValue="progress" my={"4"}>
				<Tabs.List>
					<Tabs.Trigger value="progress">Progress Notes</Tabs.Trigger>
					<Tabs.Trigger value="report">Nursing Reports</Tabs.Trigger>
					<Tabs.Trigger value="viatls">Vital Signs</Tabs.Trigger>
					<Tabs.Trigger value="history">History</Tabs.Trigger>
					<Tabs.Trigger value="examination">Examinations</Tabs.Trigger>
					<Tabs.Trigger value="diagnosis">Diagnosis</Tabs.Trigger>
					<Tabs.Trigger value="plans">Treatment Plans</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="progress" mt={"2"}>
					<Flex justify={"end"}>
						<RecordsAndTaskForm
							dialogTitle="Record Progress Note"
							btnLable="Record Note"
							patientId={patientId}
							isProgressNote
						/>
					</Flex>
					<DataTable
						columns={nursing_report_column}
						data={progress_notes_data}
						filterLabel="filte by created_by..."
						filterer="created_by"
					/>
				</Tabs.Content>
				<Tabs.Content value="report" mt={"2"}>
					<Flex justify={"end"}>
						<RecordsAndTaskForm
							dialogTitle="Record Nursing Report"
							btnLable="Add Report"
							patientId={patientId}
							isProgressNote={false}
						/>
					</Flex>
					<DataTable
						columns={nursing_report_column}
						data={report_data}
						filterLabel="filte by created_by..."
						filterer="created_by"
					/>
				</Tabs.Content>
				<Tabs.Content value="viatls" mt={"2"}>
					<Flex justify={"end"}>
						<CreatePatientVitalsForm patientId={patientId} />
					</Flex>
					<PatientVitals patientId={patientId} />
				</Tabs.Content>
				<Tabs.Content value="history" mt={"2"}>
					<Flex justify={"end"}>
						<Dialog.Root>
							<Dialog.Trigger>
								<Button>Add History</Button>
							</Dialog.Trigger>
							<Dialog.Content maxWidth={"50rem"}>
								<CreateHistoryTakingForm isAdmission patientId={patientId} />
							</Dialog.Content>
						</Dialog.Root>
					</Flex>
					<DataTable
						columns={history_taking_column}
						data={history_data}
						filterLabel="filte by created_by..."
						filterer="created_by"
					/>
				</Tabs.Content>
				<Tabs.Content value="examination" mt={"2"}>
					<Flex justify={"end"}>
						<Dialog.Root>
							<Dialog.Trigger>
								<Button>Add Examination</Button>
							</Dialog.Trigger>
							<Dialog.Content maxWidth={"50rem"}>
								<CreateExaminationForm isAdmission patientId={patientId} />
							</Dialog.Content>
						</Dialog.Root>
					</Flex>
					<DataTable
						columns={patient_examination_column}
						data={examination_data}
						filterLabel="filte by created_by..."
						filterer="created_by"
					/>
				</Tabs.Content>
				<Tabs.Content value="diagnosis" mt={"2"}>
					<Flex justify={"end"}>
						<Dialog.Root>
							<Dialog.Trigger>
								<Button>Add Diagnosis</Button>
							</Dialog.Trigger>
							<Dialog.Content maxWidth={"50rem"}>
								<CreateDiagnosisForm isAdmission patientId={patientId} />
							</Dialog.Content>
						</Dialog.Root>
					</Flex>
					<DataTable
						columns={patient_diagnosis_column}
						data={diagnosis_data}
						filterLabel="filte by created_by..."
						filterer="created_by"
					/>
				</Tabs.Content>
				<Tabs.Content value="plans" mt={"2"}>
					<Flex justify={"end"}>
						<Dialog.Root>
							<Dialog.Trigger>
								<Button>Create Plan</Button>
							</Dialog.Trigger>
							<Dialog.Content maxWidth={"50rem"}>
								<CreateTreatmentPlanForm isAdmission patientId={patientId} />
							</Dialog.Content>
						</Dialog.Root>
					</Flex>
					<DataTable
						columns={treatment_plan_column}
						data={plan_data}
						filterLabel="filte by created_by..."
						filterer="created_by"
					/>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
};
const SendRequest = () => {
	const { patientId } = Route.useParams();
	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button>Issue Requests</Button>
			</Dialog.Trigger>
			<Dialog.Content maxWidth={"50rem"}>
				<IssueRequests patientId={patientId} />
			</Dialog.Content>
		</Dialog.Root>
	);
};
