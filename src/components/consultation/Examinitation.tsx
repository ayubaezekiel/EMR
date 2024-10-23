import { Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getExaminationById } from "../../actions/actions";
import { DataTable } from "../table/DataTable";
import { patient_examination_column } from "../table/columns/consultation/patient_examination";
import { SharedConsultationTypes } from "./SharedTypes";
import { CreateExaminationForm } from "@/forms/consultation/ExaminationForm";
import { useParams } from "@tanstack/react-router";

export function Examination({ isAdmission }: { isAdmission: boolean }) {
  const { patientId } = useParams({
    from: isAdmission
      ? "/_layout/dashboard/admissions/$patientId"
      : "/_layout/dashboard/appointments/$patientId",
  });
  const { data, isPending } = useQuery({
    queryFn: () => getExaminationById(patientId),
    queryKey: ["examinations"],
  });

  const examination_data: SharedConsultationTypes[] =
    useMemo(
      () =>
        data?.examination_data?.map((d) => ({
          created_by: d.taken_by,
          created_at: d.created_at,
          id: d.id,
          note: d.note,
          patient_id: d.patients_id,
          profile: `${d.profile?.first_name} ${d.profile?.middle_name ?? ""} ${d.profile?.last_name}`,
          is_admission: Boolean(d.is_admission),
        })),
      [data?.examination_data]
    ) ?? [];

  return (
    <div className="grid md:grid-cols-2 md:gap-10 gap-4">
      {isPending ? (
        <Spinner />
      ) : (
        <CreateExaminationForm isAdmission={isAdmission} />
      )}
      <div>
        <DataTable
          columns={patient_examination_column}
          data={examination_data}
        />
      </div>
    </div>
  );
}
