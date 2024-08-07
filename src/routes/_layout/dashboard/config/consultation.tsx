import { createFileRoute } from "@tanstack/react-router";
import { ConsultaionSpecialties } from "../../../../components/config/Specialties";
import { ConsultationTemplates } from "../../../../components/config/Templates";
import { Vitals } from "../../../../components/config/Vitals";

export const Route = createFileRoute("/_layout/dashboard/config/consultation")({
  component: () => (
    <div className="flex flex-col gap-10">
      <ConsultaionSpecialties />

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Vitals />
        <ConsultationTemplates />
      </div>
    </div>
  ),
});
