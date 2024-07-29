import { Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { patientsQueryOptions } from "../../../../actions/queries";
import PendingComponent from "../../../../components/PendingComponent";
import { DataTable } from "../../../../components/table/DataTable";
import { patients } from "../../../../components/table/columns/patients";

export const Route = createFileRoute("/_layout/dashboard/patients/")({
  component: () => (
    <>
      <Heading mb={"3"}>Patients</Heading>
      <PatientTable />
    </>
  ),
});

const PatientTable = () => {
  const { data, isPending } = useQuery(patientsQueryOptions);
  if (isPending) return <PendingComponent />;

  return (
    <div>
      <DataTable
        filterLabel="filter names...."
        filterer="patients"
        columns={patients}
        data={data?.patient_data ?? []}
      />
    </div>
  );
};
