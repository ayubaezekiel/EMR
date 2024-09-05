import { toast } from "sonner";
import supabase from "../supabase/client";
import supabase_admin from "../supabase/supabase-admin";
import { checkAuth } from "../lib/utils";

export const getAdmissions = async () => {
	const { data: admissions_data, error: admissions_error } = await supabase
		.from("admissions")
		.select("*,patients(*),profile(*),beds(*),wards(*)");

	if (admissions_error) {
		toast.error(admissions_error.message);
	}
	return { admissions_data };
};

export const getWards = async () => {
	const { data: wards_data, error: wards_error } = await supabase
		.from("wards")
		.select("*");

	if (wards_error) {
		toast.error(wards_error.message);
	}
	return { wards_data };
};

export const getBeds = async () => {
	const { data: beds_data, error: beds_error } = await supabase
		.from("beds")
		.select("*,wards(*)");

	if (beds_error) {
		toast.error(beds_error.message);
	}
	return { beds_data };
};

export const getFluidRoutes = async () => {
	const { data: fluid_routes_data, error: fluid_routes_error } = await supabase
		.from("fluid_routes")
		.select("*");

	if (fluid_routes_error) {
		toast.error(fluid_routes_error.message);
	}
	return { fluid_routes_data };
};
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

export const getDrugOrGeneric = async () => {
	const { data: drug_or_generic_data, error: drug_or_generic_err } =
		await supabase
			.from("drug_or_generic")
			.select("*,drug_or_generic_brand(name),profile(*),quantity_type(*)");
	if (drug_or_generic_err) {
		toast.error(drug_or_generic_err.message);
	}
	return { drug_or_generic_data };
};

export const getDrugOrGenericBrand = async () => {
	const { data: drug_or_generic_brand_data, error: drug_or_generic_brand_err } =
		await supabase.from("drug_or_generic_brand").select("*");
	if (drug_or_generic_brand_err) {
		toast.error(drug_or_generic_brand_err.message);
	}
	return { drug_or_generic_brand_data };
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

export const getTreatmentPlanById = async (patientId: string) => {
	const { data: plan_data, error: plan_err } = await supabase
		.from("treatment_plan")
		.select("*,profile(*)")
		.eq("patients_id", patientId);

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

export const getDiagnosisById = async (patientId: string) => {
	const { data: diagnosis_data, error: diagnosis_err } = await supabase
		.from("patient_diagnosis")
		.select("*,profile(*)")
		.eq("patients_id", patientId);

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

export const getExaminationById = async (patientId: string) => {
	const { data: examination_data, error: examination_err } = await supabase
		.from("patient_examination")
		.select("*,profile(*)")
		.eq("patients_id", patientId);

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

export const getNursingReportsById = async (patientId: string) => {
	const { data: nursing_report_data, error } = await supabase
		.from("nursing_report")
		.select("*,profile(*)")
		.eq("patient_id", patientId);

	if (error) {
		toast.error(error.message);
	}
	return { nursing_report_data };
};

export const getNursingReports = async () => {
	const { data: nursing_report_data, error } = await supabase
		.from("nursing_report")
		.select("*,profile(*)");

	if (error) {
		toast.error(error.message);
	}
	return { nursing_report_data };
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
		await supabase
			.from("patient_vitals")
			.select("*,profile(*)")
			.eq("patient_id", patientId);

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
		.select("*,lab_test_category(*),lab_test_template(*)");

	if (lab_test_err) {
		toast.error(lab_test_err.message);
	}
	return { lab_test_data };
};

export const getRequest = async () => {
	const { data: request_data, error: lab_test_err } = await supabase
		.from("requests")
		.select("*,patients(*),profile(*)");

	if (lab_test_err) {
		toast.error(lab_test_err.message);
	}
	return { request_data };
};

export const getLabTestTemplate = async () => {
	const { data: lab_test_template_data, error: lab_test_template_err } =
		await supabase.from("lab_test_template").select("*");

	if (lab_test_template_err) {
		toast.error(lab_test_template_err.message);
	}
	return { lab_test_template_data };
};

export const getProcedureCategories = async () => {
	const { data: procedure_categories_data, error: procedure_categories_err } =
		await supabase.from("procedure_category").select("*");

	if (procedure_categories_err) {
		toast.error(procedure_categories_err.message);
	}
	return { procedure_categories_data };
};

export const getProcedures = async () => {
	const { data: procedure_data, error: procedure_err } = await supabase
		.from("procedure")
		.select("*,anaesthesia(*),theatre(*),procedure_category(*)");

	if (procedure_err) {
		toast.error(procedure_err.message);
	}
	return { procedure_data };
};

export const getConsultations = async () => {
	const { data: consultation_data, error: consultation_err } = await supabase
		.from("admission_consultations")
		.select("*,admissions(*,patients(*),wards(*),beds(*))");

	if (consultation_err) {
		toast.error(consultation_err.message);
	}
	return { consultation_data };
};

export const getTheatres = async () => {
	const { data: theatre_data, error: theatre_err } = await supabase
		.from("theatre")
		.select("*");

	if (theatre_err) {
		toast.error(theatre_err.message);
	}
	return { theatre_data };
};

export const getAnaesthesia = async () => {
	const { data: anaesthesia_data, error: anaesthesia_err } = await supabase
		.from("anaesthesia")
		.select("*,anaesthesia_type(*)");

	if (anaesthesia_err) {
		toast.error(anaesthesia_err.message);
	}
	return { anaesthesia_data };
};
export const getAnaesthesiaType = async () => {
	const { data: anaesthesia_type_data, error: anaesthesia_type_err } =
		await supabase.from("anaesthesia_type").select("*");

	if (anaesthesia_type_err) {
		toast.error(anaesthesia_type_err.message);
	}
	return { anaesthesia_type_data };
};
export const getLabTestCategories = async () => {
	const { data: lab_test_categories_data, error: lab_test_categories_err } =
		await supabase.from("lab_test_category").select("*");

	if (lab_test_categories_err) {
		toast.error(lab_test_categories_err.message);
	}
	return { lab_test_categories_data };
};

export const getImaging = async () => {
	const { data: imaging_data, error: imaging_err } = await supabase
		.from("imaging")
		.select("*,imaging_category(*)");

	if (imaging_err) {
		toast.error(imaging_err.message);
	}
	return { imaging_data };
};

export const getImagingCategories = async () => {
	const { data: imaging_categories_data, error: imaging_categories_err } =
		await supabase.from("imaging_category").select("*");

	if (imaging_categories_err) {
		toast.error(imaging_categories_err.message);
	}
	return { imaging_categories_data };
};

export const getImagingTemplate = async () => {
	const { data: imaging_temp_data, error: imaging_temp_err } = await supabase
		.from("imaging_templates")
		.select("*");

	if (imaging_temp_err) {
		toast.error(imaging_temp_err.message);
	}
	return { imaging_temp_data };
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
		await supabase.from("appointment_types").select("*");

	if (appointment_type_error) {
		toast.error(appointment_type_error.message);
	}
	return { appointment_type_data };
};

export const getAppointments = async () => {
	const { data: appointment_data, error: appointment_error } = await supabase
		.from("appointments")
		.select(
			"*,patients(id,first_name,middle_name,last_name),clinics(name),appointment_types(id,name,default_price,follow_up_price)",
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

export const changeRequestStatus = async ({
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
		toast.success("status updated successfully");
	}
};

export const deleteRequestAction = async (id: string) => {
	const { error } = await supabase.from("requests").delete().eq("id", id);
	if (error) {
		toast.error(error.message);
	} else {
		toast.success("request deleted successfully");
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
	const { error } = await supabase
		.from("admissions")
		.update({
			is_active: isActive,
			is_critical: isCritical,
			is_discharged: isDischarged,
		})
		.eq("id", id)
		.select();

	if (error) {
		toast.error(error.message);
	} else {
		toast.success("done!");
	}
};
