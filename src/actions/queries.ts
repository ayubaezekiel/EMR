import { queryOptions } from "@tanstack/react-query"
import { getAppointments, getAppointmentTypes, getBranch, getCashPoints, getClinics, getConsultationSpecialties, getConsultationTemplates, getDepartments, getDiagnosis, getExamination, getHistoryTaking, getHMOCompanies, getHMOGroups, getHMOPlans, getJobPositions, getLabTest, getLabTestCategories, getLabTestParams, getLabTestTemplate, getPatients, getPatientVitals, getPaymentMethods, getRequest, getServiceTypes, getSpecialties, getTreatmentPlan, getVitals } from "./actions"

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

export const labTestTempQueryOptions = queryOptions({
    queryKey: ['labTestTemp'],
    queryFn: () => getLabTestTemplate(),
})

export const specialtiesQueryOptions = queryOptions({
    queryKey: ['specialties'],
    queryFn: () => getSpecialties(),
})

export const consultationSpecialtiesQueryOptions = queryOptions({
    queryKey: ['consultationSpecialties'],
    queryFn: () => getConsultationSpecialties(),
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

export const serviceTypesQueryOptions = queryOptions({
    queryKey: ['serviceTypes'],
    queryFn: () => getServiceTypes(),
})

export const departmentsQueryOptions = queryOptions({
    queryKey: ['departments'],
    queryFn: () => getDepartments(),
})
