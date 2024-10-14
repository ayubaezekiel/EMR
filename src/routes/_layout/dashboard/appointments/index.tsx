import { Card, Heading, Tabs } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { AppointmentCheckedIn } from "../../../../components/appointment/AppointmentCheckedIn";
import { AppointmentCompleted } from "../../../../components/appointment/AppointmentCompleted";
import { AppointmentMissed } from "../../../../components/appointment/AppointmentMissed";
import { AppointmentWaiting } from "../../../../components/appointment/AppointmentWaiting";
import { CreateAppointmentForm } from "../../../../forms/AppointmentForm";

export const Route = createFileRoute("/_layout/dashboard/appointments/")({
  component: () => (
    <>
      <Heading mb={"3"}>Appointments</Heading>
      <AppointmentCard />
    </>
  ),
});

function AppointmentCard() {
  return (
    <div className="w-full">
      <Card variant="ghost" my={"3"} style={{ background: "var(--accent-2)" }}>
        <CreateAppointmentForm />
      </Card>

      <Tabs.Root defaultValue="waiting">
        <Tabs.List>
          <Tabs.Trigger value="waiting">Waiting</Tabs.Trigger>
          <Tabs.Trigger value="checked">Checked In</Tabs.Trigger>
          <Tabs.Trigger value="missed">Missed</Tabs.Trigger>
          <Tabs.Trigger value="completed">Completed</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="waiting" mt={"2"}>
          <AppointmentWaiting />
        </Tabs.Content>
        <Tabs.Content value="checked" mt={"2"}>
          <AppointmentCheckedIn />
        </Tabs.Content>
        <Tabs.Content value="missed" mt={"2"}>
          <AppointmentMissed />
        </Tabs.Content>

        <Tabs.Content value="completed" mt={"2"}>
          <AppointmentCompleted />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
