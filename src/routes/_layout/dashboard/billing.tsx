import { DateRangePicker } from "@nextui-org/react";
import {
	Card,
	Heading,
	SegmentedControl,
	Spinner,
	Tabs,
} from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAppointmentsTypesQuery } from "../../../actions/queries";

import { AntenatalBillingCard } from "@/components/billing/AntenatalBillingCard";
import { AdmissionBillingCard } from "../../../components/billing/AdmissionBillingCard";
import { AppointmentBillingCards } from "../../../components/billing/AppointmentBillingCard";
import { ConsumableBillingCard } from "../../../components/billing/ConsumableBillingCard";
import { LabBillingCard } from "../../../components/billing/LabBillingCard";
import { PharmBillingCard } from "../../../components/billing/PharmBillingCard";
import { ProcedureBillingCard } from "../../../components/billing/ProcedureBillingCard";
import { RadiologyBillingCard } from "../../../components/billing/RadiologyBillingCard";
import { PatientForm } from "../../../forms/PatientForm";

export const Route = createFileRoute("/_layout/dashboard/billing")({
	component: () => (
		<div>
			<Heading>Billing</Heading>
			<Billing />
		</div>
	),
});

const Billing = () => {
	const [segment, setSegment] = useState("appointments");
	const { data: appointment_type, isPending: isAppointmentTypePending } =
		useAppointmentsTypesQuery();

	const default_app_type = appointment_type?.appointment_type_data?.at(0)?.id;

	return isAppointmentTypePending ? (
		<Spinner />
	) : (
		<div>
			<Card variant="ghost" my={"4"} style={{ background: "var(--accent-2)" }}>
				<div className="flex justify-between flex-col gap-2 md:flex-row">
					<PatientForm />

					<div className="flex gap-2 flex-col">
						<DateRangePicker
							label="Event duration"
							hideTimeZone
							visibleMonths={2}
						/>
					</div>
				</div>
			</Card>
			<SegmentedControl.Root
				size={"3"}
				mt={"4"}
				defaultValue={segment}
				onValueChange={setSegment}
			>
				<SegmentedControl.Item value="appointments">
					Appointments
				</SegmentedControl.Item>
				<SegmentedControl.Item value="requests">Requests</SegmentedControl.Item>
				<SegmentedControl.Item value="admissions">
					Admissions
				</SegmentedControl.Item>
			</SegmentedControl.Root>
			{segment === "appointments" && (
				<Tabs.Root defaultValue={default_app_type}>
					<Tabs.List>
						{appointment_type?.appointment_type_data?.map((t) => (
							<Tabs.Trigger key={t.id} value={t.id}>
								{t.name}
							</Tabs.Trigger>
						))}
					</Tabs.List>
					{appointment_type?.appointment_type_data?.map((t) => (
						<Tabs.Content key={t.id} value={t.id} mt={"2"}>
							<AppointmentBillingCards typeName={t.name} type={t.id} />
						</Tabs.Content>
					))}
				</Tabs.Root>
			)}
			{segment === "requests" && (
				<Tabs.Root defaultValue={"lab"}>
					<Tabs.List>
						<Tabs.Trigger value={"lab"}>Laboratory Requests</Tabs.Trigger>
						<Tabs.Trigger value={"pharm"}>Pharmacy Requests</Tabs.Trigger>
						<Tabs.Trigger value={"radiology"}>Radiology Requests</Tabs.Trigger>
						<Tabs.Trigger value={"consumable"}>
							Consumable Requests
						</Tabs.Trigger>
						<Tabs.Trigger value={"procedure"}>Procedure Requests</Tabs.Trigger>
						<Tabs.Trigger value={"antenatal"}>Antenatal Requests</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value={"lab"} mt={"2"}>
						<LabBillingCard />
					</Tabs.Content>
					<Tabs.Content value={"pharm"} mt={"2"}>
						<PharmBillingCard />
					</Tabs.Content>
					<Tabs.Content value={"radiology"} mt={"2"}>
						<RadiologyBillingCard />
					</Tabs.Content>
					<Tabs.Content value={"consumable"} mt={"2"}>
						<ConsumableBillingCard />
					</Tabs.Content>
					<Tabs.Content value={"procedure"} mt={"2"}>
						<ProcedureBillingCard />
					</Tabs.Content>
					<Tabs.Content value={"antenatal"} mt={"2"}>
						<AntenatalBillingCard />
					</Tabs.Content>
				</Tabs.Root>
			)}
			{segment === "admissions" && <AdmissionBillingCard />}
		</div>
	);
};
