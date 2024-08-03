import { Button, Heading } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeftCircle } from "lucide-react";
import { HistoryTaking } from "../../../../components/consultation/HistoryTaking";
import { PatientVitals } from "../../../../components/consultation/PatientVitals";
import { Step, Stepper, useStepper } from "../../../../components/stepper";
import { Examination } from "../../../../components/consultation/Examinitation";
import { Diagnosis } from "../../../../components/consultation/Diagnosis";

export const Route = createFileRoute(
  "/_layout/dashboard/appointments/$appointmentId"
)({
  component: () => (
    <div>
      <Heading mb={"6"}>Patient Consultation</Heading>
      <ConsultationStepperForm />
    </div>
  ),
});

const steps = [
  {
    label: "Patient Vitals",
    description: "Here are the patient vitals",
    comp: <PatientVitals />,
  },
  {
    label: "History Taking",
    description: "Record or view patient history",
    comp: <HistoryTaking />,
  },
  {
    label: "Examination",
    description: "Record or view patient examination",
    comp: <Examination />,
  },
  {
    label: "Patient Diagnosis",
    description: "diagnose patient",
    comp: <Diagnosis />,
  },
  {
    label: "Plan",
    description: "Record treatment plan",
    comp: <PatientVitals />,
  },
  {
    label: "Issue Requests",
    description: "Issue requests for the patient",
    comp: <PatientVitals />,
  },
];

export function ConsultationStepperForm() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        {steps.map((stepProps) => {
          return (
            <Step key={stepProps.label} {...stepProps}>
              {stepProps.comp}
            </Step>
          );
        })}
        <MyStepperFooter />
      </Stepper>
    </div>
  );
}

function MyStepperFooter() {
  const { activeStep, resetSteps, steps } = useStepper();

  if (activeStep !== steps.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button size={"4"} onClick={resetSteps}>
        <ArrowLeftCircle /> Back
      </Button>
    </div>
  );
}
