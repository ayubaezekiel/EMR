import { CreateTreatmentPlanForm } from "@/forms/consultation/TreatmentPlan";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getTreatmentPlanById } from "../../actions/actions";
import { DataTable } from "../table/DataTable";
import { treatment_plan_column } from "../table/columns/consultation/plan";
import { SharedConsultationTypes } from "./SharedTypes";
import { Spinner } from "@radix-ui/themes";
import { useParams } from "@tanstack/react-router";

export function TreatmentPlan({ isAdmission }: { isAdmission: boolean }) {
  const { patientId } = useParams({
    from: isAdmission
      ? "/_layout/dashboard/admissions/$patientId"
      : "/_layout/dashboard/appointments/$patientId",
  });
  const { data, isPending } = useQuery({
    queryFn: () => getTreatmentPlanById(patientId),
    queryKey: ["treatmentPlan", patientId],
  });

  const plan_data: SharedConsultationTypes[] =
    useMemo(
      () =>
        data?.plan_data?.map((d) => ({
          created_by: d.taken_by,
          created_at: d.created_at,
          id: d.id,
          note: d.note,
          patient_id: d.patients_id,
          profile: `${d.profile?.first_name} ${d.profile?.middle_name ?? ""} ${d.profile?.last_name}`,
          is_admission: Boolean(d.is_admission),
        })),
      [data?.plan_data]
    ) ?? [];

  return (
    <div className="grid md:grid-cols-2 md:gap-10 gap-4">
      {isPending ? (
        <Spinner />
      ) : (
        <CreateTreatmentPlanForm isAdmission={isAdmission} />
      )}

      <DataTable columns={treatment_plan_column} data={plan_data} />
    </div>
  );
}
