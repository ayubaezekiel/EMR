import { PatientForm } from "@/forms/PatientForm";
import { Card, Heading, Spinner } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { usePatientsQuery } from "../../../../actions/queries";
import { DataTable } from "../../../../components/table/DataTable";
import { patients } from "../../../../components/table/columns/patients";
import { CreateAppointmentForm } from "@/forms/AppointmentForm";

export const Route = createFileRoute("/_layout/dashboard/patients/")({
  component: () => (
    <>
      <Card variant="ghost" my={"4"} style={{ background: "var(--accent-2)" }}>
        <div className="flex justify-between flex-col gap-2 md:flex-row">
          <Heading mb={"3"}>Patient Registration</Heading>
          <PatientForm />
        </div>
      </Card>

      <PatientTable />
    </>
  ),
});

const PatientTable = () => {
  const { data, isPending } = usePatientsQuery();

  const patient_data =
    useMemo(
      () =>
        data?.patient_data?.map((p) => ({
          ...p,
          hmo_plans: p.hmo_plans?.name,
        })),
      [data?.patient_data]
    ) ?? [];

  const { id, schedule } = Route.useSearch<{ schedule: boolean; id: string }>();

  return (
    <div>
      {isPending ? (
        <Spinner />
      ) : (
        <div>
          <DataTable columns={patients} data={patient_data} />
          {schedule && id && (
            <CreateAppointmentForm
              isSchedule={schedule}
              patientId={id}
              key={id}
            />
          )}
        </div>
      )}
    </div>
  );
};
