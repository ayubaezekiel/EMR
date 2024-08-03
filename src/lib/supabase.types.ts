export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          appointments_type_id: string
          clinics_id: string
          created_at: string | null
          created_by: string
          duration: unknown | null
          follow_up: boolean | null
          id: string
          is_all_day: boolean | null
          is_checkedin: boolean | null
          is_completed: boolean | null
          is_missed: boolean | null
          is_waiting: boolean | null
          patients_id: string
          specialties_id: string
        }
        Insert: {
          appointments_type_id: string
          clinics_id: string
          created_at?: string | null
          created_by: string
          duration?: unknown | null
          follow_up?: boolean | null
          id?: string
          is_all_day?: boolean | null
          is_checkedin?: boolean | null
          is_completed?: boolean | null
          is_missed?: boolean | null
          is_waiting?: boolean | null
          patients_id: string
          specialties_id: string
        }
        Update: {
          appointments_type_id?: string
          clinics_id?: string
          created_at?: string | null
          created_by?: string
          duration?: unknown | null
          follow_up?: boolean | null
          id?: string
          is_all_day?: boolean | null
          is_checkedin?: boolean | null
          is_completed?: boolean | null
          is_missed?: boolean | null
          is_waiting?: boolean | null
          patients_id?: string
          specialties_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_appointments_type_id_fkey"
            columns: ["appointments_type_id"]
            isOneToOne: false
            referencedRelation: "appointments_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_clinics_id_fkey"
            columns: ["clinics_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patients_id_fkey"
            columns: ["patients_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_specialties_id_fkey"
            columns: ["specialties_id"]
            isOneToOne: false
            referencedRelation: "consultation_specialties"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments_types: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      branch: {
        Row: {
          address: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          address: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          address?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      cash_points: {
        Row: {
          branch_id: string
          clinics_id: string
          created_at: string | null
          id: string
          name: string
          service_type_id: string
        }
        Insert: {
          branch_id: string
          clinics_id: string
          created_at?: string | null
          id?: string
          name: string
          service_type_id: string
        }
        Update: {
          branch_id?: string
          clinics_id?: string
          created_at?: string | null
          id?: string
          name?: string
          service_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cash_points_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cash_points_clinics_id_fkey"
            columns: ["clinics_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cash_points_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["id"]
          },
        ]
      }
      clinics: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      consultation_specialties: {
        Row: {
          created_at: string | null
          default_price: string | null
          follow_up_price: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          default_price?: string | null
          follow_up_price?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          default_price?: string | null
          follow_up_price?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      consultation_templates: {
        Row: {
          content: string
          id: string
          name: string
        }
        Insert: {
          content: string
          id?: string
          name: string
        }
        Update: {
          content?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      document_types: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      history_taking: {
        Row: {
          created_at: string
          id: string
          note: string
          patients_id: string
          taken_by: string
        }
        Insert: {
          created_at?: string
          id?: string
          note: string
          patients_id: string
          taken_by: string
        }
        Update: {
          created_at?: string
          id?: string
          note?: string
          patients_id?: string
          taken_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "history_taking_patients_id_fkey"
            columns: ["patients_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "history_taking_taken_by_fkey1"
            columns: ["taken_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      hmo_companies: {
        Row: {
          address: string
          email: string
          id: string
          name: string
          phone: string
        }
        Insert: {
          address: string
          email: string
          id?: string
          name: string
          phone: string
        }
        Update: {
          address?: string
          email?: string
          id?: string
          name?: string
          phone?: string
        }
        Relationships: []
      }
      hmo_group: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      hmo_plans: {
        Row: {
          branch_id: string | null
          email: string | null
          enrolment_amount: string
          hmo_companies_id: string
          hmo_group_id: string
          id: string
          is_insurance: boolean | null
          logo_url: string | null
          max_number_of_beneficiaries: string
          name: string
          phone: string | null
          sign_up_amount: string
        }
        Insert: {
          branch_id?: string | null
          email?: string | null
          enrolment_amount: string
          hmo_companies_id: string
          hmo_group_id: string
          id?: string
          is_insurance?: boolean | null
          logo_url?: string | null
          max_number_of_beneficiaries: string
          name: string
          phone?: string | null
          sign_up_amount: string
        }
        Update: {
          branch_id?: string | null
          email?: string | null
          enrolment_amount?: string
          hmo_companies_id?: string
          hmo_group_id?: string
          id?: string
          is_insurance?: boolean | null
          logo_url?: string | null
          max_number_of_beneficiaries?: string
          name?: string
          phone?: string | null
          sign_up_amount?: string
        }
        Relationships: [
          {
            foreignKeyName: "insurance_billers_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insurance_billers_hmo_companies_id_fkey"
            columns: ["hmo_companies_id"]
            isOneToOne: false
            referencedRelation: "hmo_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insurance_billers_hmo_group_id_fkey"
            columns: ["hmo_group_id"]
            isOneToOne: false
            referencedRelation: "hmo_group"
            referencedColumns: ["id"]
          },
        ]
      }
      job_positions: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      patient_diagnosis: {
        Row: {
          created_at: string
          id: string
          note: string
          patients_id: string
          taken_by: string
        }
        Insert: {
          created_at?: string
          id?: string
          note: string
          patients_id: string
          taken_by: string
        }
        Update: {
          created_at?: string
          id?: string
          note?: string
          patients_id?: string
          taken_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_diagnosis_patients_id_fkey"
            columns: ["patients_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_diagnosis_taken_by_fkey1"
            columns: ["taken_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_examination: {
        Row: {
          created_at: string
          id: string
          note: string
          patients_id: string
          taken_by: string
        }
        Insert: {
          created_at?: string
          id?: string
          note: string
          patients_id: string
          taken_by: string
        }
        Update: {
          created_at?: string
          id?: string
          note?: string
          patients_id?: string
          taken_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_examination_patients_id_fkey"
            columns: ["patients_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_examination_taken_by_fkey1"
            columns: ["taken_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_vitals: {
        Row: {
          date_created: string
          id: string
          name: string
          patient: string | null
          taken_by: string | null
          unit: string | null
          value: string | null
        }
        Insert: {
          date_created?: string
          id?: string
          name: string
          patient?: string | null
          taken_by?: string | null
          unit?: string | null
          value?: string | null
        }
        Update: {
          date_created?: string
          id?: string
          name?: string
          patient?: string | null
          taken_by?: string | null
          unit?: string | null
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_vitals_patient_fkey"
            columns: ["patient"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_vitals_taken_by_fkey"
            columns: ["taken_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          created_at: string | null
          created_by: string
          dob: string
          first_name: string
          gender: string
          hmo_code: string | null
          hmo_plan_id: string | null
          id: string
          last_name: string
          lga: string
          middle_name: string | null
          next_of_kin: string
          next_of_kin_address: string
          next_of_kin_phone: string
          next_of_kin_relationship: string
          parmanent_home_address: string
          phone: string
          relationship_status: string
          residential_address: string
          state_of_origin: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          dob: string
          first_name: string
          gender: string
          hmo_code?: string | null
          hmo_plan_id?: string | null
          id?: string
          last_name: string
          lga: string
          middle_name?: string | null
          next_of_kin: string
          next_of_kin_address: string
          next_of_kin_phone: string
          next_of_kin_relationship: string
          parmanent_home_address: string
          phone: string
          relationship_status: string
          residential_address: string
          state_of_origin: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          dob?: string
          first_name?: string
          gender?: string
          hmo_code?: string | null
          hmo_plan_id?: string | null
          id?: string
          last_name?: string
          lga?: string
          middle_name?: string | null
          next_of_kin?: string
          next_of_kin_address?: string
          next_of_kin_phone?: string
          next_of_kin_relationship?: string
          parmanent_home_address?: string
          phone?: string
          relationship_status?: string
          residential_address?: string
          state_of_origin?: string
        }
        Relationships: [
          {
            foreignKeyName: "patients_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patients_hmo_plan_id_fkey"
            columns: ["hmo_plan_id"]
            isOneToOne: false
            referencedRelation: "hmo_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          allow_only_financial_admin: boolean | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          allow_only_financial_admin?: boolean | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          allow_only_financial_admin?: boolean | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          ammount: string
          appointments_id: string
          cash_points_id: string
          id: string
          payments_method_id: string
        }
        Insert: {
          ammount: string
          appointments_id: string
          cash_points_id: string
          id?: string
          payments_method_id: string
        }
        Update: {
          ammount?: string
          appointments_id?: string
          cash_points_id?: string
          id?: string
          payments_method_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_appointments_id_fkey"
            columns: ["appointments_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_cash_points_id_fkey"
            columns: ["cash_points_id"]
            isOneToOne: false
            referencedRelation: "cash_points"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_payments_method_id_fkey"
            columns: ["payments_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          has_access_to_accounting: boolean | null
          has_access_to_admin_accounting: boolean | null
          has_access_to_billing: boolean | null
          has_access_to_config: boolean | null
          has_access_to_dialysis_management: boolean | null
          has_access_to_dialysis_records: boolean | null
          has_access_to_doctor_priviledges: boolean | null
          has_access_to_documents: boolean | null
          has_access_to_front_desk: boolean | null
          has_access_to_lab: boolean | null
          has_access_to_nursing: boolean | null
          has_access_to_pharmacy: boolean | null
          has_access_to_pharmacy_admin: boolean | null
          has_access_to_radiology: boolean | null
          has_access_to_radiology_admin: boolean | null
          has_access_to_reports: boolean | null
          has_access_to_users: boolean | null
          id: string
          is_super_user: boolean | null
          user_id: string | null
        }
        Insert: {
          has_access_to_accounting?: boolean | null
          has_access_to_admin_accounting?: boolean | null
          has_access_to_billing?: boolean | null
          has_access_to_config?: boolean | null
          has_access_to_dialysis_management?: boolean | null
          has_access_to_dialysis_records?: boolean | null
          has_access_to_doctor_priviledges?: boolean | null
          has_access_to_documents?: boolean | null
          has_access_to_front_desk?: boolean | null
          has_access_to_lab?: boolean | null
          has_access_to_nursing?: boolean | null
          has_access_to_pharmacy?: boolean | null
          has_access_to_pharmacy_admin?: boolean | null
          has_access_to_radiology?: boolean | null
          has_access_to_radiology_admin?: boolean | null
          has_access_to_reports?: boolean | null
          has_access_to_users?: boolean | null
          id?: string
          is_super_user?: boolean | null
          user_id?: string | null
        }
        Update: {
          has_access_to_accounting?: boolean | null
          has_access_to_admin_accounting?: boolean | null
          has_access_to_billing?: boolean | null
          has_access_to_config?: boolean | null
          has_access_to_dialysis_management?: boolean | null
          has_access_to_dialysis_records?: boolean | null
          has_access_to_doctor_priviledges?: boolean | null
          has_access_to_documents?: boolean | null
          has_access_to_front_desk?: boolean | null
          has_access_to_lab?: boolean | null
          has_access_to_nursing?: boolean | null
          has_access_to_pharmacy?: boolean | null
          has_access_to_pharmacy_admin?: boolean | null
          has_access_to_radiology?: boolean | null
          has_access_to_radiology_admin?: boolean | null
          has_access_to_reports?: boolean | null
          has_access_to_users?: boolean | null
          id?: string
          is_super_user?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          branch_id: string | null
          created_at: string
          department_id: string | null
          email: string
          first_name: string
          gender: string
          id: string
          job_position_id: string | null
          last_name: string
          middle_name: string | null
          user_id: string
        }
        Insert: {
          branch_id?: string | null
          created_at?: string
          department_id?: string | null
          email: string
          first_name: string
          gender: string
          id?: string
          job_position_id?: string | null
          last_name: string
          middle_name?: string | null
          user_id: string
        }
        Update: {
          branch_id?: string | null
          created_at?: string
          department_id?: string | null
          email?: string
          first_name?: string
          gender?: string
          id?: string
          job_position_id?: string | null
          last_name?: string
          middle_name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_job_position_id_fkey"
            columns: ["job_position_id"]
            isOneToOne: false
            referencedRelation: "job_positions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      service_types: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      specialties: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      treatment_plan: {
        Row: {
          created_at: string
          id: string
          note: string
          patients_id: string
          taken_by: string
        }
        Insert: {
          created_at?: string
          id?: string
          note: string
          patients_id: string
          taken_by: string
        }
        Update: {
          created_at?: string
          id?: string
          note?: string
          patients_id?: string
          taken_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "treatment_plan_patients_id_fkey"
            columns: ["patients_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "treatment_plan_taken_by_fkey1"
            columns: ["taken_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      vitals: {
        Row: {
          id: string
          name: string
          unit: string | null
        }
        Insert: {
          id?: string
          name: string
          unit?: string | null
        }
        Update: {
          id?: string
          name?: string
          unit?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
