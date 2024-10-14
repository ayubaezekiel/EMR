import { Card, Heading, Tabs } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import {
  RadiologyCardCompleted,
  RadiologyCardWaiting,
} from "../../../../components/request/RadiologyRequests";
import { CreateRadiologyRequestForm } from "../../../../forms/requests/RadioloyRequestForm";

export const Route = createFileRoute("/_layout/dashboard/radiology/")({
  component: () => (
    <>
      <Heading mb={"3"}>Radiology Requests</Heading>
      <Radiology />
    </>
  ),
});

const Radiology = () => {
  return (
    <div>
      <Card variant="ghost" my={"3"} style={{ background: "var(--accent-2)" }}>
        <CreateRadiologyRequestForm />
      </Card>
      <Tabs.Root defaultValue="waiting" my={"4"}>
        <Tabs.List>
          <Tabs.Trigger value="waiting">Waiting</Tabs.Trigger>
          <Tabs.Trigger value="completed">Completed</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="waiting" mt={"2"}>
          <RadiologyCardWaiting />
        </Tabs.Content>

        <Tabs.Content value="completed" mt={"2"}>
          <RadiologyCardCompleted />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
