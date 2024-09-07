import {
	Beaker,
	Bed,
	BedDouble,
	BookA,
	Building2,
	DollarSign,
	Pill,
	Pipette,
	Scan,
	Scissors,
	User2,
	UserCheck2,
} from "lucide-react";

export const services_routes = [
	{
		route: "/dashboard/admissions/",
		name: "Admissions",
		link_title: "Manage",
		icon: BedDouble,
	},
	{
		route: "/dashboard/appointments/",
		name: "Appointments",
		link_title: "Manage",
		icon: Building2,
	},
	{
		route: "/dashboard/antenatal/",
		name: "Antenatal",
		link_title: "Manage",
		icon: Bed,
	},
	{
		route: "/dashboard/billing/",
		name: "Billing",
		link_title: "Manage",
		icon: DollarSign,
	},
	{
		route: "/dashboard/consultations",
		name: "Consultation Requests",
		link_title: "Manage",
		icon: Bed,
	},
	{
		route: "/dashboard/consumables/",
		name: "Consumables",
		link_title: "Manage",
		icon: Pill,
	},
	{
		route: "/dashboard/lab/",
		name: "Laboratory",
		link_title: "Manage",
		icon: Pipette,
	},

	{
		route: "/dashboard/patients/",
		name: "Patients",
		link_title: "Manage",
		icon: UserCheck2,
	},

	{
		route: "/dashboard/pharmacy/",
		name: "Pharmacy",
		link_title: "Manage",
		icon: Beaker,
	},
	{
		route: "/dashboard/procedures/",
		name: "Medical Procedures",
		link_title: "Manage",
		icon: Scissors,
	},
	{
		route: "/dashboard/reports/",
		name: "Medical Reports",
		link_title: "Manage",
		icon: BookA,
	},

	{
		route: "/dashboard/radiology/",
		name: "Radiology",
		link_title: "Manage",
		icon: Scan,
	},
	{
		route: "/dashboard/users/",
		name: "Users",
		link_title: "Manage",
		icon: User2,
	},
];

export const config_services_routes = [
	{
		route: "/dashboard/config/admissions/",
		name: "Admissions",
		link_title: "Manage",
		desc: "Manage Admissions, Create Hospital's Wards, Beds and Fluid Routes",
	},
	{
		route: "/dashboard/config/antenatal/",
		name: "Antenatal",
		link_title: "Manage",
		desc: "Manage Antenatal Packages",
	},
	{
		route: "/dashboard/config/billing/",
		name: "Billing",
		link_title: "Manage",
		desc: "Check Billing Analytics and Payment History",
	},
	{
		route: "/dashboard/config/consultation/",
		name: "Consultations",
		link_title: "Manage",
		desc: "Create vitals and Consultation Templates",
	},
	{
		route: "/dashboard/config/lab/",
		name: "Laboratory",
		link_title: "Manage",
		desc: "Manange Labs, Create Lab Test, Categories, and Test Parameters ",
	},
	{
		route: "/dashboard/config/procedures/",
		name: "Medical Procedures",
		link_title: "Manage",
		desc: "Manange Procedures, Create Medical Procedures, Categories, Anaesthesia Type and Theatre ",
	},
	{
		route: "/dashboard/config/reports/",
		name: "Medical Reports",
		link_title: "Manage",
		desc: "Check Reports History",
	},
	{
		route: "/dashboard/config/radiology/",
		name: "Radiology",
		link_title: "Manage",
		desc: "Manange Radiology, Create Imaging, Imaging Categories, Report Templates",
	},
	{
		route: "/dashboard/config/store/",
		name: "Store",
		link_title: "Manage",
		desc: "Manange Pharmacy & Consumables, Manage Drug Baches & Inventory ",
	},
];
