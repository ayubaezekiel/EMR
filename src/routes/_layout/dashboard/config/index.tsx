import {
  Badge,
  Box,
  Button,
  Card,
  DataList,
  Flex,
  Heading,
  Tabs,
} from "@radix-ui/themes";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  appointmentsTypesQueryOptions,
  branchQueryOptions,
  cashpointsQueryOptions,
  clinicsQueryOptions,
  departmentsQueryOptions,
  hmoCompaniesQueryOptions,
  hmoGroupsQueryOptions,
  hmoPlansQueryOptions,
  jobPositionsQueryOptions,
  paymentMethodsQueryOptions,
  serviceTypesQueryOptions,
  specialtiesQueryOptions,
} from "../../../../actions/queries";
import { AppointmentType } from "../../../../components/config/AppointmentTypes";
import { Branch } from "../../../../components/config/Branch";
import { Cashpoint } from "../../../../components/config/Cashpoint";
import { Clinics } from "../../../../components/config/Clinics";
import { Departments } from "../../../../components/config/Departments";
import HMOCompanies from "../../../../components/config/insurance/HMOCompanies";
import { HMOGroups } from "../../../../components/config/insurance/HMOGroups";
import HMOPlans from "../../../../components/config/insurance/HMOPlans";
import { JobPostion } from "../../../../components/config/JobPosition";
import { PaymentMethod } from "../../../../components/config/PaymentMethod";
import { ServiceTypes } from "../../../../components/config/ServiceTypes";
import { Specialties } from "../../../../components/config/Specialties";
import { config_services_routes } from "../../../../lib/constants";
import { QueryClient } from "@tanstack/react-query";
import { Vitals } from "../../../../components/config/Vitals";

const loadData = async (queryClient: QueryClient) => {
  const { hmo_plans_data } =
    await queryClient.ensureQueryData(hmoPlansQueryOptions);
  const { appointment_type_data } = await queryClient.ensureQueryData(
    appointmentsTypesQueryOptions
  );

  const { clinics_data } =
    await queryClient.ensureQueryData(clinicsQueryOptions);
  const { specialties_data } = await queryClient.ensureQueryData(
    specialtiesQueryOptions
  );

  const { cashpoint_data } = await queryClient.ensureQueryData(
    cashpointsQueryOptions
  );
  const { job_positions_data } = await queryClient.ensureQueryData(
    jobPositionsQueryOptions
  );

  const { branch_data } = await queryClient.ensureQueryData(branchQueryOptions);
  const { service_type_data } = await queryClient.ensureQueryData(
    serviceTypesQueryOptions
  );

  const { payment_method_data } = await queryClient.ensureQueryData(
    paymentMethodsQueryOptions
  );
  const { department_data } = await queryClient.ensureQueryData(
    departmentsQueryOptions
  );

  const { hmo_companies_data } = await queryClient.ensureQueryData(
    hmoCompaniesQueryOptions
  );
  const { hmo_group_data } = await queryClient.ensureQueryData(
    hmoGroupsQueryOptions
  );
  return {
    appointment_type_data,
    hmo_plans_data,
    clinics_data,
    specialties_data,
    cashpoint_data,
    job_positions_data,
    branch_data,
    service_type_data,
    payment_method_data,
    department_data,
    hmo_companies_data,
    hmo_group_data,
  };
};

export const Route = createFileRoute("/_layout/dashboard/config/")({
  loader: ({ context: { queryClient } }) => loadData(queryClient),
  component: () => {
    return (
      <>
        <Heading mb={"3"}>Configuration</Heading>
        <Tabs.Root defaultValue="insurance" mt={"4"}>
          <Tabs.List>
            <Tabs.Trigger value="settings">Host Settings</Tabs.Trigger>
            <Tabs.Trigger value="services">Services</Tabs.Trigger>
            <Tabs.Trigger value="insurance">Insurance</Tabs.Trigger>
            <Tabs.Trigger value="data">Form Config</Tabs.Trigger>
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
                      <DataList.Label minWidth="88px">
                        Valid till
                      </DataList.Label>
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
                      <DataList.Value>
                        FARFARU, Along Airport Road
                      </DataList.Value>
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
                {config_services_routes.map((p) => (
                  <Card key={p.link_title}>
                    <Box height={"50px"} key={p.route + p.name}>
                      <Link to={p.route} className="w-full h-full ">
                        <Button
                          variant="ghost"
                          style={{ width: "100%", height: "100%" }}
                        >
                          {p.name}
                        </Button>
                      </Link>
                    </Box>
                  </Card>
                ))}
              </div>
            </Tabs.Content>

            <Tabs.Content value="insurance">
              <HMOPlans />
              <div className="flex md:flex-row flex-col gap-4">
                <div className="w-full">
                  <HMOCompanies />
                </div>
                <div className="md:w-[40%]">
                  <HMOGroups />
                </div>
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
              <div className="grid gap-4 md:grid-cols-2 mt-4">
                <Vitals />
              </div>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </>
    );
  },
});
