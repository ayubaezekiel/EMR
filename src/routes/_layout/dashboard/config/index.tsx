import { FinancialAnalytics } from "@/components/config/FinancialAnalytics";
import {
	Badge,
	Box,
	Button,
	Callout,
	Card,
	DataList,
	Flex,
	Heading,
	Separator,
	Spinner,
	Tabs,
	Text,
} from "@radix-ui/themes";
import { Link, createFileRoute } from "@tanstack/react-router";
import { AppointmentType } from "../../../../components/config/AppointmentType";
import { Branch } from "../../../../components/config/Branch";
import { Clinics } from "../../../../components/config/Clinics";
import { Departments } from "../../../../components/config/Departments";
import { JobPostion } from "../../../../components/config/JobPosition";
import { Specialties } from "../../../../components/config/Specialties";
import { HMOCompanies } from "../../../../components/config/insurance/HMOCompanies";
import { HMOGroups } from "../../../../components/config/insurance/HMOGroups";
import { HMOPlans } from "../../../../components/config/insurance/HMOPlans";
import { UpdateCenterForm } from "../../../../forms/config/CenterForm";
import { config_services_routes } from "../../../../lib/constants";
import { useCenter, useProfile } from "../../../../lib/hooks";
import { DocumentTypes } from "@/components/config/DocumentTypes";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/_layout/dashboard/config/")({
	component: () => {
		return (
			<>
				<Heading mb={"3"}>Configuration</Heading>
				<Center />
			</>
		);
	},
});

const Center = () => {
	const activeTab = Route.useSearch<{ active: string }>();
	const navigate = Route.useNavigate();
	const { center_data, isCenterPending } = useCenter();

	const { profile_data } = useProfile();

	return profile_data?.is_super_user ||
		Boolean(profile_data?.has_access_to_config) ? (
		<Tabs.Root
			defaultValue={activeTab.active}
			mt={"4"}
			onValueChange={(e) => {
				navigate({
					search: {
						active: e,
					},
				});
			}}
		>
			<Tabs.List>
				<Tabs.Trigger value="settings">Host Settings</Tabs.Trigger>
				<Tabs.Trigger value="services">Services</Tabs.Trigger>
				<Tabs.Trigger value="insurance">Insurance</Tabs.Trigger>
				<Tabs.Trigger value="data">Form Config</Tabs.Trigger>
				<Tabs.Trigger value="finance">Finance</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content mt={"4"} value="settings">
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
					<Branch />
				</div>
			</Tabs.Content>

			<Tabs.Content mt={"4"} value="services">
				<div className="grid gap-4 md:grid-cols-3 mt-4">
					{config_services_routes.map((p) => (
						<Card key={p.route}>
							<Box height={"50px"}>
								<Link to={p.route} className="w-full h-full ">
									<Button
										variant="ghost"
										style={{ width: "100%", height: "100%" }}
									>
										{p.name}
									</Button>
								</Link>
							</Box>
							<Separator size={"4"} mt={"3"} />
							<div className="p-4">
								<Text size={"1"}>{p.desc}</Text>
							</div>
						</Card>
					))}
				</div>
			</Tabs.Content>

			<Tabs.Content mt={"4"} value="insurance">
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

			<Tabs.Content mt={"4"} value="data">
				<div className="grid gap-4 md:grid-cols-2 mt-4">
					<AppointmentType />
					<JobPostion />
					<Clinics />
					<Specialties />
					<Departments />
					<DocumentTypes />
				</div>
			</Tabs.Content>
			<Tabs.Content mt={"4"} value="finance">
				<FinancialAnalytics />
			</Tabs.Content>
		</Tabs.Root>
	) : (
		<Flex>
			<Callout.Root color="red">
				<Callout.Icon>
					<AlertTriangle />
				</Callout.Icon>
				<Callout.Text>Access denied, insufficient permissions</Callout.Text>
			</Callout.Root>
		</Flex>
	);
};
