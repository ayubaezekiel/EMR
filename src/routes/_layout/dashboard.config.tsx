import {
  Badge,
  Box,
  Button,
  Card,
  DataList,
  Flex,
  Heading,
  Spinner,
  Tabs,
  Text,
} from "@radix-ui/themes";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppointmentType } from "../../components/config/AppointmentTypes";
import { Branch } from "../../components/config/Branch";
import { Cashpoint } from "../../components/config/Cashpoint";
import { Clinics } from "../../components/config/Clinics";
import { Departments } from "../../components/config/Departments";
import InsuranceBillers from "../../components/config/insurance/InsuranceBillers";
import { InsurancePlan } from "../../components/config/insurance/InsurancePlan";
import { JobPostion } from "../../components/config/JobPosition";
import { PaymentMethod } from "../../components/config/PaymentMethod";
import { ServiceTypes } from "../../components/config/ServiceTypes";
import { Specialties } from "../../components/config/Specialties";
import { services_routes } from "../../lib/constants";
import supabase from "../../supabase/client";

const loadData = async () => {
  const { data: insurance_plan_data, error: insurance_plan_err } =
    await supabase.from("insurance_plan").select("*");

  const { data: appointment_type_data, error: appointment_type_err } =
    await supabase.from("appointments_types").select("*");

  const { data: payment_method_data, error: payment_method_err } =
    await supabase.from("payment_methods").select("*");

  const { data: clinics_data, error: clinics_err } = await supabase
    .from("clinics")
    .select("*");

  const { data: specialties_data, error: specialties_err } = await supabase
    .from("specialties")
    .select("*");

  const { data: cashpoint_data, error: cashpoint_err } = await supabase
    .from("cash_points")
    .select("*");

  const { data: job_positions_data, error: job_positions_err } = await supabase
    .from("job_positions")
    .select("*");

  const { data: branch_data, error: branch_err } = await supabase
    .from("branch")
    .select("*");

  const { data: service_type_data, error: service_type_err } = await supabase
    .from("service_types")
    .select("*");

  const { data: department_data, error: department_err } = await supabase
    .from("departments")
    .select("*");

  const err_cond =
    insurance_plan_err ||
    appointment_type_err ||
    clinics_err ||
    specialties_err ||
    cashpoint_err ||
    job_positions_err ||
    branch_err ||
    service_type_err ||
    payment_method_err ||
    department_err;

  const err_msg =
    insurance_plan_err?.message ||
    appointment_type_err?.message ||
    clinics_err?.message ||
    specialties_err?.message ||
    cashpoint_err?.message ||
    job_positions_err?.message ||
    branch_err?.message ||
    service_type_err?.message ||
    payment_method_err?.message ||
    department_err?.message;

  if (err_cond) {
    toast.error(err_msg);
  }

  const data = {
    appointment_type: appointment_type_data,
    insurance_plan: insurance_plan_data,
    clinics: clinics_data,
    specialties: specialties_data,
    cashpoints: cashpoint_data,
    job_positions: job_positions_data,
    branch: branch_data,
    service_type: service_type_data,
    payment_method: payment_method_data,
    department: department_data,
  };

  if (!data) {
    <Spinner size={"3"} />;
  }

  return { data };
};

export const Route = createFileRoute("/_layout/dashboard/config")({
  loader: loadData,
  component: () => (
    <>
      <Heading mb={"3"}>Configuration</Heading>
      <Tabs.Root defaultValue="insurance" mt={"4"}>
        <Tabs.List>
          <Tabs.Trigger value="settings">Host Settings</Tabs.Trigger>
          <Tabs.Trigger value="services">Services</Tabs.Trigger>
          <Tabs.Trigger value="insurance">Insurance</Tabs.Trigger>
          <Tabs.Trigger value="data">Form Data</Tabs.Trigger>
        </Tabs.List>

        <Box mt="6">
          <Tabs.Content value="settings">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <Flex justify={"between"} mb={"4"}>
                  <Heading>Center</Heading>
                  <Button>Update</Button>
                </Flex>

                <DataList.Root>
                  <DataList.Item align="center">
                    <DataList.Label minWidth="88px">Valid till</DataList.Label>
                    <DataList.Value>
                      <Badge color="jade" variant="soft" radius="full">
                        {new Date().toDateString()}
                      </Badge>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">
                      Hospital name
                    </DataList.Label>
                    <DataList.Value>
                      SOKOTO STATE ADVANCED MEDICAL DIAGNOSTIC CENTER
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">State</DataList.Label>
                    <DataList.Value>Sokoto</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">LGA</DataList.Label>
                    <DataList.Value>
                      <Link href="mailto:vlad@workos.com">Wamako</Link>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">Address</DataList.Label>
                    <DataList.Value>FARFARU, Along Airport Road</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">Logo</DataList.Label>
                    <DataList.Value>img.png</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">Footer</DataList.Label>
                    <DataList.Value>
                      07049227774, 07049227776 | info@ssamdc.com
                    </DataList.Value>
                  </DataList.Item>

                  <DataList.Item>
                    <DataList.Label minWidth="88px">
                      Billing type
                    </DataList.Label>
                    <DataList.Value>Pre-Paid</DataList.Value>
                  </DataList.Item>
                </DataList.Root>
              </Card>
              <div>
                <Branch />
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="services">
            <div className="grid gap-4 md:grid-cols-3 mt-4">
              {services_routes.map((c) => (
                <Card style={{ height: "135px" }}>
                  <Heading>{c.name}</Heading>
                  <Text size={"1"}>{c.desc}</Text>
                  <div className="absolute bottom-2">
                    <Link to={c.route}>
                      <Button>{c.link_title}</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="insurance">
            <InsuranceBillers />
            <div className="mt-10">
              <InsurancePlan />
            </div>
          </Tabs.Content>

          <Tabs.Content value="data">
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div>
                <PaymentMethod />
              </div>
              <div>
                <ServiceTypes />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div>
                <JobPostion />
              </div>
              <div>
                <Cashpoint />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div>
                <AppointmentType />
              </div>
              <div>
                <Clinics />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div>
                <Specialties />
              </div>
              <div>
                <Departments />
              </div>
            </div>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </>
  ),
});
