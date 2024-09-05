import { Card, DataList, Flex, Heading, Spinner, Tabs } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";

import { useMemo } from "react";
import {
	getPatientById,
	getPatientVitalsById,
} from "../../../../actions/actions";
import { PatientAppointments } from "../../../../components/appointment/PatientAppointment";
import { PatientConsumableRequestCard } from "../../../../components/request/ConsumableRequest";
import { PatientLabRequestCard } from "../../../../components/request/LabRequests";
import { PatientPharmRequestCard } from "../../../../components/request/PharmRequests";
import { PatientProcedureRequestCard } from "../../../../components/request/ProcedureRequests";
import { PatientRadiologyCard } from "../../../../components/request/RadiologyRequests";
import { DataTable } from "../../../../components/table/DataTable";
import { patient_vitals_column } from "../../../../components/table/columns/vitals";
import { UpdatePatientForm } from "../../../../forms/PatientForm";
import { CreatePatientVitalsForm } from "../../../../forms/config/Vitals";

export const Route = createFileRoute("/_layout/dashboard/patients/$patientId")({
	component: () => (
		<div>
			<Heading>Patient Profile</Heading>
			<TopPanel />
			<PatientProfileLayout />
		</div>
	),
});

const TopPanel = () => {
	const pageParams = useParams({
		from: "/_layout/dashboard/patients/$patientId",
	});

	const { data, isPending } = useQuery({
		queryFn: () => getPatientById(pageParams.patientId),
		queryKey: ["patientById", pageParams.patientId],
	});

	return isPending ? (
		<Spinner />
	) : (
		<Card my={"6"} variant="ghost" style={{ background: "var(--accent-3)" }}>
			<Flex justify={"between"}>
				<DataList.Root orientation={{ initial: "vertical", sm: "horizontal" }}>
					<DataList.Item>
						<DataList.Label minWidth="88px">Name</DataList.Label>
						<DataList.Value>
							{data?.patient_data?.first_name} {data?.patient_data?.middle_name}{" "}
							{data?.patient_data?.last_name}
						</DataList.Value>
					</DataList.Item>
					<DataList.Item>
						<DataList.Label minWidth="88px">HMO Plan</DataList.Label>
						<DataList.Value>
							{data?.patient_data?.hmo_plans?.name}
						</DataList.Value>
					</DataList.Item>
					<DataList.Item>
						<DataList.Label minWidth="88px">HMO Code</DataList.Label>
						<DataList.Value>{data?.patient_data?.hmo_code}</DataList.Value>
					</DataList.Item>
					<DataList.Item>
						<DataList.Label minWidth="88px">Contact</DataList.Label>
						<DataList.Value>{data?.patient_data?.phone}</DataList.Value>
					</DataList.Item>
				</DataList.Root>
				<UpdatePatientForm {...data?.patient_data} />
			</Flex>
		</Card>
	);
};

const PatientProfileLayout = () => {
	const { patientId } = useParams({
		from: "/_layout/dashboard/patients/$patientId",
	});
	const { data, isPending } = useQuery({
		queryFn: () => getPatientVitalsById(patientId),
		queryKey: ["patientVitalsById", patientId],
	});

	const vitals =
		useMemo(
			() =>
				data?.patient_vitals_data?.map((v) => ({
					...v,
					profile: `${v.profile?.first_name} ${v.profile?.middle_name ?? ""} ${v.profile?.last_name}`,
					patient_id: v.patient_id,
				})),
			[data?.patient_vitals_data],
		) ?? [];

	return isPending ? (
		<Spinner />
	) : (
		<Tabs.Root defaultValue="vitals">
			<Tabs.List>
				<Tabs.Trigger value="vitals">Vitals</Tabs.Trigger>
				<Tabs.Trigger value="appointment">Appointments</Tabs.Trigger>
				<Tabs.Trigger value="requests">Requests</Tabs.Trigger>
				<Tabs.Trigger value="admission">Admission</Tabs.Trigger>
				<Tabs.Trigger value="bills">Bills</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="vitals" mt={"4"}>
				<Flex justify={"end"}>
					<CreatePatientVitalsForm patientId={patientId} />
				</Flex>
				<DataTable
					columns={patient_vitals_column}
					data={vitals}
					filterLabel="search by name..."
					filterer="name"
				/>
			</Tabs.Content>
			<Tabs.Content value="appointment" mt={"4"}>
				<PatientAppointments patientId={patientId} />
			</Tabs.Content>
			<Tabs.Content value="requests" mt={"4"}>
				<Tabs.Root defaultValue="lab">
					<Tabs.List>
						<Tabs.Trigger value="lab">Laboratory Request</Tabs.Trigger>
						<Tabs.Trigger value="pharmacy">Pharmacy Request</Tabs.Trigger>
						<Tabs.Trigger value="consultation">
							Consultation Request
						</Tabs.Trigger>
						<Tabs.Trigger value="radiology">Radiology Request</Tabs.Trigger>
						<Tabs.Trigger value="consumable">Consumable Request</Tabs.Trigger>
						<Tabs.Trigger value="procedure">Procedure Request</Tabs.Trigger>
						<Tabs.Trigger value="antenatal">Antenatal Request</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="lab">
						<PatientLabRequestCard patientId={patientId} />
					</Tabs.Content>
					<Tabs.Content value="pharmacy">
						<PatientPharmRequestCard patientId={patientId} />
					</Tabs.Content>
					<Tabs.Content value="consultation">
						<PatientConsumableRequestCard patientId={patientId} />
					</Tabs.Content>
					<Tabs.Content value="radiology">
						<PatientRadiologyCard patientId={patientId} />
					</Tabs.Content>
					<Tabs.Content value="consumable">
						<PatientConsumableRequestCard patientId={patientId} />
					</Tabs.Content>
					<Tabs.Content value="procedure">
						<PatientProcedureRequestCard patientId={patientId} />
					</Tabs.Content>
					<Tabs.Content value="antenatal">
						<PatientAppointments patientId={patientId} />
					</Tabs.Content>
				</Tabs.Root>
			</Tabs.Content>
			<Tabs.Content value="admission">
				<PatientAppointments patientId={patientId} />
			</Tabs.Content>
			<Tabs.Content value="bills">
				<PatientAppointments patientId={patientId} />
			</Tabs.Content>
		</Tabs.Root>
	);
};
