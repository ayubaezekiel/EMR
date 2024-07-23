import { createFileRoute } from "@tanstack/react-router";
import { ConsultationStepperForm } from "../../../../components/stepper/Stepper";
import { Heading } from "@radix-ui/themes";

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
