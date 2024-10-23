import { ColumnDef } from "@tanstack/react-table";

export type ConsultationAdmissionTypes = {
  id: string;
  create_by: string;
  created_at: string;
  is_completed: boolean;
  patients_id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  admission_id: string;
  ward_name: string;
  bed_name: string;
  note: string;
  gender?: string;
  dob?: string;
};
export type RequestTypes = {
  id: string;
  taken_by: string;
  created_at: string;
  is_waiting: boolean;
  is_completed: boolean;
  is_approved: boolean;
  is_antenatal: boolean;
  is_consumable: boolean;
  is_procedure: boolean;
  is_radiology: boolean;
  is_lab: boolean;
  is_pharm: boolean;
  services: string;
  patients_id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
};
export const request_columns: ColumnDef<RequestTypes>[] = [
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
    accessorKey: "taken_by",
    header: "Taken By",
  },
  {
    accessorKey: "services",
    header: "Services",
  },
  {
    accessorKey: "patients_id",
    header: "Patient Id",
  },
];

export const admission_consultation_columns: ColumnDef<ConsultationAdmissionTypes>[] =
  [
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
      accessorKey: "create_by",
      header: "Created By",
    },
    {
      accessorKey: "patients_id",
      header: "Patient Id",
    },
    {
      accessorKey: "bed_name",
      header: "Bed",
    },
    {
      accessorKey: "ward_name",
      header: "Ward",
    },
    {
      accessorKey: "note",
      header: "Note",
    },
  ];
