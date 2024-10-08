import { createFileRoute } from "@tanstack/react-router";
import { ConsultationTemplates } from "../../../../components/config/Templates";
import { Vitals } from "../../../../components/config/Vitals";
import { Diagnosis } from "@/components/config/Diagnosis";

export const Route = createFileRoute("/_layout/dashboard/config/consultation")({
  component: () => (
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <Vitals />
      <ConsultationTemplates />
      <Diagnosis />
    </div>
  ),
});
