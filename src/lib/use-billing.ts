import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useMemo } from "react";
import request, { gql } from "graphql-request";
import supabase from "@/supabase/client";

const supabaseKey = import.meta.env.VITE_SUPABASE_ANON;
const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;

if (!supabaseKey || !supabaseUrl) {
  throw new Error("Missing Supabase environment variables");
}

const BILLING_QUERY = gql`
  query BillingQuery($isCompleted: Boolean!) {
    patientsCollection {
      edges {
        node {
          id
          first_name
          middle_name
          last_name
          appointmentsCollection(
            filter: { is_completed: { eq: $isCompleted } }
          ) {
            edges {
              node {
                id
                follow_up
                is_waiting
                is_completed
                is_checkedin
                is_missed
                duration
                is_approved
                created_at
                profile {
                  id
                  first_name
                  middle_name
                  last_name
                }
                clinics {
                  id
                  name
                }
                appointment_types {
                  name
                  default_price
                  follow_up_price
                }
              }
            }
          }
          admissionsCollection(
            filter: { is_discharged: { eq: $isCompleted } }
          ) {
            edges {
              node {
                id
                dischard_date
                is_critical
                is_approved
                is_active
                is_discharged
                created_at
                beds {
                  name
                  default_price
                }
                wards {
                  name
                  default_price
                }
                profile {
                  first_name
                  middle_name
                  last_name
                }
              }
            }
          }
          requestsCollection(filter: { is_completed: { eq: $isCompleted } }) {
            edges {
              node {
                id
                profile {
                  id
                  first_name
                  middle_name
                  last_name
                }
                created_at
                patients_id
                services
                is_approved
                is_completed
                is_waiting
                is_lab
                is_pharm
                is_antenatal
                is_procedure
                is_consumable
                is_radiology
              }
            }
          }
        }
      }
    }
  }
`;

interface Profile {
  id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
}

interface Clinic {
  id: string;
  name: string;
}

interface AppointmentType {
  name: string;
  default_price: number;
  follow_up_price: number;
}

interface Appointment {
  id: string;
  follow_up: boolean;
  is_waiting: boolean;
  is_completed: boolean;
  is_checkedin: boolean;
  is_missed: boolean;
  duration: number;
  is_approved: boolean;
  created_at: string;
  profile: Profile;
  clinics: Clinic;
  appointment_types: AppointmentType;
}

interface Bed {
  name: string;
  default_price: string;
}

interface Ward {
  name: string;
  default_price: string;
}

interface Admission {
  id: string;
  dischard_date: string | null;
  is_critical: boolean;
  is_approved: boolean;
  is_active: boolean;
  is_discharged: boolean;
  created_at: string;
  beds: Bed;
  wards: Ward;
  profile: Profile;
}

interface Request {
  id: string;
  profile: Profile;
  created_at: string;
  patients_id: string;
  services: string;
  is_approved: boolean;
  is_completed: boolean;
  is_waiting: boolean;
  is_lab: boolean;
  is_pharm: boolean;
  is_antenatal: boolean;
  is_procedure: boolean;
  is_consumable: boolean;
  is_radiology: boolean;
}

export interface Patient {
  id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  appointmentsCollection: {
    edges: Array<{
      node: Appointment;
    }>;
  };
  admissionsCollection: {
    edges: Array<{
      node: Admission;
    }>;
  };
  requestsCollection: {
    edges: Array<{
      node: Request;
    }>;
  };
}

export interface BillingQueryResult {
  patientsCollection: {
    edges: Array<{
      node: Patient;
    }>;
  };
}

export function useBillingQuery(
  isCompleted: boolean = true
): UseQueryResult<BillingQueryResult, Error> {
  const query = useQuery<BillingQueryResult, Error>({
    queryKey: ["billingData", isCompleted],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      const headers = {
        apikey: supabaseKey,
        authorization: token ? `Bearer ${token}` : "",
      };

      try {
        const data = await request<BillingQueryResult>(
          `${supabaseUrl}/graphql/v1`,
          BILLING_QUERY,
          { isCompleted },
          headers
        );
        return data;
      } catch (error) {
        console.error("GraphQL query error:", error);
        throw error;
      }
    },
  });

  const filteredData = useMemo(() => {
    if (!query.data) return null;

    return {
      ...query.data,
      patientsCollection: {
        edges: query.data.patientsCollection.edges.filter(({ node }) => {
          return (
            node.appointmentsCollection.edges.length > 0 ||
            node.admissionsCollection.edges.length > 0 ||
            node.requestsCollection.edges.length > 0
          );
        }),
      },
    };
  }, [query.data]);

  return {
    ...query,
    data: filteredData,
  } as UseQueryResult<BillingQueryResult, Error>;
}
