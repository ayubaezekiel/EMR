import { createFileRoute } from "@tanstack/react-router";

import { DateRangePicker } from "@nextui-org/date-picker";
import { Card, Heading, Tabs } from "@radix-ui/themes";
import { CreatePharmRequestForm } from "../../../../forms/requests/PharmRequestForm";
import {
	PharmRequestCompletedCard,
	PharmRequestWaitingCard,
} from "../../../../components/request/PharmRequests";

export const Route = createFileRoute("/_layout/dashboard/pharmacy/")({
	component: () => (
		<>
			<Heading mb={"3"}>Pharmacy Requests</Heading>
			<Pharmacy />
		</>
	),
});

const Pharmacy = () => {
	return (
		<div>
			<Card variant="ghost" my={"3"} style={{ background: "var(--accent-2)" }}>
				<div className="flex justify-between flex-col gap-2 md:flex-row">
					<CreatePharmRequestForm />

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
					<PharmRequestWaitingCard />
				</Tabs.Content>

				<Tabs.Content value="completed" mt={"2"}>
					<PharmRequestCompletedCard />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
};
