import { createFileRoute } from "@tanstack/react-router";

import { DateRangePicker } from "@nextui-org/date-picker";
import { Card, Heading, Tabs } from "@radix-ui/themes";
import {
	ProcedureRequestCompletedCard,
	ProcedureRequestWaitingCard,
} from "../../../../components/request/ProcedureRequests";
import { CreateProcedureRequestForm } from "../../../../forms/requests/ProcedureRequestForm";

export const Route = createFileRoute("/_layout/dashboard/procedures/")({
	component: () => (
		<>
			<Heading mb={"3"}>Produre Requests</Heading>
			<Procedure />
		</>
	),
});

const Procedure = () => {
	return (
		<div>
			<Card variant="ghost" my={"3"} style={{ background: "var(--accent-2)" }}>
				<div className="flex justify-between flex-col gap-2 md:flex-row">
					<CreateProcedureRequestForm />

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
					<ProcedureRequestWaitingCard />
				</Tabs.Content>

				<Tabs.Content value="completed" mt={"2"}>
					<ProcedureRequestCompletedCard />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
};
