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
      patient_vitals: {
        Row: {
          id: string
          name: string
          patient: string | null
          unit: string | null
          value: string | null
        }
        Insert: {
          id?: string
          name: string
          patient?: string | null
          unit?: string | null
          value?: string | null
        }
        Update: {
          id?: string
          name?: string
          patient?: string | null
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
      search_appointments:
        | {
            Args: Record<PropertyKey, never>
            Returns: {
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
            }[]
          }
        | {
            Args: {
              date_range: unknown
            }
            Returns: {
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
            }[]
          }
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
