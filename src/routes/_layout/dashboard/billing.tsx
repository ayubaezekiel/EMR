import { DateRangePicker } from "@nextui-org/react";
import { Card, Heading, SegmentedControl, Tabs } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { appointmentsTypesQueryOptions } from "../../../actions/queries";

import { AppointmentBillingCards } from "../../../components/billing/AppointmentBillingCard";
import { LabBillingCard } from "../../../components/billing/LabBillingCard";
import { PharmBillingCard } from "../../../components/billing/PharmBillingCard";
import PendingComponent from "../../../components/PendingComponent";
import { PatientForm } from "../../../forms/PatientForm";
import { RadiologyBillingCard } from "../../../components/billing/RadiologyBillingCard";

export const Route = createFileRoute("/_layout/dashboard/billing")({
  component: () => (
    <div>
      <Heading>Billing</Heading>
      <Billing />
    </div>
  ),
});

const Billing = () => {
  const [segment, setSegment] = useState("appointments");
  const { data: appointment_type, isPending: isAppointmentTypePending } =
    useQuery(appointmentsTypesQueryOptions);

  if (isAppointmentTypePending) return <PendingComponent />;

  return (
    <div>
      <Card variant="ghost" my={"4"} style={{ background: "var(--accent-2)" }}>
        <div className="flex justify-between flex-col gap-2 md:flex-row">
          <PatientForm />

          <div className="flex gap-2 flex-col">
            <DateRangePicker
              label="Event duration"
              hideTimeZone
              visibleMonths={2}
              // defaultValue={{
              //   start: parseZonedDateTime(
              //     "2024-04-01T00:45[America/Los_Angeles]"
              //   ),
              //   end: parseZonedDateTime(
              //     "2024-04-08T11:15[America/Los_Angeles]"
              //   ),
              // }}
            />
          </div>
        </div>
      </Card>
      <SegmentedControl.Root
        size={"3"}
        mt={"4"}
        defaultValue={segment}
        onValueChange={setSegment}
      >
        <SegmentedControl.Item value="appointments">
          Appointments
        </SegmentedControl.Item>
        <SegmentedControl.Item value="requests">Requests</SegmentedControl.Item>
      </SegmentedControl.Root>
      {segment === "appointments" && (
        <Tabs.Root
          defaultValue={appointment_type?.appointment_type_data![0].id}
        >
          <Tabs.List>
            {appointment_type?.appointment_type_data?.map((t) => (
              <Tabs.Trigger value={t.id}>{t.name}</Tabs.Trigger>
            ))}
          </Tabs.List>
          {appointment_type?.appointment_type_data?.map((t) => (
            <Tabs.Content value={t.id} mt={"2"}>
              <AppointmentBillingCards typeName={t.name} type={t.id} />
            </Tabs.Content>
          ))}
        </Tabs.Root>
      )}
      {segment === "requests" && (
        <Tabs.Root defaultValue={"lab"}>
          <Tabs.List>
            <Tabs.Trigger value={"lab"}>Laboratory Requests</Tabs.Trigger>
            <Tabs.Trigger value={"pharm"}>Pharmacy Requests</Tabs.Trigger>
            <Tabs.Trigger value={"radiology"}>Radiology Requests</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value={"lab"} mt={"2"}>
            <LabBillingCard />
          </Tabs.Content>
          <Tabs.Content value={"pharm"} mt={"2"}>
            <PharmBillingCard />
          </Tabs.Content>
          <Tabs.Content value={"radiology"} mt={"2"}>
            <RadiologyBillingCard />
          </Tabs.Content>
        </Tabs.Root>
      )}
    </div>
  );
};
