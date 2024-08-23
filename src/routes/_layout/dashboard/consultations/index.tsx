import { createFileRoute } from "@tanstack/react-router";

import { DateRangePicker } from "@nextui-org/date-picker";
import { Card, Heading, Tabs } from "@radix-ui/themes";
import {
	ConsultationRequestCompletedCard,
	ConsultationRequestWaitingCard,
} from "../../../../components/request/ConsultationRequest";
import { CreateConsultationRequestForm } from "../../../../forms/requests/ConsultationRequestForm";

export const Route = createFileRoute("/_layout/dashboard/consultations/")({
	component: () => (
		<>
			<Heading mb={"3"}>Consultation Requests</Heading>
			<Procedure />
		</>
	),
});

const Procedure = () => {
	return (
		<div>
			<Card variant="ghost" my={"3"} style={{ background: "var(--accent-2)" }}>
				<div className="flex justify-between flex-col gap-2 md:flex-row">
					<CreateConsultationRequestForm />

					<div className="flex gap-2 flex-col">
						<DateRangePicker />
					</div>
				</div>
			</Card>
			<Tabs.Root defaultValue="waiting" my={"4"}>
				<Tabs.List>
					<Tabs.Trigger value="waiting">Waiting</Tabs.Trigger>
					<Tabs.Trigger value="completed">Completed</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content value="waiting" mt={"2"}>
					<ConsultationRequestWaitingCard />
				</Tabs.Content>

				<Tabs.Content value="completed" mt={"2"}>
					<ConsultationRequestCompletedCard />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
};
