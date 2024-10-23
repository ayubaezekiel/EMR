import { Group, Stepper } from "@mantine/core";
import { Badge, Button, Heading } from "@radix-ui/themes";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  changeAppointmentStatus,
  changeConsultationStatus,
} from "../../../../actions/actions";
import { Diagnosis } from "../../../../components/consultation/Diagnosis";
import { Examination } from "../../../../components/consultation/Examinitation";
import { HistoryTaking } from "../../../../components/consultation/HistoryTaking";
import { IssueRequests } from "../../../../components/consultation/IssueRequests";
import { PatientVitals } from "../../../../components/consultation/PatientVitals";
import { TreatmentPlan } from "../../../../components/consultation/TreatmentPlan";

type AdmissionStatus = {
  admission: boolean;
  appointmentId?: string;
  patientId?: string;
  completed?: boolean;
};
export const Route = createFileRoute(
  "/_layout/dashboard/appointments/$patientId"
)({
  component: () => (
    <div>
      <Heading mb={"6"}>Patient Consultation</Heading>
      <ConsultationStepperForm />
    </div>
  ),
});

function ConsultationStepperForm() {
  const {
    consultationId,
    completed: con_completed,
    active,
  } = Route.useSearch<{
    consultationId: string;
    completed: boolean;
    active: number;
  }>();
  const navigate = useNavigate();
  const { admission, appointmentId, completed } =
    Route.useSearch<AdmissionStatus>();

  const { patientId } = Route.useParams();

  return (
    <>
      <Group justify="center" my="xl">
        <Button
          disabled={active === 0}
          variant={"soft"}
          size={"4"}
          onClick={() =>
            navigate({
              search: {
                admission: admission,
                appointmentId: appointmentId,
                completed: completed,
                active: active > 0 ? active - 1 : active,
              },
            })
          }
        >
          Back
        </Button>
        {active === 5 ? (
          <div>
            {!admission ? (
              <Button
                size={"4"}
                onClick={async () => {
                  await changeAppointmentStatus({
                    id: `${appointmentId}`,
                    isCheckedIn: false,
                    isCompleted: true,
                    isMissed: false,
                    isWaiting: false,
                  });

                  navigate({
                    search: {
                      admission: false,
                      appointmentId: appointmentId,
                      completed: true,
                    },
                  });
                }}
                disabled={completed}
              >
                Mark as completed
              </Button>
            ) : (
              <Button
                size={"4"}
                disabled={con_completed}
                onClick={async () => {
                  changeConsultationStatus({
                    id: `${consultationId}`,
                    isCompleted: true,
                  });
                  navigate({
                    search: navigate({
                      search: {
                        admission: true,
                        consultationId: consultationId,
                        completed: true,
                      },
                    }),
                  });
                }}
              >
                Mark as completed
              </Button>
            )}
          </div>
        ) : (
          <Button
            size={"4"}
            onClick={() =>
              navigate({
                search: {
                  admission: admission,
                  appointmentId: appointmentId,
                  completed: completed,
                  active: active < 5 ? active + 1 : active,
                },
              })
            }
          >
            Next step
          </Button>
        )}
        {admission && (
          <Link to={`/dashboard/admissions/${patientId}`}>
            <Badge size={"3"} color="red" radius="full">
              This patient is admitted, click here to check his/her progress
              note.
            </Badge>
          </Link>
        )}
      </Group>

      <Stepper color="var(--accent-9)" active={active}>
        <Stepper.Step
          label={"Patient Vitals"}
          description="Here are the patient vitals"
        >
          <PatientVitals patientId={patientId as string} />
        </Stepper.Step>
        <Stepper.Step
          label="History Taking"
          description="Record patient history"
        >
          <HistoryTaking
            isAdmission={admission}
            patientId={patientId as string}
          />
        </Stepper.Step>
        <Stepper.Step
          label="Examination"
          description="Record patient examination"
        >
          <Examination isAdmission={admission} />
        </Stepper.Step>
        <Stepper.Step label="Patient Diagnosis" description="diagnose patient">
          <Diagnosis isAdmission={admission} patientId={patientId as string} />
        </Stepper.Step>
        <Stepper.Step label="Plan" description="Record treatment plan">
          <TreatmentPlan isAdmission={admission} />
        </Stepper.Step>
        <Stepper.Step
          label="Issue Requests"
          description="Issue requests for the patient"
        >
          <IssueRequests isAdmission={admission} />
        </Stepper.Step>
      </Stepper>
    </>
  );
}
