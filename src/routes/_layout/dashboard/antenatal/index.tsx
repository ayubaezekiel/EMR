import { createFileRoute } from "@tanstack/react-router";

import {
	AntenatalRequestCompletedCard,
	AntenatalRequestWaitingCard,
} from "@/components/request/AntenatalRequest";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Card, Heading, Tabs } from "@radix-ui/themes";
import { CreateAntenatalRequestForm } from "../../../../forms/requests/AntenatalRequestForm";

export const Route = createFileRoute("/_layout/dashboard/antenatal/")({
	component: () => (
		<>
			<Heading mb={"3"}>Antenatal Requests</Heading>
			<AntenatalRequest />
		</>
	),
});

const AntenatalRequest = () => {
	return (
		<div>
			<Card variant="ghost" my={"3"} style={{ background: "var(--accent-2)" }}>
				<div className="flex justify-between flex-col gap-2 md:flex-row">
					<CreateAntenatalRequestForm />

					<div className="flex gap-2 flex-col">
						<DateRangePicker />
					</div>
				</div>
			</Card>
			<Tabs.Root defaultValue="active" my={"4"}>
				<Tabs.List>
					<Tabs.Trigger value="active">Active</Tabs.Trigger>
					<Tabs.Trigger value="completed">Completed</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content value="active" mt={"2"}>
					<AntenatalRequestWaitingCard />
				</Tabs.Content>

				<Tabs.Content value="completed" mt={"2"}>
					<AntenatalRequestCompletedCard />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
};
