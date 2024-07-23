import { Heading } from "@radix-ui/themes";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { getHMOPlans, getPatients } from "../../../actions/actions";
import { DataTable } from "../../../components/table/DataTable";
import { patients } from "../../../components/table/columns/patients";

const loadData = async () => {
  const { patient_data } = await getPatients();
  const { hmo_plans_data } = await getHMOPlans();

  return { patient_data, hmo_plans_data };
};

export const Route = createFileRoute("/_layout/dashboard/patients")({
  loader: loadData,
  component: () => (
    <>
      <Heading mb={"3"}>Patients</Heading>
      <PatientTable />
    </>
  ),
});

const PatientTable = () => {
  const { patient_data } = useLoaderData({
    from: "/_layout/dashboard/patients",
  });

  return (
    <div>
      <DataTable
        filterLabel="filter names...."
        filterer="patients"
        columns={patients}
        data={patient_data ?? []}
      />
    </div>
  );
};
