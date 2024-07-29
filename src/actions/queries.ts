import { queryOptions } from "@tanstack/react-query"
import { getAppointments, getAppointmentTypes, getBranch, getCashPoints, getClinics, getConsultationSpecialties, getConsultationTemplates, getDepartments, getHMOCompanies, getHMOGroups, getHMOPlans, getJobPositions, getPatients, getPatientVitals, getPaymentMethods, getServiceTypes, getSpecialties, getVitals } from "./actions"

export const vitalsQueryOptions = queryOptions({
    queryKey: ['vitals'],
    queryFn: async () => await getVitals(),
})

export const patientVitalsQueryOptions = queryOptions({
    queryKey: ['patientVitals'],
    queryFn: async () => await getPatientVitals(),
})


export const patientsQueryOptions = queryOptions({
    queryKey: ['patients'],
    queryFn: async () => await getPatients(),
})



export const specialtiesQueryOptions = queryOptions({
    queryKey: ['specialties'],
    queryFn: async () => await getSpecialties(),
})

export const consultationSpecialtiesQueryOptions = queryOptions({
    queryKey: ['consultationSpecialties'],
    queryFn: async () => await getConsultationSpecialties(),
})

export const consultationTemplatesQueryOptions = queryOptions({
    queryKey: ['consultationTemplates'],
    queryFn: async () => await getConsultationTemplates(),
})

export const clinicsQueryOptions = queryOptions({
    queryKey: ['clinics'],
    queryFn: async () => await getClinics(),
})

export const appointmentsQueryOptions = queryOptions({
    queryKey: ['appointments'],
    queryFn: async () => await getAppointments(),
})

export const appointmentsTypesQueryOptions = queryOptions({
    queryKey: ['appointmentsTypes'],
    queryFn: async () => await getAppointmentTypes(),
})


export const branchQueryOptions = queryOptions({
    queryKey: ['branch'],
    queryFn: async () => await getBranch(),
})

export const jobPositionsQueryOptions = queryOptions({
    queryKey: ['jobPositions'],
    queryFn: async () => await getJobPositions(),
})

export const hmoPlansQueryOptions = queryOptions({
    queryKey: ['hmoPlan'],
    queryFn: async () => await getHMOPlans(),
})

export const hmoGroupsQueryOptions = queryOptions({
    queryKey: ['hmoGroups'],
    queryFn: async () => await getHMOGroups(),
})


export const hmoCompaniesQueryOptions = queryOptions({
    queryKey: ['hmoCompanies'],
    queryFn: async () => await getHMOCompanies(),
})


export const paymentMethodsQueryOptions = queryOptions({
    queryKey: ['paymentMethod'],
    queryFn: async () => await getPaymentMethods(),
})

export const cashpointsQueryOptions = queryOptions({
    queryKey: ['cashpoints'],
    queryFn: async () => await getCashPoints(),
})

export const serviceTypesQueryOptions = queryOptions({
    queryKey: ['serviceTypes'],
    queryFn: async () => await getServiceTypes(),
})

export const departmentsQueryOptions = queryOptions({
    queryKey: ['departments'],
    queryFn: async () => await getDepartments(),
})
