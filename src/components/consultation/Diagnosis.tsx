import { CreatePatientDiagnosisForm } from "@/forms/consultation/DiagnosisForm";
import { Card, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getDiagnosisById } from "../../actions/actions";
import { DataTable } from "../table/DataTable";
import { patient_diagnosis_column } from "../table/columns/consultation/diagnosis";

export function Diagnosis({
  isAdmission,
  patientId,
}: {
  isAdmission: boolean;
  patientId: string;
}) {
  const { data, isPending } = useQuery({
    queryFn: () => getDiagnosisById(patientId),
    queryKey: ["diagnosis"],
  });

  const diagnosis_data: DB["patient_diagnosis"]["Row"][] =
    useMemo(
      () =>
        data?.diagnosis_data?.map((d) => ({
          ...d,
          profile: `${d.profile?.first_name} ${d.profile?.middle_name ?? ""} ${d.profile?.last_name}`,
        })),
      [data?.diagnosis_data]
    ) ?? [];

  return (
    <div className="grid md:grid-cols-2 md:gap-10 gap-4">
      <Card>
        <CreatePatientDiagnosisForm isAdmission={isAdmission} />
      </Card>
      <div>
        {isPending ? (
          <Spinner />
        ) : (
          <DataTable columns={patient_diagnosis_column} data={diagnosis_data} />
        )}
      </div>
    </div>
  );
}
