import { createFileRoute } from "@tanstack/react-router";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Select,
  Strong,
  Text,
} from "@radix-ui/themes";
import { Eye, UserCheck, Verified } from "lucide-react";
import { DateRangePicker } from "../../components/ui/date-range-picker";
import { CreateAppointmentForm } from "../../forms/AppointmentForm";
import supabase from "../../supabase/client";
import { toast } from "sonner";

const loadData = async () => {
  const { data: patient_data, error: patient_error } = await supabase
    .from("patients")
    .select("*");
  const { data: appointment_type_data, error: appointment_type_error } =
    await supabase.from("appointments_types").select("*");
  const { data: clinics_data, error: clinics_error } = await supabase
    .from("clinics")
    .select("*");

  const { data: specialties_data, error: specalties_error } = await supabase
    .from("specialties")
    .select("*");
  const err_cond =
    patient_error ||
    appointment_type_error ||
    clinics_error ||
    specalties_error;
  const err_cond_msg =
    patient_error?.message ||
    appointment_type_error?.message ||
    clinics_error?.message ||
    specalties_error?.message;

  if (err_cond) {
    toast.error(err_cond_msg);
  }

  const data = {
    patients: patient_data,
    appointment_type: appointment_type_data,
    clinics: clinics_data,
    specialties: specialties_data,
  };
  return data;
};
export const Route = createFileRoute("/_layout/dashboard/appointments")({
  loader: loadData,
  component: () => (
    <>
      <Heading mb={"3"}>Appointments</Heading>
      <TopPanel />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        <AppointmentCard />
        <AppointmentCard />
      </div>
    </>
  ),
});
const TopPanel = () => {
  return (
    <Card variant="ghost" my={"3"} style={{ background: "var(--accent-2)" }}>
      <div className="flex justify-between flex-col gap-2 md:flex-row">
        <CreateAppointmentForm />

        <div className="flex gap-2 flex-col">
          <DateRangePicker
            onUpdate={(values) => console.log(values)}
            initialDateFrom="2023-01-01"
            initialDateTo="2023-12-31"
            align="start"
            locale="en-GB"
            showCompare={false}
          />
          <Select.Root>
            <Select.Trigger placeholder="Filter by status" />
            <Select.Content position="popper">
              <Select.Group>
                <Select.Label>--filter by status--</Select.Label>
                <Select.Item value="orange">Orange</Select.Item>
                <Select.Item value="apple">Apple</Select.Item>
                <Select.Item value="grape" disabled>
                  Grape
                </Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <Select.Root>
            <Select.Trigger placeholder="Filter by clinic" />
            <Select.Content position="popper">
              <Select.Group>
                <Select.Label>--filter by clinic--</Select.Label>
                <Select.Item value="orange">Orange</Select.Item>
                <Select.Item value="apple">Apple</Select.Item>
                <Select.Item value="grape" disabled>
                  Grape
                </Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
      </div>
    </Card>
  );
};

function AppointmentCard() {
  return (
    <div>
      <Card>
        <Flex justify={"between"}>
          <Flex gap={"2"} align={"center"}>
            <Avatar fallback={<UserCheck />} radius="full" size={"5"} />
            <Flex direction={"column"}>
              <Flex gap={"1"} align={"center"}>
                <Strong>Abubakar, Umaima [CID030839]</Strong>
                <IconButton radius="full" variant="ghost">
                  <Verified className="stroke-[var(--accent-9)]" />
                </IconButton>
              </Flex>
              <Flex gap={"1"} align={"center"}>
                <Text size={"1"}>
                  <Strong>created</Strong>
                </Text>
                .<Text size={"1"}>2m ago</Text>
              </Flex>
            </Flex>
          </Flex>
          <Button variant="ghost">
            <Eye />
          </Button>
        </Flex>

        <Flex direction={"column"} mt={"4"}>
          <Flex gap={"2"} mb={"4"} direction={"column"} justify={"end"}>
            <div>
              <Badge radius="full">From: Fri, July 12th, 2024, 11:59PM</Badge>
            </div>
            <div>
              <Badge radius="full" color="red">
                To: Fri, July 12th, 2024, 11:59PM
              </Badge>
            </div>
          </Flex>
          <Strong>CONSULTATION</Strong>
          <Flex gap={"2"}>
            <Text>GENERAL CONSULTATION</Text>
            <Badge>Checked In</Badge>
          </Flex>
        </Flex>
        <Flex justify={"between"} mt={"4"}>
          <Button size={"2"} radius="full" variant="soft">
            Waiting
          </Button>
          <Button size={"2"} radius="full" variant="soft">
            Missed
          </Button>
          <Button size={"2"} radius="full" variant="soft">
            Checked In
          </Button>

          <Button size={"2"} radius="full">
            Attend
          </Button>
        </Flex>
      </Card>
    </div>
  );
}
