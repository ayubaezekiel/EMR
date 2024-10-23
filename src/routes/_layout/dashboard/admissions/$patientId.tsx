import { CreatePatientDiagnosisForm } from "@/forms/consultation/DiagnosisForm";
import { CreateExaminationForm } from "@/forms/consultation/ExaminationForm";
import { CreateHistoryTakingForm } from "@/forms/consultation/HistoryTakingForm";
import { CreateTreatmentPlanForm } from "@/forms/consultation/TreatmentPlan";
import { CreateAntenatalRequestForm } from "@/forms/requests/AntenatalRequestForm";
import { useProfile } from "@/lib/hooks";
import {
  Button,
  Callout,
  Card,
  Dialog,
  Flex,
  Heading,
  Spinner,
  Tabs,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { useMemo } from "react";
import {
  getDiagnosisById,
  getExaminationById,
  getHistoryTakingById,
  getNursingReportsById,
  getTreatmentPlanById,
} from "../../../../actions/actions";
import { IssueRequests } from "../../../../components/consultation/IssueRequests";
import { PatientVitals } from "../../../../components/consultation/PatientVitals";
import { SharedConsultationTypes } from "../../../../components/consultation/SharedTypes";
import { DataTable } from "../../../../components/table/DataTable";
import {
  NursingReportProps,
  nursing_report_column,
} from "../../../../components/table/columns/admission/nursing_report";
import { patient_diagnosis_column } from "../../../../components/table/columns/consultation/diagnosis";
import { history_taking_column } from "../../../../components/table/columns/consultation/history_taking";
import { patient_examination_column } from "../../../../components/table/columns/consultation/patient_examination";
import { treatment_plan_column } from "../../../../components/table/columns/consultation/plan";
import { RecordsAndTaskForm } from "../../../../forms/admission/RecordsAndTaskForm";
import { CreatePatientVitalsForm } from "@/forms/consultation/PatientVitalsForm";

export const Route = createFileRoute(
  "/_layout/dashboard/admissions/$patientId"
)({
  component: () => (
    <>
      <Card variant="ghost" mt={"3"} style={{ background: "var(--accent-3)" }}>
        <Flex justify={"between"} align={"center"}>
          <Heading mb={"3"}>Admissions</Heading>
          <Flex align={"center"} gap={"2"}>
            <CreateAntenatalRequestForm />
            <SendRequest />
          </Flex>
        </Flex>
      </Card>
      <AdmissionsPatientView />
    </>
  ),
});

const AdmissionsPatientView = () => {
  const { patientId } = Route.useParams();

  const { isProfilePending, profile_data } = useProfile();

  const { data, isPending } = useQuery({
    queryFn: () => getNursingReportsById(patientId),
    queryKey: ["nursingReportsById", patientId],
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
      [exam_data?.examination_data]
    ) ?? [];
  const diagnosis_data: DB["patient_diagnosis"]["Row"][] =
    useMemo(
      () =>
        diag?.diagnosis_data?.map((d) => ({
          ...d,
          profile: `${d.profile?.first_name} ${d.profile?.middle_name ?? ""} ${d.profile?.last_name}`,
        })),
      [diag?.diagnosis_data]
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
      [data?.nursing_report_data]
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
      [data?.nursing_report_data]
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
      [his_data?.history_taking_data]
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
      [plan?.plan_data]
    ) ?? [];

  return isProfilePending ? (
    <Spinner />
  ) : (
    <div>
      {profile_data?.has_access_to_doctor_priviledges ? (
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
              {isPending ? (
                <Spinner />
              ) : (
                <RecordsAndTaskForm
                  dialogTitle="Record Progress Note"
                  btnLable="Record Note"
                  patientId={patientId}
                  isProgressNote
                />
              )}
            </Flex>
            <DataTable
              columns={nursing_report_column}
              data={progress_notes_data}
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
            <DataTable columns={nursing_report_column} data={report_data} />
          </Tabs.Content>
          <Tabs.Content value="viatls" mt={"2"}>
            <Flex justify={"end"}>
              <CreatePatientVitalsForm patientId={patientId} />
            </Flex>
            <PatientVitals patientId={patientId} />
          </Tabs.Content>
          <Tabs.Content value="history" mt={"2"}>
            <Flex justify={"end"}>
              {isHistoryPending ? (
                <Spinner />
              ) : (
                <CreateHistoryTakingForm isAdmission />
              )}
            </Flex>
            <DataTable columns={history_taking_column} data={history_data} />
          </Tabs.Content>
          <Tabs.Content value="examination" mt={"2"}>
            <Flex justify={"end"}>
              {isExamPending ? (
                <Spinner />
              ) : (
                <CreateExaminationForm isAdmission />
              )}
            </Flex>
            <DataTable
              columns={patient_examination_column}
              data={examination_data}
            />
          </Tabs.Content>
          <Tabs.Content value="diagnosis" mt={"2"}>
            <Flex justify={"end"}>
              {isDiagPending ? (
                <Spinner />
              ) : (
                <CreatePatientDiagnosisForm isAdmission />
              )}
            </Flex>
            <DataTable
              columns={patient_diagnosis_column}
              data={diagnosis_data}
            />
          </Tabs.Content>
          <Tabs.Content value="plans" mt={"2"}>
            <Flex justify={"end"}>
              {isPlanPending ? (
                <Spinner />
              ) : (
                <CreateTreatmentPlanForm isAdmission />
              )}
            </Flex>
            <DataTable columns={treatment_plan_column} data={plan_data} />
          </Tabs.Content>
        </Tabs.Root>
      ) : (
        <Callout.Root color="red">
          <Callout.Icon>
            <AlertTriangle />
          </Callout.Icon>
          <Callout.Text>Access denied, insufficient previledges</Callout.Text>
        </Callout.Root>
      )}
    </div>
  );
};
const SendRequest = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size={"3"}>Issue Requests</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth={"60rem"}>
        <IssueRequests isAdmission />
      </Dialog.Content>
    </Dialog.Root>
  );
};
