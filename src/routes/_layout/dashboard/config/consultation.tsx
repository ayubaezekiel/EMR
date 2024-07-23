import { createFileRoute } from "@tanstack/react-router";
import { ConnsultaionSpecialties } from "../../../../components/config/Specialties";
import {
  getConsultationSpecialties,
  getConsultationTemplates,
} from "../../../../actions/actions";
import { ConsultationTemplates } from "../../../../components/config/Templates";

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
      <ConsultationTemplates />
    </div>
  ),
});
