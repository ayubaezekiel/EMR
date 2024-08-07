import { toast } from "sonner";
import supabase from "../supabase/client";
import supabase_admin from "../supabase/supabase-admin";
import { checkAuth } from "../lib/utils";

export const getHMOPlans = async () => {
  const { data: hmo_plans_data, error: hmo_plans_error } = await supabase
    .from("hmo_plans")
    .select("*,hmo_companies(name)");

  if (hmo_plans_error) {
    toast.error(hmo_plans_error.message);
  }
  return { hmo_plans_data };
};

export const getHMOGroups = async () => {
  const { data: hmo_group_data, error: hmo_group_err } = await supabase
    .from("hmo_group")
    .select("*");
  if (hmo_group_err) {
    toast.error(hmo_group_err.message);
  }
  return { hmo_group_data };
};

export const getHMOCompanies = async () => {
  const { data: hmo_companies_data, error: hmo_companies_err } = await supabase
    .from("hmo_companies")
    .select("*");

  if (hmo_companies_err) {
    toast.error(hmo_companies_err.message);
  }
  return { hmo_companies_data };
};

export const getHistoryTaking = async () => {
  const { data: history_taking_data, error: history_taking_err } =
    await supabase.from("history_taking").select("*");

  if (history_taking_err) {
    toast.error(history_taking_err.message);
  }
  return { history_taking_data };
};

export const getPaymentMethods = async () => {
  const { data: payment_method_data, error: payment_method_err } =
    await supabase.from("payment_methods").select("*");
  if (payment_method_err) {
    toast.error(payment_method_err.message);
  }
  return { payment_method_data };
};

export const getCashPoints = async () => {
  const { data: cashpoint_data, error: cashpoint_err } = await supabase
    .from("cash_points")
    .select("*");
  if (cashpoint_err) {
    toast.error(cashpoint_err.message);
  }
  return { cashpoint_data };
};

export const getJobPositions = async () => {
  const { data: job_positions_data, error: job_positions_err } = await supabase
    .from("job_positions")
    .select("*");

  if (job_positions_err) {
    toast.error(job_positions_err.message);
  }
  return { job_positions_data };
};

export const getBranch = async () => {
  const { data: branch_data, error: branch_err } = await supabase
    .from("branch")
    .select("*");
  if (branch_err) {
    toast.error(branch_err.message);
  }
  return { branch_data };
};

export const getServiceTypes = async () => {
  const { data: service_type_data, error: service_type_err } = await supabase
    .from("service_types")
    .select("*");
  if (service_type_err) {
    toast.error(service_type_err.message);
  }
  return { service_type_data };
};

export const getDepartments = async () => {
  const { data: department_data, error: department_err } = await supabase
    .from("departments")
    .select("*");

  if (department_err) {
    toast.error(department_err.message);
  }
  return { department_data };
};

export const getTreatmentPlan = async () => {
  const { data: plan_data, error: plan_err } = await supabase
    .from("treatment_plan")
    .select("*");

  if (plan_err) {
    toast.error(plan_err.message);
  }
  return { plan_data };
};

export const getDiagnosis = async () => {
  const { data: diagnosis_data, error: diagnosis_err } = await supabase
    .from("patient_diagnosis")
    .select("*");

  if (diagnosis_err) {
    toast.error(diagnosis_err.message);
  }
  return { diagnosis_data };
};

export const getExamination = async () => {
  const { data: examination_data, error: examination_err } = await supabase
    .from("patient_examination")
    .select("*");

  if (examination_err) {
    toast.error(examination_err.message);
  }
  return { examination_data };
};

export const getPerms = async () => {
  const auth = await checkAuth();
  const { data, error } = await supabase
    .from("permissions")
    .select("*")
    .eq("user_id", `${auth?.id}`)
    .single();
  if (error) {
    toast.error(error.message);
  }
  return data;
};
export const getUsers = async () => {
  const { data: user_data, error: user_error } =
    await supabase_admin.auth.admin.listUsers();

  if (user_error) {
    toast.error(user_error.message);
  }
  return { user_data };
};

export const getPatients = async () => {
  const { data: patient_data, error: patient_error } = await supabase
    .from("patients")
    .select("*,hmo_plans(id,name)");

  if (patient_error) {
    toast.error(patient_error.message);
  }
  return { patient_data };
};
export const getPatientById = async (id: string) => {
  const { data: patient_data, error: patient_error } = await supabase
    .from("patients")
    .select("*,hmo_plans(id,name)")
    .eq("id", id)
    .single();

  if (patient_error) {
    toast.error(patient_error.message);
  }
  return { patient_data };
};

export const getVitals = async () => {
  const { data: vitals_data, error: vitals_error } = await supabase
    .from("vitals")
    .select("*");

  if (vitals_error) {
    toast.error(vitals_error.message);
  }

  return { vitals_data };
};

export const getPatientVitals = async () => {
  const { data: patient_vitals_data, error: patient_vitals_err } =
    await supabase.from("patient_vitals").select("*");

  if (patient_vitals_err) {
    toast.error(patient_vitals_err.message);
  }
  return { patient_vitals_data };
};

export const getPatientVitalsById = async (patientId: string) => {
  const { data: patient_vitals_data, error: patient_vitals_err } =
    await supabase.from("patient_vitals").select("*").eq("patient", patientId);

  if (patient_vitals_err) {
    toast.error(patient_vitals_err.message);
  }
  return { patient_vitals_data };
};

export const getSpecialties = async () => {
  const { data: specialties_data, error: specialties_err } = await supabase
    .from("specialties")
    .select("*");

  if (specialties_err) {
    toast.error(specialties_err.message);
  }
  return { specialties_data };
};

export const getLabTestParams = async () => {
  const { data: lab_params_data, error: lab_params_err } = await supabase
    .from("lab_test_parameter")
    .select("*");

  if (lab_params_err) {
    toast.error(lab_params_err.message);
  }
  return { lab_params_data };
};

export const getLabTest = async () => {
  const { data: lab_test_data, error: lab_test_err } = await supabase
    .from("lab_tests")
    .select("*");

  if (lab_test_err) {
    toast.error(lab_test_err.message);
  }
  return { lab_test_data };
};

export const getRequest = async () => {
  const { data: request_data, error: lab_test_err } = await supabase
    .from("requests")
    .select("*,patients(*)");

  if (lab_test_err) {
    toast.error(lab_test_err.message);
  }
  return { request_data };
};

export const getLabTestTemplate = async () => {
  const { data: lab_test_template_data, error: lab_test_template_err } = await supabase.from("lab_test_template").select("*");

  if (lab_test_template_err) {
    toast.error(lab_test_template_err.message)
  }
  return { lab_test_template_data }
}

export const getLabTestCategories = async () => {
  const { data: lab_test_categories_data, error: lab_test_categories_err } = await supabase.from("lab_test_category").select("*");

  if (lab_test_categories_err) {
    toast.error(lab_test_categories_err.message)
  }
  return { lab_test_categories_data }
}
export const getConsultationSpecialties = async () => {
  const { data: consultation_specialties_data, error: specialties_err } =
    await supabase.from("consultation_specialties").select("*");

  if (specialties_err) {
    toast.error(specialties_err.message);
  }
  return { consultation_specialties_data };
};

export const getConsultationTemplates = async () => {
  const { data: consultation_templates_data, error: templates_err } =
    await supabase.from("consultation_templates").select("*");

  if (templates_err) {
    toast.error(templates_err.message);
  }
  return { consultation_templates_data };
};
export const getClinics = async () => {
  const { data: clinics_data, error: clinics_error } = await supabase
    .from("clinics")
    .select("*");

  if (clinics_error) {
    toast.error(clinics_error.message);
  }
  return { clinics_data };
};

export const getAppointmentTypes = async () => {
  const { data: appointment_type_data, error: appointment_type_error } =
    await supabase.from("appointments_types").select("*");

  if (appointment_type_error) {
    toast.error(appointment_type_error.message);
  }
  return { appointment_type_data };
};

export const getAppointments = async () => {
  const { data: appointment_data, error: appointment_error } = await supabase
    .from("appointments")
    .select(
      `*,patients(id,first_name,middle_name,last_name),clinics(name),consultation_specialties(id,name,default_price,follow_up_price),appointments_types(id,name)`
    );

  if (appointment_error) {
    toast.error(appointment_error.message);
  }
  return { appointment_data };
};

export const changeAppointmentStatus = async ({
  isCompleted,
  isCheckedIn,
  isMissed,
  isWaiting,
  id,
}: {
  isCompleted?: boolean;
  isMissed?: boolean;
  isWaiting?: boolean;
  isCheckedIn?: boolean;
  id: string;
}) => {
  const { error } = await supabase
    .from("appointments")
    .update({
      is_checkedin: isCheckedIn,
      is_completed: isCompleted,
      is_missed: isMissed,
      is_waiting: isWaiting,
    })
    .eq("id", id)
    .select();

  if (error) {
    toast.error(error.message);
  }
  toast.success("status updated successfully");
};

export const changeLabRequestStatus = async ({
  isCompleted,
  isWaiting,
  id,
}: {
  isCompleted?: boolean;
  isWaiting?: boolean;
  id: string;
}) => {
  const { error } = await supabase
    .from("requests")
    .update({
      is_completed: isCompleted,
      is_waiting: isWaiting,
    })
    .eq("id", id)
    .select();

  if (error) {
    toast.error(error.message);
  } else {
    toast.success("status updated successfully")
  }

};