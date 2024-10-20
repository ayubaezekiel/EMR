import { Card, Heading, Spinner, Tabs } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { AppointmentCheckedIn } from "../../../../components/appointment/AppointmentCheckedIn";
import { AppointmentCompleted } from "../../../../components/appointment/AppointmentCompleted";
import { AppointmentMissed } from "../../../../components/appointment/AppointmentMissed";
import { AppointmentWaiting } from "../../../../components/appointment/AppointmentWaiting";
import { CreateAppointmentForm } from "../../../../forms/AppointmentForm";
import { useProfile } from "@/lib/hooks";

export const Route = createFileRoute("/_layout/dashboard/appointments/")({
  component: () => (
    <>
      <Heading mb={"3"}>Appointments</Heading>
      <AppointmentCard />
    </>
  ),
});

function AppointmentCard() {
  const { isProfilePending, profile_data } = useProfile();
  return (
    <div className="w-full">
      <Card variant="ghost" my={"3"} style={{ background: "var(--accent-2)" }}>
        <CreateAppointmentForm isSchedule={false} patientId="" />
      </Card>

      {isProfilePending ? (
        <Spinner />
      ) : (
        <Tabs.Root
          defaultValue={
            profile_data?.has_access_to_nursing
              ? "waiting"
              : profile_data?.has_access_to_doctor_priviledges
                ? "checked"
                : "completed"
          }
        >
          <Tabs.List>
            {profile_data?.has_access_to_nursing && (
              <Tabs.Trigger value="waiting">Waiting</Tabs.Trigger>
            )}
            {profile_data?.has_access_to_doctor_priviledges && (
              <Tabs.Trigger value="checked">Checked In</Tabs.Trigger>
            )}

            <Tabs.Trigger value="missed">Missed</Tabs.Trigger>
            <Tabs.Trigger value="completed">Completed</Tabs.Trigger>
          </Tabs.List>
          {profile_data?.has_access_to_nursing && (
            <Tabs.Content value="waiting" mt={"2"}>
              <AppointmentWaiting />
            </Tabs.Content>
          )}
          {profile_data?.has_access_to_doctor_priviledges && (
            <Tabs.Content value="checked" mt={"2"}>
              <AppointmentCheckedIn />
            </Tabs.Content>
          )}

          <Tabs.Content value="missed" mt={"2"}>
            <AppointmentMissed />
          </Tabs.Content>

          <Tabs.Content value="completed" mt={"2"}>
            <AppointmentCompleted />
          </Tabs.Content>
        </Tabs.Root>
      )}
    </div>
  );
}
