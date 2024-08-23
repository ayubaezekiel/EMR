import { createFileRoute } from "@tanstack/react-router";

import { DateRangePicker } from "@nextui-org/date-picker";
import { Card, Heading, Tabs } from "@radix-ui/themes";
import {
	ProcedureRequestCompletedCard,
	ProcedureRequestWaitingCard,
} from "../../../../components/request/ProcedureRequests";
import { CreateAdmissionForm } from "../../../../forms/admission/AdmissionForm";
import { AdmissionActiveCard } from "../../../../components/admission/Adimissions";

export const Route = createFileRoute("/_layout/dashboard/admissions/")({
	component: () => (
		<>
			<Heading mb={"3"}>Admissions</Heading>
			<AdmissionsView />
		</>
	),
});

const AdmissionsView = () => {
	return (
		<div>
			<Card variant="ghost" my={"3"} style={{ background: "var(--accent-2)" }}>
				<div className="flex justify-between flex-col gap-2 md:flex-row">
					<CreateAdmissionForm />

					<div className="flex gap-2 flex-col">
						<DateRangePicker />
					</div>
				</div>
			</Card>
			<Tabs.Root defaultValue="active" my={"4"}>
				<Tabs.List>
					<Tabs.Trigger value="active">Active</Tabs.Trigger>
					<Tabs.Trigger value="inbound">Inbound</Tabs.Trigger>
					<Tabs.Trigger value="a-treatment-sheet">
						Admissions Treatment-Sheet
					</Tabs.Trigger>
					<Tabs.Trigger value="o-treatment-sheet">
						OutPatient Treatment-Sheet
					</Tabs.Trigger>
					<Tabs.Trigger value="report">General Nursing Reports</Tabs.Trigger>
					<Tabs.Trigger value="beds">Available Beds</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="active" mt={"2"}>
					<AdmissionActiveCard />
				</Tabs.Content>
				<Tabs.Content value="inbound" mt={"2"}>
					<ProcedureRequestCompletedCard />
				</Tabs.Content>
				<Tabs.Content value="a-treatment-sheet" mt={"2"}>
					<ProcedureRequestWaitingCard />
				</Tabs.Content>
				<Tabs.Content value="o-treatment-sheet" mt={"2"}>
					<ProcedureRequestWaitingCard />
				</Tabs.Content>
				<Tabs.Content value="report" mt={"2"}>
					<ProcedureRequestCompletedCard />
				</Tabs.Content>
				<Tabs.Content value="beds" mt={"2"}>
					<ProcedureRequestCompletedCard />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
};
