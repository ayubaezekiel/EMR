import { Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getHistoryTakingById } from "../../actions/actions";
import { DataTable } from "../table/DataTable";
import { history_taking_column } from "../table/columns/consultation/history_taking";
import { SharedConsultationTypes } from "./SharedTypes";
import { CreateHistoryTakingForm } from "@/forms/consultation/HistoryTakingForm";

export function HistoryTaking({
  isAdmission,
  patientId,
}: {
  isAdmission: boolean;
  patientId: string;
}) {
  return (
    <div className="grid md:grid-cols-2 md:gap-10 gap-4">
      <CreateHistoryTakingForm isAdmission={isAdmission} />
      <PatientHistory patientId={patientId} />
    </div>
  );
}

export const PatientHistory = ({ patientId }: { patientId: string }) => {
  const { data, isPending } = useQuery({
    queryFn: () => getHistoryTakingById(patientId),
    queryKey: ["historyTaking", patientId],
  });

  const history_data: SharedConsultationTypes[] =
    useMemo(
      () =>
        data?.history_taking_data?.map((d) => ({
          created_by: d.taken_by,
          created_at: d.created_at,
          id: d.id,
          note: d.note,
          patient_id: d.patients_id,
          profile: `${d.profile?.first_name} ${d.profile?.middle_name ?? ""} ${d.profile?.last_name}`,
          is_admission: Boolean(d.is_admission),
        })),
      [data?.history_taking_data]
    ) ?? [];
  return isPending ? (
    <Spinner />
  ) : (
    <DataTable columns={history_taking_column} data={history_data} />
  );
};
