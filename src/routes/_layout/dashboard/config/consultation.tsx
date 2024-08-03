import { createFileRoute } from "@tanstack/react-router";
import { ConnsultaionSpecialties } from "../../../../components/config/Specialties";
import {
  getConsultationSpecialties,
  getConsultationTemplates,
} from "../../../../actions/actions";
import { ConsultationTemplates } from "../../../../components/config/Templates";
import { Vitals } from "../../../../components/config/Vitals";

const loadData = async () => {
  const { consultation_specialties_data } = await getConsultationSpecialties();
  const { consultation_templates_data } = await getConsultationTemplates();

  return { consultation_specialties_data, consultation_templates_data };
};
export const Route = createFileRoute("/_layout/dashboard/config/consultation")({
  loader: loadData,
  component: () => (
    <div className="flex flex-col gap-10">
      <ConnsultaionSpecialties />

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Vitals />
        <ConsultationTemplates />
      </div>
    </div>
  ),
});
