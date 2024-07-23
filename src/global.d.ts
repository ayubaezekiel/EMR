import type { Database } from "./lib/supabase.types";

declare global {
    type DB = Database['public']['Tables']
    type AppointmentType = DB['appointments']
    type AppointmentTypeType = DB['appointments_types']
    type ClinicsType = DB['clinics']
    type CashpointType = DB['cash_points']
    type JobPostionType = DB['job_positions']
    type BranchType = DB['branch']
    type PaymentMethodType = DB['payment_methods']
    type DepartmentType = DB['departments']
}