import { Card, Heading, Tabs } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import {
  ConsumableRequestCompletedCard,
  ConsumableRequestWaitingCard,
} from "../../../../components/request/ConsumableRequest";
import { CreateConsumableRequestForm } from "../../../../forms/requests/ConsumableRequestForm";

export const Route = createFileRoute("/_layout/dashboard/consumables/")({
  component: () => (
    <>
      <Heading mb={"3"}>Consumable Requests</Heading>
      <ConsumableRequest />
    </>
  ),
});

const ConsumableRequest = () => {
  return (
    <div>
      <Card variant="ghost" my={"3"} style={{ background: "var(--accent-2)" }}>
        <CreateConsumableRequestForm />
      </Card>
      <Tabs.Root defaultValue="waiting" my={"4"}>
        <Tabs.List>
          <Tabs.Trigger value="waiting">Waiting</Tabs.Trigger>
          <Tabs.Trigger value="completed">Completed</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="waiting" mt={"2"}>
          <ConsumableRequestWaitingCard />
        </Tabs.Content>

        <Tabs.Content value="completed" mt={"2"}>
          <ConsumableRequestCompletedCard />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
