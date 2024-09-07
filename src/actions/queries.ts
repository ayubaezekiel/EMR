import { useQuery } from "@tanstack/react-query";
import {
	getAdmissions,
	getAnaesthesia,
	getAnaesthesiaType,
	getAppointments,
	getAppointmentTypes,
	getBeds,
	getBranch,
	getCashPoints,
	getClinics,
	getConsultations,
	getConsultationTemplates,
	getDepartments,
	getDiagnosis,
	getDrugOrGeneric,
	getDrugOrGenericBrand,
	getExamination,
	getFluidRoutes,
	getHistoryTaking,
	getHMOCompanies,
	getHMOGroups,
	getHMOPlans,
	getImaging,
	getImagingCategories,
	getImagingTemplate,
	getJobPositions,
	getLabTest,
	getLabTestCategories,
	getLabTestParams,
	getLabTestTemplate,
	getNursingReports,
	getPatients,
	getPatientVitals,
	getPaymentMethods,
	getProcedureCategories,
	getProcedures,
	getRequest,
	getSpecialties,
	getTheatres,
	getTreatmentPlan,
	getVitals,
	getWards,
} from "./actions";

export const useBedsQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["beds"],
		queryFn: () => getBeds(),
	});
	return { data, isPending };
};

export const useWardsQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["wards"],
		queryFn: () => getWards(),
	});
	return { data, isPending };
};

export const useFluidRoutesQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["fluidRoutes"],
		queryFn: () => getFluidRoutes(),
	});
	return { data, isPending };
};
export const useAdmissionsQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["admissions"],
		queryFn: () => getAdmissions(),
	});
	return { data, isPending };
};
export const useVitalsQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["vitals"],
		queryFn: () => getVitals(),
	});
	return { data, isPending };
};

export const usePatientVitalsQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["patientVitals"],
		queryFn: () => getPatientVitals(),
	});
	return { data, isPending };
};

export const useNursingReportQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["nursingReports"],
		queryFn: () => getNursingReports(),
	});
	return { data, isPending };
};

export const usePatientsQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["patients"],
		queryFn: () => getPatients(),
	});
	return { data, isPending };
};

export const useLabTestParamsQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["labTestParams"],
		queryFn: () => getLabTestParams(),
	});
	return { data, isPending };
};

export const useRequestQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["requests"],
		queryFn: () => getRequest(),
	});
	return { data, isPending };
};

export const useLabTestQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["labTest"],
		queryFn: () => getLabTest(),
	});
	return { data, isPending };
};

export const useLabTestCatQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["labTestCat"],
		queryFn: () => getLabTestCategories(),
	});
	return { data, isPending };
};

export const useImagingCatQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["imagingCat"],
		queryFn: () => getImagingCategories(),
	});
	return { data, isPending };
};
export const useProcedureCatQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["procedureCat"],
		queryFn: () => getProcedureCategories(),
	});
	return { data, isPending };
};

export const useProceduresQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["procedure"],
		queryFn: () => getProcedures(),
	});
	return { data, isPending };
};

export const useConsultationQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["consultations"],
		queryFn: () => getConsultations(),
	});
	return { data, isPending };
};

export const useAnaesthesiaQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["anaesthesia"],
		queryFn: () => getAnaesthesia(),
	});
	return { data, isPending };
};
export const useAnaesthesiaTypeQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["anaesthesiaType"],
		queryFn: () => getAnaesthesiaType(),
	});
	return { data, isPending };
};

export const useTheatreQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["theatre"],
		queryFn: () => getTheatres(),
	});
	return { data, isPending };
};
export const useImagingTempQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["imagingTemp"],
		queryFn: () => getImagingTemplate(),
	});
	return { data, isPending };
};

export const useImagingQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["imaging"],
		queryFn: () => getImaging(),
	});
	return { data, isPending };
};

export const useLabTestTempQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["labTestTemps"],
		queryFn: () => getLabTestTemplate(),
	});
	return { data, isPending };
};

export const useSpecialtiesQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["specialties"],
		queryFn: () => getSpecialties(),
	});
	return { data, isPending };
};

export const useConsultationTemplatesQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["consultationTemplates"],
		queryFn: () => getConsultationTemplates(),
	});
	return { data, isPending };
};

export const useClinicsQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["clinics"],
		queryFn: () => getClinics(),
	});
	return { data, isPending };
};

export const useAppointmentsQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["appointments"],
		queryFn: () => getAppointments(),
	});
	return { data, isPending };
};

export const useAppointmentsTypesQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["appointmentsTypes"],
		queryFn: () => getAppointmentTypes(),
	});
	return { data, isPending };
};

export const useBranchQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["branch"],
		queryFn: () => getBranch(),
	});
	return { data, isPending };
};

export const useJobPositionsQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["jobPositions"],
		queryFn: () => getJobPositions(),
	});
	return { data, isPending };
};

export const useHmoPlansQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["hmoPlans"],
		queryFn: () => getHMOPlans(),
	});
	return { data, isPending };
};

export const useHmoGroupsQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["hmoGroups"],
		queryFn: () => getHMOGroups(),
	});
	return { data, isPending };
};

export const useHmoCompaniesQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["hmoCompanies"],
		queryFn: () => getHMOCompanies(),
	});
	return { data, isPending };
};

export const useHistoryTakingQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["historyTaking"],
		queryFn: () => getHistoryTaking(),
	});
	return { data, isPending };
};

export const useExaminationQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["examination"],
		queryFn: () => getExamination(),
	});
	return { data, isPending };
};

export const useDiagnosisQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["diagnosis"],
		queryFn: () => getDiagnosis(),
	});
	return { data, isPending };
};

export const useTreatmentPlanQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["treatmentPlan"],
		queryFn: () => getTreatmentPlan(),
	});
	return { data, isPending };
};

export const usePaymentMethodsQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["paymentMethod"],
		queryFn: () => getPaymentMethods(),
	});
	return { data, isPending };
};

export const useCashpointsQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["cashpoints"],
		queryFn: () => getCashPoints(),
	});
	return { data, isPending };
};

export const useDrugOrGenericQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["drugOrGeneric"],
		queryFn: () => getDrugOrGeneric(),
	});
	return { data, isPending };
};

export const useDrugOrGenericBrandQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["brand"],
		queryFn: () => getDrugOrGenericBrand(),
	});
	return { data, isPending };
};
export const useDepartmentsQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ["departments"],
		queryFn: () => getDepartments(),
	});
	return { data, isPending };
};
