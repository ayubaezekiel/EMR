import { Card, DataList, Flex, Heading, Tabs } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";

import {
	getPatientById,
	getPatientVitalsById,
} from "../../../../actions/actions";
import PendingComponent from "../../../../components/PendingComponent";
import { DataTable } from "../../../../components/table/DataTable";
import { patient_vitals_column } from "../../../../components/table/columns/vitals";
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

	if (isPending) return <PendingComponent />;

	return (
		<Card my={"6"} variant="ghost" style={{ background: "var(--accent-3)" }}>
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
					<DataList.Value>{data?.patient_data?.hmo_plans?.name}</DataList.Value>
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
		</Card>
	);
};

const PatientProfileLayout = () => {
	const { patientId } = useParams({
		from: "/_layout/dashboard/patients/$patientId",
	});
	const { data, isPending } = useQuery({
		queryFn: () => getPatientVitalsById(patientId),
		queryKey: ["patientVitalsById"],
	});

	if (isPending) return <PendingComponent />;

	return (
		<div>
			<Tabs.Root defaultValue="vitals">
				<Tabs.List>
					<Tabs.Trigger value="vitals">Vitals</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="vitals" mt={"4"}>
					<Flex justify={"end"}>
						<CreatePatientVitalsForm patientId={patientId} />
					</Flex>
					<DataTable
						columns={patient_vitals_column}
						data={data?.patient_vitals_data ?? []}
						filterLabel="search by name..."
						filterer="name"
					/>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
};
