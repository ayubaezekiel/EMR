import { toast } from "sonner";
import supabase from "../supabase/client";
import supabase_admin from "../supabase/supabase-admin";
import { getProfile } from "../lib/utils";

export const getAdmissions = async () => {
  const branch_id = await getProfile();
  const { data: admissions_data, error: admissions_error } = await supabase
    .from("admissions")
    .select("*,patients(*),profile(*),beds(*),wards(*)")
    .eq("branch_id", branch_id?.branch_id as string);

  if (admissions_error && !admissions_data) {
    toast.error(admissions_error.message);
  }
  return { admissions_data };
};

export const getWards = async () => {
  const branch_id = await getProfile();
  const { data: wards_data, error: wards_error } = await supabase
    .from("wards")
    .select("*")
    .eq("branch_id", branch_id?.branch_id as string);

  if (wards_error && !wards_data) {
    toast.error(wards_error.message);
  }
  return { wards_data };
};

export const getBeds = async () => {
  const branch_id = await getProfile();
  const { data: beds_data, error: beds_error } = await supabase
    .from("beds")
    .select("*,wards(*)")
    .eq("branch_id", branch_id?.branch_id as string);

  if (beds_error && !beds_data) {
    toast.error(beds_error.message);
  }
  return { beds_data };
};

export const getFluidRoutes = async () => {
  const branch_id = await getProfile();
  const { data: fluid_routes_data, error: fluid_routes_error } = await supabase
    .from("fluid_routes")
    .select("*")
    .eq("branch_id", branch_id?.branch_id as string);

  if (fluid_routes_error && !fluid_routes_data) {
    toast.error(fluid_routes_error.message);
  }
  return { fluid_routes_data };
};
export const getHMOPlans = async () => {
  const branch_id = await getProfile();
  const { data: hmo_plans_data, error: hmo_plans_error } = await supabase
    .from("hmo_plans")
    .select("*,hmo_companies(name)")
    .eq("branch_id", branch_id?.branch_id as string);

  if (hmo_plans_error && !hmo_plans_data) {
    toast.error(hmo_plans_error.message);
  }
  return { hmo_plans_data };
};

export const getHMOGroups = async () => {
  const branch_id = await getProfile();
  const { data: hmo_group_data, error: hmo_group_err } = await supabase
    .from("hmo_group")
    .select("*")
    .eq("branch_id", branch_id?.branch_id as string);
  if (hmo_group_err && !hmo_group_data) {
    toast.error(hmo_group_err.message);
  }
  return { hmo_group_data };
};

export const getHMOCompanies = async () => {
  const branch_id = await getProfile();
  const { data: hmo_companies_data, error: hmo_companies_err } = await supabase
    .from("hmo_companies")
    .select("*")
    .eq("branch_id", branch_id?.branch_id as string);

  if (hmo_companies_err && !hmo_companies_data) {
    toast.error(hmo_companies_err.message);
  }
  return { hmo_companies_data };
};

export const getHistoryTaking = async () => {
  const branch_id = await getProfile();
  const { data: history_taking_data, error: history_taking_err } =
    await supabase
      .from("history_taking")
      .select("*")
      .eq("branch_id", branch_id?.branch_id as string);

  if (history_taking_err && !history_taking_data) {
    toast.error(history_taking_err.message);
  }
  return { history_taking_data };
};

export const getHistoryTakingById = async (patientId: string) => {
  const { data: history_taking_data, error: history_taking_err } =
    await supabase
      .from("history_taking")
      .select("*,profile(*)")
      .eq("patients_id", patientId);

  if (history_taking_err) {
    toast.error(history_taking_err.message);
  }
  return { history_taking_data };
};
export const getPaymentMethods = async () => {
  const branch_id = await getProfile();
  const { data: payment_method_data, error: payment_method_err } =
    await supabase
      .from("payment_methods")
      .select("*")
      .eq("branch_id", branch_id?.branch_id as string);
  if (payment_method_err && !payment_method_data) {
    toast.error(payment_method_err.message);
  }
  return { payment_method_data };
};

export const getCashPoints = async () => {
  const branch_id = await getProfile();
  const { data: cashpoint_data, error: cashpoint_err } = await supabase
    .from("cash_points")
    .select("*")
    .eq("branch_id", branch_id?.branch_id as string);
  if (cashpoint_err && !cashpoint_data) {
    toast.error(cashpoint_err.message);
  }
  return { cashpoint_data };
};

export const getJobPositions = async () => {
  const branch_id = await getProfile();
  const { data: job_positions_data, error: job_positions_err } = await supabase
    .from("job_positions")
    .select("*")
    .eq("branch_id", branch_id?.branch_id as string);

  if (job_positions_err && !job_positions_data) {
    toast.error(job_positions_err.message);
  }
  return { job_positions_data };
};

export const getBranch = async () => {
  const { data: branch_data, error: branch_err } = await supabase
    .from("branch")
    .select("*");
  if (branch_err && !branch_data) {
    toast.error(branch_err.message);
  }
  return { branch_data };
};

export const getDrugOrGeneric = async () => {
  const branch_id = await getProfile();
  const { data: drug_or_generic_data, error: drug_or_generic_err } =
    await supabase
      .from("drug_or_generic")
      .select("*,drug_or_generic_brand(name),profile(*),quantity_type(*)")
      .eq("branch_id", branch_id?.branch_id as string);
  if (drug_or_generic_err && !drug_or_generic_data) {
    toast.error(drug_or_generic_err.message);
  }
  return { drug_or_generic_data };
};

export const getDrugOrGenericBrand = async () => {
  const branch_id = await getProfile();
  const { data: drug_or_generic_brand_data, error: drug_or_generic_brand_err } =
    await supabase
      .from("drug_or_generic_brand")
      .select("*")
      .eq("branch_id", branch_id?.branch_id as string);
  if (drug_or_generic_brand_err && !drug_or_generic_brand_data) {
    toast.error(drug_or_generic_brand_err.message);
  }
  return { drug_or_generic_brand_data };
};

export const getDepartments = async () => {
  const branch_id = await getProfile();
  const { data: department_data, error: department_err } = await supabase
    .from("departments")
    .select("*")
    .eq("branch_id", branch_id?.branch_id as string);

  if (department_err && !department_data) {
    toast.error(department_err.message);
  }
  return { department_data };
};

export const getTreatmentPlan = async () => {
  const branch_id = await getProfile();
  const { data: plan_data, error: plan_err } = await supabase
    .from("treatment_plan")
    .select("*")
    .eq("branch_id", branch_id?.branch_id as string);

  if (plan_err && !plan_data) {
    toast.error(plan_err.message);
  }
  return { plan_data };
};

export const getTreatmentPlanById = async (patientId: string) => {
  const { data: plan_data, error: plan_err } = await supabase
    .from("treatment_plan")
    .select("*,profile(*)")
    .eq("patients_id", patientId);

  if (plan_err && !plan_data) {
    toast.error(plan_err.message);
  }
  return { plan_data };
};

export const getDiagnosis = async () => {
  const branch_id = await getProfile();
  const { data: diagnosis_data, error: diagnosis_err } = await supabase
    .from("patient_diagnosis")
    .select("*")
    .eq("branch_id", branch_id?.branch_id as string);

  if (diagnosis_err && !diagnosis_data) {
    toast.error(diagnosis_err.message);
  }
  return { diagnosis_data };
};

export const getDiagnosisById = async (patientId: string) => {
  const { data: diagnosis_data, error: diagnosis_err } = await supabase
    .from("patient_diagnosis")
    .select("*,profile(*)")
    .eq("patients_id", patientId);

  if (diagnosis_err && !diagnosis_data) {
    toast.error(diagnosis_err.message);
  }
  return { diagnosis_data };
};

export const getExamination = async () => {
  const branch_id = await getProfile();
  const { data: examination_data, error: examination_err } = await supabase
    .from("patient_examination")
    .select("*")
    .eq("branch_id", branch_id?.branch_id as string);

  if (examination_err && !examination_data) {
    toast.error(examination_err.message);
  }
  return { examination_data };
};

export const getExaminationById = async (patientId: string) => {
  const { data: examination_data, error: examination_err } = await supabase
    .from("patient_examination")
    .select("*,profile(*)")
    .eq("patients_id", patientId);

  if (examination_err && !examination_data) {
    toast.error(examination_err.message);
  }
  return { examination_data };
};

export const getUsers = async () => {
  const { data: user_data, error: user_error } =
    await supabase_admin.auth.admin.listUsers();

  if (user_error && !user_data) {
    toast.error(user_error.message);
  }
  return { user_data };
};

export const getPatients = async () => {
  const branch_id = await getProfile();
  const { data: patient_data, error: patient_error } = await supabase
    .from("patients")
    .select("*,hmo_plans(id,name)")
    .eq("branch_id", branch_id?.branch_id as string);

  if (patient_error && !patient_data) {
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

  if (patient_error && !patient_data) {
    toast.error(patient_error.message);
  }
  return { patient_data };
};

export const getVitals = async () => {
  const branch_id = await getProfile();
  const { data: vitals_data, error: vitals_error } = await supabase
    .from("vitals")
    .select("*")
    .eq("branch_id", branch_id?.branch_id as string);

  if (vitals_error && !vitals_data) {
    toast.error(vitals_error.message);
  }

  return { vitals_data };
};

export const getNursingReportsById = async (patientId: string) => {
  const { data: nursing_report_data, error } = await supabase
    .from("nursing_report")
    .select("*,profile(*)")
    .eq("patient_id", patientId);

  if (error && !nursing_report_data) {
    toast.error(error.message);
  }
  return { nursing_report_data };
};

export const getNursingReports = async () => {
  const branch_id = await getProfile();
  const { data: nursing_report_data, error } = await supabase
    .from("nursing_report")
    .select("*,profile(*)")
    .eq("branch_id", branch_id?.branch_id as string);

  if (error && !nursing_report_data) {
    toast.error(error.message);
  }
  return { nursing_report_data };
};
export const getPatientVitals = async () => {
  const branch_id = await getProfile();
  const { data: patient_vitals_data, error: patient_vitals_err } =
    await supabase
      .from("patient_vitals")
      .select("*")
      .eq("branch_id", branch_id?.branch_id as string);

  if (patient_vitals_err && !patient_vitals_data) {
    toast.error(patient_vitals_err.message);
  }
  return { patient_vitals_data };
};

export const getPatientVitalsById = async (patientId: string) => {
  const { data: patient_vitals_data, error: patient_vitals_err } =
    await supabase
      .from("patient_vitals")
      .select("*,profile(*)")
      .eq("patient_id", patientId);

  if (patient_vitals_err && !patient_vitals_data) {
    toast.error(patient_vitals_err.message);
  }
  return { patient_vitals_data };
};

export const getSpecialties = async () => {
  const branch_id = await getProfile();
  const { data: specialties_data, error: specialties_err } = await supabase
    .from("specialties")
    .select("*")
    .eq("branch_id", branch_id?.branch_id as string);

  if (specialties_err && !specialties_data) {
    toast.error(specialties_err.message);
  }
  return { specialties_data };
};

export const getLabTestParams = async () => {
  const branch_id = await getProfile();
  const { data: lab_params_data, error: lab_params_err } = await supabase
    .from("lab_test_parameter")
    .select("*")
    .eq("branch_id", branch_id?.branch_id as string);

  if (lab_params_err && !lab_params_data) {
    toast.error(lab_params_err.message);
  }
  return { lab_params_data };
};

export const getLabTest = async () => {
  const branch_id = await getProfile();
  const { data: lab_test_data, error: lab_test_err } = await supabase
    .from("lab_tests")
    .select("*,lab_test_category(*),lab_test_template(*)")
    .eq("branch_id", branch_id?.branch_id as string);

  if (lab_test_err && !lab_test_data) {
    toast.error(lab_test_err.message);
  }
  return { lab_test_data };
};

export const getRequest = async () => {
  const branch_id = await getProfile();
  const { data: request_data, error: lab_test_err } = await supabase
    .from("requests")
    .select("*,patients(*),profile(*)")
    .eq("branch_id", branch_id?.branch_id as string);

  if (lab_test_err && !request_data) {
    toast.error(lab_test_err.message);
  }
  return { request_data };
};

export const getLabTestTemplate = async () => {
  const branch_id = await getProfile();
  const { data: lab_test_template_data, error: lab_test_template_err } =
    await supabase
      .from("lab_test_template")
      .select("*")
      .eq("branch_id", branch_id?.branch_id as string);

  if (lab_test_template_err && !lab_test_template_data) {
    toast.error(lab_test_template_err.message);
  }
  return { lab_test_template_data };
};

export const getProcedureCategories = async () => {
  const branch_id = await getProfile();
  const { data: procedure_categories_data, error: procedure_categories_err } =
    await supabase
      .from("procedure_category")
      .select("*")
      .eq("branch_id", branch_id?.branch_id as string);

  if (procedure_categories_err && !procedure_categories_data) {
    toast.error(procedure_categories_err.message);
  }
  return { procedure_categories_data };
};

export const getProcedures = async () => {
  const branch_id = await getProfile();
  const { data: procedure_data, error: procedure_err } = await supabase
    .from("procedure")
    .select("*,anaesthesia(*),theatre(*),procedure_category(*)")
    .eq("branch_id", branch_id?.branch_id as string);

  if (procedure_err && !procedure_data) {
    toast.error(procedure_err.message);
  }
  return { procedure_data };
};

export const getConsultations = async () => {
  const branch_id = await getProfile();
  const { data: consultation_data, error: consultation_err } = await supabase
    .from("admission_consultations")
    .select("*,admissions(*,patients(*),wards(*),beds(*))")
    .eq("branch_id", branch_id?.branch_id as string);

  if (consultation_err && !consultation_data) {
    toast.error(consultation_err.message);
  }
  return { consultation_data };
};

export const getTheatres = async () => {
  const branch_id = await getProfile();
  const { data: theatre_data, error: theatre_err } = await supabase
    .from("theatre")
    .select("*")
    .eq("branch_id", branch_id?.branch_id as string);

  if (theatre_err && !theatre_data) {
    toast.error(theatre_err.message);
  }
  return { theatre_data };
};

export const getAnaesthesia = async () => {
  const branch_id = await getProfile();
  const { data: anaesthesia_data, error: anaesthesia_err } = await supabase
    .from("anaesthesia")
    .select("*,anaesthesia_type(*)")
    .eq("branch_id", branch_id?.branch_id as string);

  if (anaesthesia_err && !anaesthesia_data) {
    toast.error(anaesthesia_err.message);
  }
  return { anaesthesia_data };
};
export const getAnaesthesiaType = async () => {
  const branch_id = await getProfile();
  const { data: anaesthesia_type_data, error: anaesthesia_type_err } =
    await supabase
      .from("anaesthesia_type")
      .select("*")
      .eq("branch_id", branch_id?.branch_id as string);

  if (anaesthesia_type_err && !anaesthesia_type_data) {
    toast.error(anaesthesia_type_err.message);
  }
  return { anaesthesia_type_data };
};
export const getLabTestCategories = async () => {
  const branch_id = await getProfile();
  const { data: lab_test_categories_data, error: lab_test_categories_err } =
    await supabase
      .from("lab_test_category")
      .select("*")
      .eq("branch_id", branch_id?.branch_id as string);

  if (lab_test_categories_err && !lab_test_categories_data) {
    toast.error(lab_test_categories_err.message);
  }
  return { lab_test_categories_data };
};

export const getImaging = async () => {
  const branch_id = await getProfile();
  const { data: imaging_data, error: imaging_err } = await supabase
    .from("imaging")
    .select("*,imaging_category(*)")
    .eq("branch_id", branch_id?.branch_id as string);

  if (imaging_err && !imaging_data) {
    toast.error(imaging_err.message);
  }
  return { imaging_data };
};

export const getImagingCategories = async () => {
  const branch_id = await getProfile();
  const { data: imaging_categories_data, error: imaging_categories_err } =
    await supabase
      .from("imaging_category")
      .select("*")
      .eq("branch_id", branch_id?.branch_id as string);

  if (imaging_categories_err && !imaging_categories_data) {
    toast.error(imaging_categories_err.message);
  }
  return { imaging_categories_data };
};

export const getTemplates = async () => {
  const branch_id = await getProfile();
  const { data: consultation_templates_data, error: templates_err } =
    await supabase
      .from("templates")
      .select("*")
      .eq("branch_id", branch_id?.branch_id as string);

  if (templates_err && !consultation_templates_data) {
    toast.error(templates_err.message);
  }
  return { consultation_templates_data };
};
export const getClinics = async () => {
  const branch_id = await getProfile();
  const { data: clinics_data, error: clinics_error } = await supabase
    .from("clinics")
    .select("*")
    .eq("branch_id", branch_id?.branch_id as string);

  if (clinics_error && !clinics_data) {
    toast.error(clinics_error.message);
  }
  return { clinics_data };
};

export const getAppointmentTypes = async () => {
  const branch_id = await getProfile();
  const { data: appointment_type_data, error: appointment_type_error } =
    await supabase
      .from("appointment_types")
      .select("*")
      .eq("branch_id", branch_id?.branch_id as string);

  if (appointment_type_error && !appointment_type_data) {
    toast.error(appointment_type_error.message);
  }
  return { appointment_type_data };
};

export const getAllDiagnosis = async () => {
  const branch_id = await getProfile();
  const { data: diagnosis_data, error: diagnosis_error } = await supabase
    .from("diagnosis")
    .select("*")
    .eq("branch_id", branch_id?.branch_id as string);

  if (diagnosis_error && !diagnosis_data) {
    toast.error(diagnosis_error.message);
  }
  return { diagnosis_data };
};

export const getAppointments = async () => {
  const branch_id = await getProfile();
  const { data: appointment_data, error: appointment_error } = await supabase
    .from("appointments")
    .select(
      "*,patients(id,first_name,middle_name,last_name),clinics(name),appointment_types(id,name,default_price,follow_up_price)"
    )
    .eq("branch_id", branch_id?.branch_id as string);

  if (appointment_error && !appointment_data) {
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
  const { error, data } = await supabase
    .from("appointments")
    .update({
      is_checkedin: isCheckedIn,
      is_completed: isCompleted,
      is_missed: isMissed,
      is_waiting: isWaiting,
    })
    .eq("id", id)
    .select();

  if (error && !data) {
    toast.error(error.message);
  }
  toast.success("status updated successfully");
};

export const changeConsultationStatus = async ({
  isCompleted,
  id,
}: {
  isCompleted?: boolean;
  id: string;
}) => {
  const { error, data } = await supabase
    .from("admission_consultations")
    .update({
      is_completed: isCompleted,
    })
    .eq("id", id)
    .select();

  if (error && !data) {
    toast.error(error.message);
  }
  toast.success("status updated successfully");
};

export const changeRequestStatus = async ({
  isCompleted,
  isWaiting,
  id,
}: {
  isCompleted?: boolean;
  isWaiting?: boolean;
  id: string;
}) => {
  const { error, data } = await supabase
    .from("requests")
    .update({
      is_completed: isCompleted,
      is_waiting: isWaiting,
    })
    .eq("id", id)
    .select();

  if (error && !data) {
    toast.error(error.message);
  } else {
    toast.success("status updated successfully");
  }
};

export const deleteRequestAction = async (id: string) => {
  const { error, data } = await supabase.from("requests").delete().eq("id", id);
  if (error && !data) {
    toast.error(error.message);
  } else {
    toast.success("request deleted successfully");
  }
};

export const deleteLabResultAction = async (id: string) => {
  const { error, data } = await supabase
    .from("lab_reports")
    .delete()
    .eq("id", id);
  if (error && !data) {
    toast.error(error.message);
  } else {
    toast.success("result deleted successfully");
  }
};

export const deleteRadiologyResultAction = async (id: string) => {
  const { error, data } = await supabase
    .from("radiology_results")
    .delete()
    .eq("id", id);
  if (error && !data) {
    toast.error(error.message);
  } else {
    toast.success("result deleted successfully");
  }
};
export const changeAdmissionStatus = async ({
  isDischarged,
  isActive,
  isCritical,
  id,
}: {
  isDischarged?: boolean;
  isCritical?: boolean;
  isActive?: boolean;
  id: string;
}) => {
  const { error, data } = await supabase
    .from("admissions")
    .update({
      is_active: isActive,
      is_critical: isCritical,
      is_discharged: isDischarged,
    })
    .eq("id", id)
    .select();

  if (error && !data) {
    toast.error(error.message);
  } else {
    toast.success("done!");
  }
};
