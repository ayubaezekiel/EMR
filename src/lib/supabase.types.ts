
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
      admission_consultations: {
        Row: {
          admission_id: string
          branch_id: string
          created_at: string | null
          id: string
          is_completed: boolean | null
          note: string
        }
        Insert: {
          admission_id: string
          branch_id: string
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          note: string
        }
        Update: {
          admission_id?: string
          branch_id?: string
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          note?: string
        }
        Relationships: [
          {
            foreignKeyName: "admission_consultations_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admission_consultations_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      admissions: {
        Row: {
          admitted_by: string
          beds_id: string | null
          branch_id: string
          created_at: string | null
          dischard_date: string | null
          id: string
          is_active: boolean | null
          is_approved: boolean | null
          is_critical: boolean | null
          is_discharged: boolean | null
          patient_id: string
          wards_id: string
        }
        Insert: {
          admitted_by: string
          beds_id?: string | null
          branch_id: string
          created_at?: string | null
          dischard_date?: string | null
          id?: string
          is_active?: boolean | null
          is_approved?: boolean | null
          is_critical?: boolean | null
          is_discharged?: boolean | null
          patient_id: string
          wards_id: string
        }
        Update: {
          admitted_by?: string
          beds_id?: string | null
          branch_id?: string
          created_at?: string | null
          dischard_date?: string | null
          id?: string
          is_active?: boolean | null
          is_approved?: boolean | null
          is_critical?: boolean | null
          is_discharged?: boolean | null
          patient_id?: string
          wards_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admissions_admitted_by_fkey1"
            columns: ["admitted_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admissions_beds_id_fkey"
            columns: ["beds_id"]
            isOneToOne: false
            referencedRelation: "beds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admissions_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admissions_wards_id_fkey"
            columns: ["wards_id"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["id"]
          },
        ]
      }
      anaesthesia: {
        Row: {
          anaesthesia_type_id: string | null
          branch_id: string
          created_at: string | null
          default_price: string | null
          id: string
          name: string
        }
        Insert: {
          anaesthesia_type_id?: string | null
          branch_id: string
          created_at?: string | null
          default_price?: string | null
          id?: string
          name: string
        }
        Update: {
          anaesthesia_type_id?: string | null
          branch_id?: string
          created_at?: string | null
          default_price?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "anaesthesia_anaesthesia_type_id_fkey"
            columns: ["anaesthesia_type_id"]
            isOneToOne: false
            referencedRelation: "anaesthesia_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anaesthesia_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      anaesthesia_type: {
        Row: {
          branch_id: string
          created_at: string | null
          id: string
          title: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          id?: string
          title: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "anaesthesia_type_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      antenatal_package: {
        Row: {
          branch_id: string
          created_at: string | null
          default_price: number | null
          id: string
          name: string
          with_delivary: boolean | null
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          default_price?: number | null
          id?: string
          name: string
          with_delivary?: boolean | null
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          default_price?: number | null
          id?: string
          name?: string
          with_delivary?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "antenatal_package_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      appointment_types: {
        Row: {
          branch_id: string
          created_at: string | null
          default_price: string | null
          follow_up_price: string | null
          id: string
          name: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          default_price?: string | null
          follow_up_price?: string | null
          id?: string
          name: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          default_price?: string | null
          follow_up_price?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointment_types_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          appointment_types_id: string | null
          branch_id: string
          clinics_id: string
          created_at: string | null
          created_by: string
          duration: unknown | null
          follow_up: boolean | null
          id: string
          is_all_day: boolean | null
          is_approved: boolean | null
          is_checkedin: boolean | null
          is_completed: boolean | null
          is_missed: boolean | null
          is_waiting: boolean | null
          patients_id: string
        }
        Insert: {
          appointment_types_id?: string | null
          branch_id: string
          clinics_id: string
          created_at?: string | null
          created_by: string
          duration?: unknown | null
          follow_up?: boolean | null
          id?: string
          is_all_day?: boolean | null
          is_approved?: boolean | null
          is_checkedin?: boolean | null
          is_completed?: boolean | null
          is_missed?: boolean | null
          is_waiting?: boolean | null
          patients_id: string
        }
        Update: {
          appointment_types_id?: string | null
          branch_id?: string
          clinics_id?: string
          created_at?: string | null
          created_by?: string
          duration?: unknown | null
          follow_up?: boolean | null
          id?: string
          is_all_day?: boolean | null
          is_approved?: boolean | null
          is_checkedin?: boolean | null
          is_completed?: boolean | null
          is_missed?: boolean | null
          is_waiting?: boolean | null
          patients_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_appointment_types_id_fkey"
            columns: ["appointment_types_id"]
            isOneToOne: false
            referencedRelation: "appointment_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
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
            foreignKeyName: "appointments_created_by_fkey1"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patients_id_fkey"
            columns: ["patients_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      beds: {
        Row: {
          branch_id: string
          created_at: string | null
          default_price: string
          id: string
          is_available: boolean | null
          name: string
          ward_id: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          default_price: string
          id?: string
          is_available?: boolean | null
          name: string
          ward_id: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          default_price?: string
          id?: string
          is_available?: boolean | null
          name?: string
          ward_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "beds_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "beds_ward_id_fkey"
            columns: ["ward_id"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["id"]
          },
        ]
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
        }
        Insert: {
          branch_id: string
          clinics_id: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          branch_id?: string
          clinics_id?: string
          created_at?: string | null
          id?: string
          name?: string
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
        ]
      }
      center: {
        Row: {
          address: string
          date_created: string | null
          footer: string | null
          id: string
          lga: string
          logo_url: string
          name: string
          state: string
          vailid_till: string
        }
        Insert: {
          address: string
          date_created?: string | null
          footer?: string | null
          id?: string
          lga: string
          logo_url: string
          name: string
          state: string
          vailid_till: string
        }
        Update: {
          address?: string
          date_created?: string | null
          footer?: string | null
          id?: string
          lga?: string
          logo_url?: string
          name?: string
          state?: string
          vailid_till?: string
        }
        Relationships: []
      }
      clinics: {
        Row: {
          branch_id: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "clinics_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          branch_id: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnosis: {
        Row: {
          branch_id: string
          id: string
          name: string
        }
        Insert: {
          branch_id: string
          id?: string
          name: string
        }
        Update: {
          branch_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "diagnosis_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      document_reports: {
        Row: {
          branch_id: string
          created_at: string | null
          created_by: string
          document_type_id: string
          file_url: string
          id: string
          title: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          created_by: string
          document_type_id: string
          file_url: string
          id?: string
          title: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          created_by?: string
          document_type_id?: string
          file_url?: string
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_reports_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_reports_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_reports_document_type_id_fkey"
            columns: ["document_type_id"]
            isOneToOne: false
            referencedRelation: "document_types"
            referencedColumns: ["id"]
          },
        ]
      }
      document_types: {
        Row: {
          branch_id: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          branch_id?: string | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          branch_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_types_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      drug_or_generic: {
        Row: {
          branch_id: string | null
          created_at: string | null
          created_by: string
          default_price: string
          drug_or_generic_brand_id: string
          id: string
          is_consumable: boolean | null
          name: string
          quantity: number
          quantity_type_id: string | null
          total_quantity: number | null
        }
        Insert: {
          branch_id?: string | null
          created_at?: string | null
          created_by: string
          default_price: string
          drug_or_generic_brand_id: string
          id?: string
          is_consumable?: boolean | null
          name: string
          quantity: number
          quantity_type_id?: string | null
          total_quantity?: number | null
        }
        Update: {
          branch_id?: string | null
          created_at?: string | null
          created_by?: string
          default_price?: string
          drug_or_generic_brand_id?: string
          id?: string
          is_consumable?: boolean | null
          name?: string
          quantity?: number
          quantity_type_id?: string | null
          total_quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "drug_or_generic_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drug_or_generic_created_by_fkey1"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drug_or_generic_drug_or_generic_brand_id_fkey"
            columns: ["drug_or_generic_brand_id"]
            isOneToOne: false
            referencedRelation: "drug_or_generic_brand"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drug_or_generic_quantity_type_id_fkey"
            columns: ["quantity_type_id"]
            isOneToOne: false
            referencedRelation: "quantity_type"
            referencedColumns: ["id"]
          },
        ]
      }
      drug_or_generic_brand: {
        Row: {
          branch_id: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          branch_id?: string | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          branch_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "drug_or_generic_brand_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      fluid_routes: {
        Row: {
          branch_id: string | null
          created_at: string | null
          id: string
          name: string
          type: string
        }
        Insert: {
          branch_id?: string | null
          created_at?: string | null
          id?: string
          name: string
          type: string
        }
        Update: {
          branch_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "fluid_routes_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      history_taking: {
        Row: {
          branch_id: string | null
          created_at: string
          id: string
          is_admission: boolean | null
          note: string
          patients_id: string
          taken_by: string
        }
        Insert: {
          branch_id?: string | null
          created_at?: string
          id?: string
          is_admission?: boolean | null
          note: string
          patients_id: string
          taken_by: string
        }
        Update: {
          branch_id?: string | null
          created_at?: string
          id?: string
          is_admission?: boolean | null
          note?: string
          patients_id?: string
          taken_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "history_taking_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
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
          branch_id: string
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string
        }
        Insert: {
          address: string
          branch_id: string
          created_at?: string | null
          email: string
          id?: string
          name: string
          phone: string
        }
        Update: {
          address?: string
          branch_id?: string
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string
        }
        Relationships: [
          {
            foreignKeyName: "hmo_companies_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      hmo_group: {
        Row: {
          branch_id: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "hmo_group_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      hmo_plans: {
        Row: {
          branch_id: string
          created_at: string | null
          enrolment_amount: string
          hmo_companies_id: string
          hmo_group_id: string
          id: string
          max_number_of_beneficiaries: string
          name: string
          sign_up_amount: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          enrolment_amount: string
          hmo_companies_id: string
          hmo_group_id: string
          id?: string
          max_number_of_beneficiaries: string
          name: string
          sign_up_amount: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          enrolment_amount?: string
          hmo_companies_id?: string
          hmo_group_id?: string
          id?: string
          max_number_of_beneficiaries?: string
          name?: string
          sign_up_amount?: string
        }
        Relationships: [
          {
            foreignKeyName: "hmo_plans_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hmo_plans_hmo_companies_id_fkey"
            columns: ["hmo_companies_id"]
            isOneToOne: false
            referencedRelation: "hmo_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hmo_plans_hmo_group_id_fkey"
            columns: ["hmo_group_id"]
            isOneToOne: false
            referencedRelation: "hmo_group"
            referencedColumns: ["id"]
          },
        ]
      }
      imaging: {
        Row: {
          branch_id: string
          created_at: string | null
          default_price: string | null
          id: string
          imaging_category_id: string
          name: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          default_price?: string | null
          id?: string
          imaging_category_id: string
          name: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          default_price?: string | null
          id?: string
          imaging_category_id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "imaging_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "imaging_imaging_category_id_fkey"
            columns: ["imaging_category_id"]
            isOneToOne: false
            referencedRelation: "imaging_category"
            referencedColumns: ["id"]
          },
        ]
      }
      imaging_category: {
        Row: {
          branch_id: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "imaging_category_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      job_positions: {
        Row: {
          branch_id: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_positions_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_reports: {
        Row: {
          created_by: string
          id: string
          request_id: string
          results: Json
        }
        Insert: {
          created_by: string
          id?: string
          request_id: string
          results: Json
        }
        Update: {
          created_by?: string
          id?: string
          request_id?: string
          results?: Json
        }
        Relationships: [
          {
            foreignKeyName: "lab_reports_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_reports_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "requests"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_specimen: {
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
      lab_test_category: {
        Row: {
          branch_id: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_test_category_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_test_parameter: {
        Row: {
          branch_id: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_test_parameter_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_test_template: {
        Row: {
          branch_id: string
          created_at: string | null
          id: string
          name: string
          parameters: Json
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          id?: string
          name: string
          parameters: Json
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          id?: string
          name?: string
          parameters?: Json
        }
        Relationships: [
          {
            foreignKeyName: "lab_test_template_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_tests: {
        Row: {
          branch_id: string
          created_at: string | null
          default_price: string | null
          id: string
          lab_test_category_id: string
          name: string
          template_id: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          default_price?: string | null
          id?: string
          lab_test_category_id: string
          name: string
          template_id: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          default_price?: string | null
          id?: string
          lab_test_category_id?: string
          name?: string
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_tests_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_tests_lab_test_category_id_fkey"
            columns: ["lab_test_category_id"]
            isOneToOne: false
            referencedRelation: "lab_test_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_tests_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "lab_test_template"
            referencedColumns: ["id"]
          },
        ]
      }
      nursing_report: {
        Row: {
          branch_id: string
          created_at: string | null
          created_by: string
          id: string
          is_progress_note: boolean | null
          note: string
          patient_id: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          created_by: string
          id?: string
          is_progress_note?: boolean | null
          note: string
          patient_id: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          created_by?: string
          id?: string
          is_progress_note?: boolean | null
          note?: string
          patient_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nursing_report_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nursing_report_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nursing_report_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_diagnosis: {
        Row: {
          branch_id: string
          created_at: string
          diagnosis: Json
          id: string
          is_admission: boolean | null
          patients_id: string
          taken_by: string
        }
        Insert: {
          branch_id: string
          created_at?: string
          diagnosis: Json
          id?: string
          is_admission?: boolean | null
          patients_id: string
          taken_by: string
        }
        Update: {
          branch_id?: string
          created_at?: string
          diagnosis?: Json
          id?: string
          is_admission?: boolean | null
          patients_id?: string
          taken_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_diagnosis_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
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
          branch_id: string
          created_at: string
          id: string
          is_admission: boolean | null
          note: string
          patients_id: string
          taken_by: string
        }
        Insert: {
          branch_id: string
          created_at?: string
          id?: string
          is_admission?: boolean | null
          note: string
          patients_id: string
          taken_by: string
        }
        Update: {
          branch_id?: string
          created_at?: string
          id?: string
          is_admission?: boolean | null
          note?: string
          patients_id?: string
          taken_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_examination_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
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
          branch_id: string
          created_at: string | null
          date_created: string
          id: string
          is_admission: boolean | null
          patient_id: string | null
          taken_by: string
          vitals: Json | null
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          date_created?: string
          id?: string
          is_admission?: boolean | null
          patient_id?: string | null
          taken_by: string
          vitals?: Json | null
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          date_created?: string
          id?: string
          is_admission?: boolean | null
          patient_id?: string | null
          taken_by?: string
          vitals?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_vitals_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_vitals_patient_id_fkey"
            columns: ["patient_id"]
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
          branch_id: string
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
          branch_id: string
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
          branch_id?: string
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
            foreignKeyName: "patients_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patients_created_by_fkey1"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
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
          branch_id: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          allow_only_financial_admin?: boolean | null
          branch_id: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          allow_only_financial_admin?: boolean | null
          branch_id?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_methods_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          admissions_id: string | null
          amount: string
          appointment_id: string | null
          approved_by: string | null
          branch_id: string
          cash_points_id: string
          created_at: string | null
          id: string
          is_admission: boolean | null
          is_appointment: boolean | null
          is_request: boolean | null
          patient_id: string
          payments_method_id: string
          request_id: string | null
          services: Json | null
        }
        Insert: {
          admissions_id?: string | null
          amount: string
          appointment_id?: string | null
          approved_by?: string | null
          branch_id: string
          cash_points_id: string
          created_at?: string | null
          id?: string
          is_admission?: boolean | null
          is_appointment?: boolean | null
          is_request?: boolean | null
          patient_id: string
          payments_method_id: string
          request_id?: string | null
          services?: Json | null
        }
        Update: {
          admissions_id?: string | null
          amount?: string
          appointment_id?: string | null
          approved_by?: string | null
          branch_id?: string
          cash_points_id?: string
          created_at?: string | null
          id?: string
          is_admission?: boolean | null
          is_appointment?: boolean | null
          is_request?: boolean | null
          patient_id?: string
          payments_method_id?: string
          request_id?: string | null
          services?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_admissions_id_fkey"
            columns: ["admissions_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
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
            foreignKeyName: "payments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_payments_method_id_fkey"
            columns: ["payments_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "requests"
            referencedColumns: ["id"]
          },
        ]
      }
      procedure: {
        Row: {
          anaesthesia_id: string
          branch_id: string
          created_at: string | null
          id: string
          is_theatre: boolean | null
          name: string
          procedure_category_id: string
          procedure_price: string | null
          surgeon_price: string | null
          theatre_id: string | null
        }
        Insert: {
          anaesthesia_id: string
          branch_id: string
          created_at?: string | null
          id?: string
          is_theatre?: boolean | null
          name: string
          procedure_category_id: string
          procedure_price?: string | null
          surgeon_price?: string | null
          theatre_id?: string | null
        }
        Update: {
          anaesthesia_id?: string
          branch_id?: string
          created_at?: string | null
          id?: string
          is_theatre?: boolean | null
          name?: string
          procedure_category_id?: string
          procedure_price?: string | null
          surgeon_price?: string | null
          theatre_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "procedure_anaesthesia_id_fkey"
            columns: ["anaesthesia_id"]
            isOneToOne: false
            referencedRelation: "anaesthesia"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "procedure_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "procedure_procedure_category_id_fkey"
            columns: ["procedure_category_id"]
            isOneToOne: false
            referencedRelation: "procedure_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "procedure_theatre_id_fkey"
            columns: ["theatre_id"]
            isOneToOne: false
            referencedRelation: "theatre"
            referencedColumns: ["id"]
          },
        ]
      }
      procedure_category: {
        Row: {
          branch_id: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "procedure_category_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          branch_id: string | null
          can_issue_request: boolean | null
          can_switch_branch: boolean | null
          created_at: string
          department_id: string | null
          email: string | null
          first_name: string | null
          gender: string | null
          has_access_to_accounting: boolean | null
          has_access_to_admission: boolean | null
          has_access_to_billing: boolean | null
          has_access_to_config: boolean | null
          has_access_to_doctor_priviledges: boolean | null
          has_access_to_documents: boolean | null
          has_access_to_lab: boolean | null
          has_access_to_nursing: boolean | null
          has_access_to_pharmacy: boolean | null
          has_access_to_radiology: boolean | null
          has_access_to_reports: boolean | null
          has_access_to_users: boolean | null
          id: string
          is_super_user: boolean | null
          job_position_id: string | null
          last_name: string | null
          middle_name: string | null
          user_id: string
        }
        Insert: {
          branch_id?: string | null
          can_issue_request?: boolean | null
          can_switch_branch?: boolean | null
          created_at?: string
          department_id?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          has_access_to_accounting?: boolean | null
          has_access_to_admission?: boolean | null
          has_access_to_billing?: boolean | null
          has_access_to_config?: boolean | null
          has_access_to_doctor_priviledges?: boolean | null
          has_access_to_documents?: boolean | null
          has_access_to_lab?: boolean | null
          has_access_to_nursing?: boolean | null
          has_access_to_pharmacy?: boolean | null
          has_access_to_radiology?: boolean | null
          has_access_to_reports?: boolean | null
          has_access_to_users?: boolean | null
          id?: string
          is_super_user?: boolean | null
          job_position_id?: string | null
          last_name?: string | null
          middle_name?: string | null
          user_id: string
        }
        Update: {
          branch_id?: string | null
          can_issue_request?: boolean | null
          can_switch_branch?: boolean | null
          created_at?: string
          department_id?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          has_access_to_accounting?: boolean | null
          has_access_to_admission?: boolean | null
          has_access_to_billing?: boolean | null
          has_access_to_config?: boolean | null
          has_access_to_doctor_priviledges?: boolean | null
          has_access_to_documents?: boolean | null
          has_access_to_lab?: boolean | null
          has_access_to_nursing?: boolean | null
          has_access_to_pharmacy?: boolean | null
          has_access_to_radiology?: boolean | null
          has_access_to_reports?: boolean | null
          has_access_to_users?: boolean | null
          id?: string
          is_super_user?: boolean | null
          job_position_id?: string | null
          last_name?: string | null
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
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      quantity_type: {
        Row: {
          branch_id: string
          created_at: string | null
          id: string
          name: string | null
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quantity_type_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      radiology_results: {
        Row: {
          created_by: string
          id: string
          request_id: string
          results: string
        }
        Insert: {
          created_by: string
          id?: string
          request_id: string
          results: string
        }
        Update: {
          created_by?: string
          id?: string
          request_id?: string
          results?: string
        }
        Relationships: [
          {
            foreignKeyName: "radioogy_resultd_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "radioogy_resultd_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "requests"
            referencedColumns: ["id"]
          },
        ]
      }
      requests: {
        Row: {
          branch_id: string
          created_at: string
          id: string
          is_antenatal: boolean | null
          is_approved: boolean | null
          is_completed: boolean | null
          is_consumable: boolean | null
          is_lab: boolean | null
          is_pharm: boolean | null
          is_procedure: boolean | null
          is_radiology: boolean | null
          is_waiting: boolean | null
          patients_id: string
          services: Json | null
          taken_by: string
        }
        Insert: {
          branch_id: string
          created_at?: string
          id?: string
          is_antenatal?: boolean | null
          is_approved?: boolean | null
          is_completed?: boolean | null
          is_consumable?: boolean | null
          is_lab?: boolean | null
          is_pharm?: boolean | null
          is_procedure?: boolean | null
          is_radiology?: boolean | null
          is_waiting?: boolean | null
          patients_id: string
          services?: Json | null
          taken_by: string
        }
        Update: {
          branch_id?: string
          created_at?: string
          id?: string
          is_antenatal?: boolean | null
          is_approved?: boolean | null
          is_completed?: boolean | null
          is_consumable?: boolean | null
          is_lab?: boolean | null
          is_pharm?: boolean | null
          is_procedure?: boolean | null
          is_radiology?: boolean | null
          is_waiting?: boolean | null
          patients_id?: string
          services?: Json | null
          taken_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_request_patients_id_fkey"
            columns: ["patients_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requests_taken_by_fkey"
            columns: ["taken_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      specialties: {
        Row: {
          branch_id: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "specialties_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          branch_id: string
          content: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          branch_id: string
          content: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          branch_id?: string
          content?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultation_templates_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      theatre: {
        Row: {
          branch_id: string
          created_at: string | null
          default_price: string
          id: string
          name: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          default_price: string
          id?: string
          name: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          default_price?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "theatre_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      treatment_plan: {
        Row: {
          branch_id: string
          created_at: string
          id: string
          is_admission: boolean | null
          note: string
          patients_id: string
          taken_by: string
        }
        Insert: {
          branch_id: string
          created_at?: string
          id?: string
          is_admission?: boolean | null
          note: string
          patients_id: string
          taken_by: string
        }
        Update: {
          branch_id?: string
          created_at?: string
          id?: string
          is_admission?: boolean | null
          note?: string
          patients_id?: string
          taken_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "treatment_plan_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
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
          branch_id: string
          created_at: string | null
          id: string
          name: string
          unit: string | null
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          id?: string
          name: string
          unit?: string | null
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          id?: string
          name?: string
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vitals_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
      wards: {
        Row: {
          branch_id: string
          created_at: string | null
          default_price: string
          id: string
          is_labor: boolean | null
          name: string
        }
        Insert: {
          branch_id: string
          created_at?: string | null
          default_price: string
          id?: string
          is_labor?: boolean | null
          name: string
        }
        Update: {
          branch_id?: string
          created_at?: string | null
          default_price?: string
          id?: string
          is_labor?: boolean | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "wards_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branch"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      mark_appointments_as_completed: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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
