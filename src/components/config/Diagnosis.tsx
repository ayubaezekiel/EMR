import { CreateDiagnosisForm } from "@/forms/config/DiagnosisForm";
import { useDiagnosis } from "@/lib/hooks";
import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { DataTable } from "../table/DataTable";
import { diagnosis_column } from "../table/columns/diagnosis";

export function Diagnosis() {
  const { diagnosis_data, isDiagnosisPending } = useDiagnosis();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Diagnosis</Heading>
        <CreateDiagnosisForm />
      </Flex>
      {isDiagnosisPending ? (
        <Spinner />
      ) : (
        <DataTable
          columns={diagnosis_column}
          data={diagnosis_data?.diagnosis_data ?? []}
        />
      )}
    </div>
  );
}
