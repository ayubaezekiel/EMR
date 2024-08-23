import { Button, Card, Dialog, Flex, Heading, Tabs } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getNursingReportsById } from "../../../../actions/actions";
import PendingComponent from "../../../../components/PendingComponent";
import { AdmissionActiveCard } from "../../../../components/admission/Adimissions";
import { IssueRequests } from "../../../../components/consultation/IssueRequests";
import { PatientVitals } from "../../../../components/consultation/PatientVitals";
import { DataTable } from "../../../../components/table/DataTable";
import {
	nursing_report_column,
	NursingReportProps,
} from "../../../../components/table/columns/admission/nursing_report";
import { RecordsAndTaskForm } from "../../../../forms/admission/RecordsAndTaskForm";
import { CreatePatientVitalsForm } from "../../../../forms/config/Vitals";

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
const AdmissionsPatientView = () => {
	const { patientId } = Route.useParams();

	const { data, isPending } = useQuery({
		queryFn: () => getNursingReportsById(patientId),
		queryKey: ["nursingReportsById", patientId],
	});
	if (isPending) return <PendingComponent />;

	const report_data: NursingReportProps[] =
		data?.nursing_report_data?.map((n) => ({
			created_at: n.created_at as string,
			created_by: `${n.created_by}`,
			id: n.id as string,
			note: n.note as string,
			patient_id: n.patient_id as string,
			is_progress_note: Boolean(n.is_progress_note),
			profile: `${n.profile?.first_name} ${n.profile?.middle_name ?? ""} ${n.profile?.last_name}`,
		})) ?? [];

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
					<AdmissionActiveCard />
				</Tabs.Content>
				<Tabs.Content value="viatls" mt={"2"}>
					<Flex justify={"end"}>
						<CreatePatientVitalsForm patientId={patientId} />
					</Flex>
					<PatientVitals patientId={patientId} />
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
			</Tabs.Root>
		</div>
	);
};
