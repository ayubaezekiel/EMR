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

	// {
	//   route: "/dashboard/dialysis/",
	//   name: "Dialysis",
	//   icon: BarChart2,
	//   link_title: "Manage",
	// },
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
		icon: BedDouble,
	},
	{
		route: "/dashboard/config/billing/",
		name: "Billing",
		link_title: "Manage",
		desc: "Check Billing Analytics and Payment History",
		icon: DollarSign,
	},
	{
		route: "/dashboard/config/consultation/",
		name: "Consultations",
		link_title: "Manage",
		desc: "Create vitals and Consultation Templates",
		icon: Building2,
	},
	{
		route: "/dashboard/config/lab/",
		name: "Laboratory",
		link_title: "Manage",
		desc: "Manange Labs, Create Lab Test, Categories, and Test Parameters ",
		icon: Pipette,
	},
	{
		route: "/dashboard/config/procedures/",
		name: "Medical Procedures",
		link_title: "Manage",
		desc: "Manange Procedures, Create Medical Procedures, Categories, Anaesthesia Type and Theatre ",
		icon: Scissors,
	},
	{
		route: "/dashboard/config/reports/",
		name: "Medical Reports",
		link_title: "Manage",
		desc: "Check Reports History",
		icon: BookA,
	},
	{
		route: "/dashboard/config/radiology/",
		name: "Radiology",
		link_title: "Manage",
		desc: "Manange Radiology, Create Imaging, Imaging Categories, Report Templates",
		icon: Scan,
	},
	{
		route: "/dashboard/config/store/",
		name: "Store",
		link_title: "Manage",
		desc: "Manange Pharmacy & Consumables, Manage Drug Baches & Inventory ",
		icon: Scan,
	},

	// {
	//   route: "/dashboard/config/antenatal/",
	//   name: "Antenatal",
	//   link_title: "Manage",
	//   icon: Bed,
	// },

	// {
	//   route: "/dashboard/config/vaccinations/",
	//   name: "Vaccinations",
	//   link_title: "Manage",
	//   icon: DropletIcon,
	// },

	// {
	//   route: "/dashboard/config/dialysis/",
	//   name: "Dialysis",
	//   icon: BarChart2,
	//   link_title: "Manage",
	// },
];
