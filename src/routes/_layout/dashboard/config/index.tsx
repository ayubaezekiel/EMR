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
} from "@radix-ui/themes";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppointmentType } from "../../../../components/config/AppointmentType";
import { Branch } from "../../../../components/config/Branch";
import { Cashpoint } from "../../../../components/config/Cashpoint";
import { Clinics } from "../../../../components/config/Clinics";
import { Departments } from "../../../../components/config/Departments";
import { HMOCompanies } from "../../../../components/config/insurance/HMOCompanies";
import { HMOGroups } from "../../../../components/config/insurance/HMOGroups";
import { HMOPlans } from "../../../../components/config/insurance/HMOPlans";
import { JobPostion } from "../../../../components/config/JobPosition";
import { PaymentMethod } from "../../../../components/config/PaymentMethod";
import { Specialties } from "../../../../components/config/Specialties";
import { config_services_routes } from "../../../../lib/constants";
import { UpdateCenterForm } from "../../../../forms/config/CenterForm";
import { useCenter } from "../../../../lib/hooks";

export const Route = createFileRoute("/_layout/dashboard/config/")({
	component: () => {
		return (
			<>
				<Heading mb={"3"}>Configuration</Heading>
				<Tabs.Root defaultValue="settings" mt={"4"}>
					<Tabs.List>
						<Tabs.Trigger value="settings">Host Settings</Tabs.Trigger>
						<Tabs.Trigger value="services">Services</Tabs.Trigger>
						<Tabs.Trigger value="insurance">Insurance</Tabs.Trigger>
						<Tabs.Trigger value="data">Form Config</Tabs.Trigger>
					</Tabs.List>

					<Center />
				</Tabs.Root>
			</>
		);
	},
});

const Center = () => {
	const { center_data, isCenterPending } = useCenter();
	return (
		<Box mt="6">
			<Tabs.Content value="settings">
				<div className="grid gap-4 md:grid-cols-2">
					<Card>
						<Flex justify={"between"} mb={"4"}>
							<Heading>Center</Heading>
							<UpdateCenterForm {...center_data} />
						</Flex>
						{isCenterPending ? (
							<Spinner />
						) : (
							<DataList.Root>
								<DataList.Item align="center">
									<DataList.Label minWidth="88px">Valid till</DataList.Label>
									<DataList.Value>
										<Badge variant="soft" radius="full">
											{new Date(`${center_data?.vailid_till}`).toDateString()}
										</Badge>
									</DataList.Value>
								</DataList.Item>
								<DataList.Item>
									<DataList.Label minWidth="88px">Hospital name</DataList.Label>
									<DataList.Value>{center_data?.name}</DataList.Value>
								</DataList.Item>
								<DataList.Item>
									<DataList.Label minWidth="88px">State</DataList.Label>
									<DataList.Value>{center_data?.state}</DataList.Value>
								</DataList.Item>
								<DataList.Item>
									<DataList.Label minWidth="88px">LGA</DataList.Label>
									<DataList.Value>{center_data?.lga}</DataList.Value>
								</DataList.Item>
								<DataList.Item>
									<DataList.Label minWidth="88px">Address</DataList.Label>
									<DataList.Value>{center_data?.address}</DataList.Value>
								</DataList.Item>
								<DataList.Item>
									<DataList.Label minWidth="88px">Logo</DataList.Label>
									<DataList.Value>{center_data?.logo_url}</DataList.Value>
								</DataList.Item>
								<DataList.Item>
									<DataList.Label minWidth="88px">Footer</DataList.Label>
									<DataList.Value>{center_data?.footer}</DataList.Value>
								</DataList.Item>
							</DataList.Root>
						)}
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
				<AppointmentType />

				<div className="grid gap-4 md:grid-cols-2 mt-4">
					<PaymentMethod />
					<Cashpoint />
					<JobPostion />
					<Clinics />
					<Specialties />
					<Departments />
				</div>
			</Tabs.Content>
		</Box>
	);
};
