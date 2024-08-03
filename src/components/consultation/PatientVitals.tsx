import { useParams } from "@tanstack/react-router";
import { useStepper } from "../stepper";
import { useQuery } from "@tanstack/react-query";
import { getPatientVitalsById } from "../../actions/actions";
import PendingComponent from "../PendingComponent";
import { DataTable } from "../table/DataTable";
import { patient_vitals_column } from "../table/columns/vitals";
import { Button, Flex } from "@radix-ui/themes";

export function PatientVitals() {
  const { nextStep } = useStepper();

  const { appointmentId } = useParams({
    from: "/_layout/dashboard/appointments/$appointmentId",
  });
  const { data, isPending } = useQuery({
    queryFn: () => getPatientVitalsById(appointmentId),
    queryKey: ["patientVitalsById"],
  });

  if (isPending) return <PendingComponent />;
  return (
    <div>
      <DataTable
        columns={patient_vitals_column}
        data={data?.patient_vitals_data ?? []}
        filterLabel="search by name..."
        filterer="name"
      />

      <Flex justify={"end"}>
        <Button type="submit" onClick={nextStep} size={"4"}>
          Next
        </Button>
      </Flex>
    </div>
  );
}
