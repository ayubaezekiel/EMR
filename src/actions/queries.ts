import { queryOptions } from "@tanstack/react-query"
import { getAppointments, getAppointmentTypes, getBranch, getCashPoints, getClinics, getConsultationTemplates, getDepartments, getDiagnosis, getDrugOrGeneric, getDrugOrGenericBrand, getExamination, getHistoryTaking, getHMOCompanies, getHMOGroups, getHMOPlans, getImaging, getImagingCategories, getImagingTemplate, getJobPositions, getLabTest, getLabTestCategories, getLabTestParams, getLabTestTemplate, getPatients, getPatientVitals, getPaymentMethods, getRequest, getSpecialties, getTreatmentPlan, getVitals } from "./actions"

export const vitalsQueryOptions = queryOptions({
    queryKey: ['vitals'],
    queryFn: () => getVitals(),
})

export const patientVitalsQueryOptions = queryOptions({
    queryKey: ['patientVitals'],
    queryFn: () => getPatientVitals(),
})


export const patientsQueryOptions = queryOptions({
    queryKey: ['patients'],
    queryFn: () => getPatients(),
})

export const labTestParamsQueryOptions = queryOptions({
    queryKey: ['labTestParams'],
    queryFn: () => getLabTestParams(),
})

export const requestQueryOptions = queryOptions({
    queryKey: ['requests'],
    queryFn: () => getRequest(),
})

export const labTestQueryOptions = queryOptions({
    queryKey: ['labTest'],
    queryFn: () => getLabTest(),
})

export const labTestCatQueryOptions = queryOptions({
    queryKey: ['labTestCat'],
    queryFn: () => getLabTestCategories(),
})

export const imagingCatQueryOptions = queryOptions({
    queryKey: ['imagingCat'],
    queryFn: () => getImagingCategories(),
})

export const imagingTempQueryOptions = queryOptions({
    queryKey: ['imagingTemp'],
    queryFn: () => getImagingTemplate(),
})

export const imagingQueryOptions = queryOptions({
    queryKey: ['imaging'],
    queryFn: () => getImaging(),
})

export const labTestTempQueryOptions = queryOptions({
    queryKey: ['labTestTemp'],
    queryFn: () => getLabTestTemplate(),
})

export const specialtiesQueryOptions = queryOptions({
    queryKey: ['specialties'],
    queryFn: () => getSpecialties(),
})


export const consultationTemplatesQueryOptions = queryOptions({
    queryKey: ['consultationTemplates'],
    queryFn: () => getConsultationTemplates(),
})

export const clinicsQueryOptions = queryOptions({
    queryKey: ['clinics'],
    queryFn: () => getClinics(),
})

export const appointmentsQueryOptions = queryOptions({
    queryKey: ['appointments'],
    queryFn: () => getAppointments(),
})

export const appointmentsTypesQueryOptions = queryOptions({
    queryKey: ['appointmentsTypes'],
    queryFn: () => getAppointmentTypes(),
})


export const branchQueryOptions = queryOptions({
    queryKey: ['branch'],
    queryFn: () => getBranch(),
})

export const jobPositionsQueryOptions = queryOptions({
    queryKey: ['jobPositions'],
    queryFn: () => getJobPositions(),
})

export const hmoPlansQueryOptions = queryOptions({
    queryKey: ['hmoPlan'],
    queryFn: () => getHMOPlans(),
})

export const hmoGroupsQueryOptions = queryOptions({
    queryKey: ['hmoGroups'],
    queryFn: () => getHMOGroups(),
})


export const hmoCompaniesQueryOptions = queryOptions({
    queryKey: ['hmoCompanies'],
    queryFn: () => getHMOCompanies(),
})

export const historyTakingQueryOptions = queryOptions({
    queryKey: ['historyTaking'],
    queryFn: () => getHistoryTaking(),
})

export const examinationQueryOptions = queryOptions({
    queryKey: ['examination'],
    queryFn: () => getExamination(),
})

export const diagnosisQueryOptions = queryOptions({
    queryKey: ['diagnosis'],
    queryFn: () => getDiagnosis(),
})

export const treatmentPlanQueryOptions = queryOptions({
    queryKey: ['treatmentPlan'],
    queryFn: () => getTreatmentPlan(),
})

export const paymentMethodsQueryOptions = queryOptions({
    queryKey: ['paymentMethod'],
    queryFn: () => getPaymentMethods(),
})

export const cashpointsQueryOptions = queryOptions({
    queryKey: ['cashpoints'],
    queryFn: () => getCashPoints(),
})

export const drugOrGenericQueryOptions = queryOptions({
    queryKey: ['drugOrGeneric'],
    queryFn: () => getDrugOrGeneric(),
})

export const drugOrGenericBrandQueryOptions = queryOptions({
    queryKey: ['brand'],
    queryFn: () => getDrugOrGenericBrand(),
})
export const departmentsQueryOptions = queryOptions({
    queryKey: ['departments'],
    queryFn: () => getDepartments(),
})
