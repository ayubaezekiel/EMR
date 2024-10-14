import { ColumnDef } from "@tanstack/react-table";

export type AppointmentCardType = {
  id: string;
  is_missed: boolean;
  is_waiting: boolean;
  is_completed: boolean;
  is_checkedin: boolean;
  created_at: string;
  duration: string;
  appointment_types: string;
  patients_id: string;
  clinics_name: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
};
export const appointment_columns: ColumnDef<AppointmentCardType>[] = [
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
    accessorKey: "appointment_types",
    header: "Appointment Type",
  },
  {
    accessorKey: "clinics_name",
    header: "Clinic Name",
  },
  {
    accessorKey: "patients_id",
    header: "Patient Id",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
];
