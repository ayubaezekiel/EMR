import { ColumnDef } from "@tanstack/react-table";

export type AdmissionTypes = {
  id: string;
  is_active: boolean;
  is_discharged: boolean;
  is_critical: boolean;
  is_approved: boolean;
  admitted_by: string;
  created_at: string;
  beds: string;
  wards: string;
  patients_id: string;
  discharge_date: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
};
export const admission_columns: ColumnDef<AdmissionTypes>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "middle_name",
    header: "Middle Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "admitted_by",
    header: "Admitted By",
  },
  {
    accessorKey: "bed",
    header: "Bed",
  },
  {
    accessorKey: "patients_id",
    header: "Patient Id",
  },
  {
    accessorKey: "ward",
    header: "Ward",
  },
];
