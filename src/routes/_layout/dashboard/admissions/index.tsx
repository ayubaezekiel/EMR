import { Card, Heading, Tabs } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import {
  AdmissionActiveCard,
  AdmissionDischargedCard,
} from "../../../../components/admission/Adimissions";
import { AvailableBeds } from "../../../../components/admission/AvailableBeds";
import { CreateAdmissionForm } from "../../../../forms/admission/AdmissionForm";

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
        </div>
      </Card>
      <Tabs.Root defaultValue="active" my={"4"}>
        <Tabs.List>
          <Tabs.Trigger value="active">Active</Tabs.Trigger>
          <Tabs.Trigger value="discharged">Discharged</Tabs.Trigger>
          <Tabs.Trigger value="beds">Available Beds</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="active" mt={"2"}>
          <AdmissionActiveCard />
        </Tabs.Content>
        <Tabs.Content value="discharged" mt={"2"}>
          <AdmissionDischargedCard />
        </Tabs.Content>
        <Tabs.Content value="beds" mt={"2"}>
          <AvailableBeds />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
