import { Box, Card, Heading, Tabs, Text } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { PatientForm } from "../../../forms/PatientForm";
import { getHMOPlans, getPatients } from "../../../actions/actions";

const loadData = async () => {
  const { hmo_plans_data } = await getHMOPlans();
  const { patient_data } = await getPatients();

  return { hmo_plans_data, patient_data };
};

export const Route = createFileRoute("/_layout/dashboard/billing")({
  loader: loadData,
  component: () => (
    <div>
      <Card
        variant="ghost"
        style={{ background: "var(--accent-3)", marginTop: "10px" }}
      >
        <div className="flex justify-between items-center">
          <Heading>Billing</Heading>
          <PatientForm />
        </div>
      </Card>

      <div className="mt-10">
        <Billing />
      </div>
    </div>
  ),
});

const Billing = () => {
  return (
    <Tabs.Root defaultValue="consultation">
      <Tabs.List>
        <Tabs.Trigger value="consultation">Consultation</Tabs.Trigger>
        <Tabs.Trigger value="laboratory">Laboratory</Tabs.Trigger>
        <Tabs.Trigger value="antenatal">Antenatal</Tabs.Trigger>
        <Tabs.Trigger value="radiology">Radiology</Tabs.Trigger>
        <Tabs.Trigger value="procedure">Medical Procudure</Tabs.Trigger>
        <Tabs.Trigger value="admission">Admission</Tabs.Trigger>
        <Tabs.Trigger value="vaccination">Vaccination</Tabs.Trigger>
        <Tabs.Trigger value="pharmacy">Pharmacy</Tabs.Trigger>
        <Tabs.Trigger value="consumables">Consumables</Tabs.Trigger>
      </Tabs.List>

      <Box mt="3">
        <Tabs.Content value="consultation">
          <Text size="2">Make changes to your appointment.</Text>
        </Tabs.Content>
        <Tabs.Content value="laboratory">
          <Text size="2">Access and update your laboratory.</Text>
        </Tabs.Content>
        <Tabs.Content value="antenatal">
          <Text size="2">Edit your profile or update contact information.</Text>
        </Tabs.Content>
        <Tabs.Content value="radiology">
          <Text size="2">Edit your profile or update contact information.</Text>
        </Tabs.Content>
        <Tabs.Content value="procedure">
          <Text size="2">Edit your profile or update contact information.</Text>
        </Tabs.Content>
        <Tabs.Content value="admission">
          <Text size="2">Edit your profile or update contact information.</Text>
        </Tabs.Content>
        <Tabs.Content value="vaccination">
          <Text size="2">Edit your profile or update contact information.</Text>
        </Tabs.Content>
        <Tabs.Content value="pharmacy">
          <Text size="2">Edit your profile or update contact information.</Text>
        </Tabs.Content>
        <Tabs.Content value="consumables">
          <Text size="2">Edit your profile or update contact information.</Text>
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
};
