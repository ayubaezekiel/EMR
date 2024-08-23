import { DateRangePicker } from "@nextui-org/date-picker";
import { Card, Heading, Tabs } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

import {
	LabRequestCompletedCard,
	LabRequestWaitingCard,
} from "../../../../components/request/LabRequests";
import { CreateLabRequestForm } from "../../../../forms/requests/LabRequestForm";

export const Route = createFileRoute("/_layout/dashboard/lab/")({
	component: () => (
		<div>
			<>
				<Heading mb={"3"}>Laboratory Requests</Heading>
				<LabRequest />
			</>
		</div>
	),
});

const LabRequest = () => {
	return (
		<div>
			<Card variant="ghost" my={"3"} style={{ background: "var(--accent-2)" }}>
				<div className="flex justify-between flex-col gap-2 md:flex-row">
					<CreateLabRequestForm />

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
					<LabRequestWaitingCard />
				</Tabs.Content>

				<Tabs.Content value="completed" mt={"2"}>
					<LabRequestCompletedCard />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
};
