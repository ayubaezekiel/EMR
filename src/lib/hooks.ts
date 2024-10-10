import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase/client";
import { getProfile, getResults } from "./utils";
import { toast } from "sonner";
import { getAllDiagnosis } from "@/actions/actions";

export const useAntenatalPackage = () => {
  const { profile_data } = useProfile();

  const { data: antenatal_package_data, isPending: isAntenatalPackagePending } =
    useQuery({
      queryFn: async () => {
        const { data } = await supabase
          .from("antenatal_package")
          .select("*")
          .eq("branch_id", profile_data?.branch_id as string);
        return data;
      },
      queryKey: ["antenatalPackage"],
    });
  return { antenatal_package_data, isAntenatalPackagePending };
};

export const useRequestById = ({ patientId }: { patientId: string }) => {
  const { data: request_data, isPending: isRequestPending } = useQuery({
    queryFn: async () => {
      const { data } = await supabase
        .from("requests")
        .select("*,patients(*),profile(*)")
        .eq("patients_id", patientId);
      return data;
    },
    queryKey: ["requestById"],
  });

  return { request_data, isRequestPending };
};

export const useQuantityType = () => {
  const { profile_data } = useProfile();
  const { data: quantity_type_data, isPending: isQuantityTypePending } =
    useQuery({
      queryFn: async () => {
        const { data } = await supabase
          .from("quantity_type")
          .select("*")
          .eq("branch_id", profile_data?.branch_id as string);
        return data;
      },
      queryKey: ["quantityType"],
    });
  return { quantity_type_data, isQuantityTypePending };
};

export const useUserReport = () => {
  const { profile_data } = useProfile();
  const { data: user_report_data, isPending: isUserReportPending } = useQuery({
    queryFn: async () => {
      const { data } = await supabase
        .from("document_reports")
        .select("*,profile(*),document_types(*)")
        .eq("branch_id", profile_data?.branch_id as string);
      return data;
    },
    queryKey: ["userReports"],
  });
  return { user_report_data, isUserReportPending };
};

export const useDocumentType = () => {
  const { profile_data } = useProfile();
  const { data: document_type_data, isPending: isDocumentTypePending } =
    useQuery({
      queryFn: async () => {
        const { data } = await supabase
          .from("document_types")
          .select("*")
          .eq("branch_id", profile_data?.branch_id as string);
        return data;
      },
      queryKey: ["documentType"],
    });
  return { document_type_data, isDocumentTypePending };
};

export const useBilling = () => {
  const { profile_data } = useProfile();
  const { data: billing_data, isPending: isBillingPending } = useQuery({
    queryFn: async () => {
      const { data } = await supabase
        .from("payments")
        .select("*,patients(*),cash_points(*),payment_methods(*),profile(*)")
        .eq("branch_id", profile_data?.branch_id as string);
      return data;
    },
    queryKey: ["payments"],
  });
  return { billing_data, isBillingPending };
};

export const useUser = () => {
  const { data, isPending } = useQuery({
    queryKey: ["loggedUser"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      const user = data.session?.user;
      return { user, error };
    },
  });
  return { data, isPending };
};

export const useProfile = () => {
  const { data: profile_data, isPending: isProfilePending } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });

  return { profile_data, isProfilePending };
};

export const useResults = (id: string) => {
  const { data: results_data, isPending: isResultsPending } = useQuery({
    queryKey: ["results"],
    queryFn: () => getResults(id),
  });

  return { results_data, isResultsPending };
};

export const useDiagnosis = () => {
  const { data: diagnosis_data, isPending: isDiagnosisPending } = useQuery({
    queryKey: ["allDiagnosis"],
    queryFn: () => getAllDiagnosis(),
  });

  return { diagnosis_data, isDiagnosisPending };
};

export const useCenter = () => {
  const { data: center_data, isPending: isCenterPending } = useQuery({
    queryKey: ["center"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("center")
        .select("*")
        .single();
      if (error) {
        if (error?.details === "The result contains 0 rows") {
          toast.error("Please create a center");
        } else {
          toast.error(error.message);
        }
      }
      return data;
    },
  });

  return { center_data, isCenterPending };
};
