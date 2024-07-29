import { Card, DataList, Heading, Tabs } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";

import { getPatientById } from "../../../../actions/actions";
import PendingComponent from "../../../../components/PendingComponent";

export const Route = createFileRoute("/_layout/dashboard/patients/$patientId")({
  component: () => (
    <div>
      <Heading>Patient Profile</Heading>
      <TopPanel />
      <PatientProfileLayout />
    </div>
  ),
});

const TopPanel = () => {
  const pageParams = useParams({
    from: "/_layout/dashboard/patients/$patientId",
  });

  const { data, isPending } = useQuery({
    queryFn: () => getPatientById(pageParams.patientId),
    queryKey: ["patientById", pageParams.patientId],
  });

  if (isPending) return <PendingComponent />;

  return (
    <Card my={"6"} variant="ghost" style={{ background: "var(--accent-3)" }}>
      <DataList.Root orientation={{ initial: "vertical", sm: "horizontal" }}>
        <DataList.Item>
          <DataList.Label minWidth="88px">Name</DataList.Label>
          <DataList.Value>
            {data?.patient_data?.first_name} {data?.patient_data?.middle_name}{" "}
            {data?.patient_data?.last_name}
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">HMO Plan</DataList.Label>
          <DataList.Value>{data?.patient_data?.hmo_plans?.name}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">HMO Code</DataList.Label>
          <DataList.Value>{data?.patient_data?.hmo_code}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Contact</DataList.Label>
          <DataList.Value>{data?.patient_data?.phone}</DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </Card>
  );
};

const PatientProfileLayout = () => {
  return (
    <div>
      <Tabs.Root defaultValue="vitals">
        <Tabs.List>
          <Tabs.Trigger value="vitals">Vitals</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="vitals" mt={"4"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
          distinctio dolor eaque? Voluptatem quis pariatur dolorum error
          adipisci vel perferendis odit! Aliquam quo magni et nobis fugit qui
          quibusdam labore.
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
