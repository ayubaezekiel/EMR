import { Group, MantineProvider, Stepper } from "@mantine/core";
import { Badge, Button, Heading } from "@radix-ui/themes";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Diagnosis } from "../../../../components/consultation/Diagnosis";
import { Examination } from "../../../../components/consultation/Examinitation";
import { HistoryTaking } from "../../../../components/consultation/HistoryTaking";
import { IssueRequests } from "../../../../components/consultation/IssueRequests";
import { PatientVitals } from "../../../../components/consultation/PatientVitals";
import { TreatmentPlan } from "../../../../components/consultation/TreatmentPlan";

type AdmissionStatus = {
	admission: boolean;
	patientId?: string;
};
export const Route = createFileRoute(
	"/_layout/dashboard/appointments/$patientId",
)({
	validateSearch: ({ admission }: AdmissionStatus) => {
		return { admission };
	},
	component: () => (
		<div>
			<Heading mb={"6"}>Patient Consultation</Heading>
			<ConsultationStepperForm />
		</div>
	),
});

const steps = ({ admission, patientId }: AdmissionStatus) => [
	{
		label: "Patient Vitals",
		description: "Here are the patient vitals",
		comp: <PatientVitals patientId={patientId as string} />,
	},
	{
		label: "History Taking",
		description: "Record patient history",
		comp: (
			<HistoryTaking isAdmission={admission} patientId={patientId as string} />
		),
	},
	{
		label: "Examination",
		description: "Record patient examination",
		comp: (
			<Examination isAdmission={admission} patientId={patientId as string} />
		),
	},
	{
		label: "Patient Diagnosis",
		description: "diagnose patient",
		comp: <Diagnosis isAdmission={admission} patientId={patientId as string} />,
	},
	{
		label: "Plan",
		description: "Record treatment plan",
		comp: (
			<TreatmentPlan isAdmission={admission} patientId={patientId as string} />
		),
	},
	{
		label: "Issue Requests",
		description: "Issue requests for the patient",
		comp: <IssueRequests patientId={patientId as string} />,
	},
];

function ConsultationStepperForm() {
	const [active, setActive] = useState(0);
	const nextStep = () =>
		setActive((current) => (current < 5 ? current + 1 : current));
	const prevStep = () =>
		setActive((current) => (current > 0 ? current - 1 : current));

	const { admission } = Route.useSearch();
	const { patientId } = Route.useParams();

	return (
		<MantineProvider>
			<Group justify="center" my="xl">
				<Button
					disabled={active === 0}
					variant={"soft"}
					size={"4"}
					onClick={prevStep}
				>
					Back
				</Button>
				{active === 5 ? (
					<Button size={"4"}>Mark as completed</Button>
				) : (
					<Button size={"4"} onClick={nextStep}>
						Next step
					</Button>
				)}
			</Group>

			<Stepper color="var(--accent-9)" active={active} onStepClick={setActive}>
				{steps({ admission, patientId }).map((s) => (
					<Stepper.Step
						key={s.label}
						label={s.label}
						description={s.description}
					>
						{admission && (
							<Link to={`/dashboard/admissions/${patientId}`}>
								<Badge size={"3"} color="red" radius="full">
									This patient is admitted, click here to check his/her progress
									note.
								</Badge>
							</Link>
						)}
						{s.comp}
					</Stepper.Step>
				))}
			</Stepper>
		</MantineProvider>
	);
}