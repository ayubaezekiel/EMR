import {
  Beaker,
  Bed,
  BedDouble,
  BookCheck,
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
    icon: BedDouble,
  },
  {
    route: "/dashboard/appointments/",
    name: "Appointments",
    icon: Building2,
  },
  {
    route: "/dashboard/antenatal/",
    name: "Antenatal",
    icon: Bed,
  },
  {
    route: "/dashboard/billing/",
    name: "Billing",
    icon: DollarSign,
  },
  {
    route: "/dashboard/consultations",
    name: "Consultation Requests",
    icon: Bed,
  },
  {
    route: "/dashboard/consumables/",
    name: "Consumables",
    icon: Pill,
  },
  {
    route: "/dashboard/user_reports/",
    name: "Document Reports",
    icon: BookCheck,
  },
  {
    route: "/dashboard/lab/",
    name: "Laboratory",
    icon: Pipette,
  },

  {
    route: "/dashboard/patients/",
    name: "Patients",
    icon: UserCheck2,
  },

  {
    route: "/dashboard/pharmacy/",
    name: "Pharmacy",
    icon: Beaker,
  },
  {
    route: "/dashboard/procedures/",
    name: "Medical Procedures",
    icon: Scissors,
  },
  // {
  // 	route: "/dashboard/reports/",
  // 	name: "Medical Reports",
  // 	icon: BookA,
  // },

  {
    route: "/dashboard/radiology/",
    name: "Radiology",
    icon: Scan,
  },
  {
    route: "/dashboard/users/",
    name: "Users",
    icon: User2,
  },
];

export const config_services_routes = [
  {
    route: "/dashboard/config/admissions/",
    name: "Admissions",
    desc: "Manage Admissions, Create Hospital's Wards, Beds and Fluid Routes",
  },
  {
    route: "/dashboard/config/antenatal/",
    name: "Antenatal",
    desc: "Manage Antenatal Packages",
  },
  {
    route: "/dashboard/config/billing/",
    name: "Billing",
    desc: "Check Billing Analytics and Payment History",
  },
  {
    route: "/dashboard/config/consultation/",
    name: "Consultations",
    desc: "Create vitals and Consultation Templates",
  },
  {
    route: "/dashboard/config/lab/",
    name: "Laboratory",
    desc: "Manange Labs, Create Lab Test, Categories, and Test Parameters ",
  },
  {
    route: "/dashboard/config/procedures/",
    name: "Medical Procedures",
    desc: "Manange Procedures, Create Medical Procedures, Categories, Anaesthesia Type and Theatre ",
  },
  {
    route: "/dashboard/config/reports/",
    name: "Medical Reports",
    desc: "Check Reports History",
  },
  {
    route: "/dashboard/config/radiology/",
    name: "Radiology",
    desc: "Manange Radiology, Create Imaging, Imaging Categories, Report Templates",
  },
  {
    route: "/dashboard/config/store/",
    name: "Store",
    desc: "Manange Pharmacy & Consumables, Manage Drug Baches & Inventory ",
  },
];
