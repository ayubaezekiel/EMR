import { Heading } from "@radix-ui/themes";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { toast } from "sonner";
import { DataTable } from "../../components/table/DataTable";
import {
  NewPatientType,
  patients,
} from "../../components/table/columns/patients";
import supabase from "../../supabase/client";

export const Route = createFileRoute("/_layout/dashboard/patients")({
  loader: async () => {
    const { data: patient_data, error: patient_error } = await supabase
      .from("patients")
      .select("*,insurance_plan(name)");
    const { data, error } = await supabase.from("insurance_plan").select("*");
    if (error || patient_error) {
      toast.error(error?.message || patient_error?.message);
    }
    const loadedData = {
      insurance_plan: data,
      patient_data: patient_data,
    };
    return loadedData;
  },
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

  const all_patients: NewPatientType[] =
    patient_data?.map((p) => ({
      ...p,
      insurance_plan: {
        name: `${p.insurance_plan?.name}`,
      },
    })) ?? [];

  return (
    <div>
      <DataTable
        filterLabel="filter names...."
        filterer="patients"
        columns={patients}
        data={all_patients}
      />
    </div>
  );
};
