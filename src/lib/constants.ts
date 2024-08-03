import {
  BarChart2,
  Beaker,
  Bed,
  BedDouble,
  BookA,
  Building2,
  Cog,
  DollarSign,
  DropletIcon,
  Pill,
  Pipette,
  Scan,
  Scissors,
  User2,
  UserCheck2
} from "lucide-react";



export const services_routes = [
  {
    route: "/dashboard/appointments/",
    name: "Appointments",
    link_title: "Manage",
    icon: Building2,
  },

  {
    route: "/dashboard/patients/",
    name: "Patients",
    link_title: "Manage",
    icon: UserCheck2,
  },

  {
    route: "/dashboard/lab/",
    name: "Laboratory",
    link_title: "Manage",
    icon: Pipette,
  },
  {
    route: "/dashboard/pharmacy/",
    name: "Pharmacy",
    link_title: "Manage",
    icon: Beaker,
  },
  {
    route: "/dashboard/consumables/",
    name: "Consumables",
    link_title: "Manage",
    icon: Pill,
  },
  {
    route: "/dashboard/radiology/",
    name: "Radiology",
    link_title: "Manage",
    icon: Scan,
  },
  {
    route: "/dashboard/admissions/",
    name: "Admissions",
    link_title: "Manage",
    icon: BedDouble,
  },
  {
    route: "/dashboard/antenatal/",
    name: "Antenatal",
    link_title: "Manage",
    icon: Bed,
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
    route: "/dashboard/billing/",
    name: "Billing",
    link_title: "Manage",
    icon: DollarSign,
  },
  {
    route: "/dashboard/dialysis/",
    name: "Dialysis",
    icon: BarChart2,
    link_title: "Manage",
  },
  {
    route: "/dashboard/users/",
    name: "Users",
    link_title: "Manage",
    icon: User2,
  },
  {
    route: "/dashboard/config/",
    name: "Configurations",
    icon: Cog,
    link_title: "Manage",
  },
];

export const config_services_routes = [
  {
    route: "/dashboard/config/consultation/",
    name: "Consultations",
    link_title: "Manage",
    icon: Building2,
  },

  {
    route: "/dashboard/config/patients/",
    name: "Patients",
    link_title: "Manage",
    icon: UserCheck2,
  },

  {
    route: "/dashboard/config/lab/",
    name: "Laboratory",
    link_title: "Manage",
    icon: Pipette,
  },
  {
    route: "/dashboard/config/pharmacy/",
    name: "Pharmacy",
    link_title: "Manage",
    icon: Beaker,
  },
  {
    route: "/dashboard/config/consumables/",
    name: "Consumables",
    link_title: "Manage",
    icon: Pill,
  },
  {
    route: "/dashboard/config/radiology/",
    name: "Radiology",
    link_title: "Manage",
    icon: Scan,
  },
  {
    route: "/dashboard/config/admissions/",
    name: "Admissions",
    link_title: "Manage",
    icon: BedDouble,
  },
  {
    route: "/dashboard/config/antenatal/",
    name: "Antenatal",
    link_title: "Manage",
    icon: Bed,
  },
  {
    route: "/dashboard/config/procedures/",
    name: "Medical Procedures",
    link_title: "Manage",
    icon: Scissors,
  },
  {
    route: "/dashboard/config/vaccinations/",
    name: "Vaccinations",
    link_title: "Manage",
    icon: DropletIcon,
  },
  {
    route: "/dashboard/config/reports/",
    name: "Medical Reports",
    link_title: "Manage",
    icon: BookA,
  },
  {
    route: "/dashboard/config/billing/",
    name: "Billing",
    link_title: "Manage",
    icon: DollarSign,
  },
  {
    route: "/dashboard/config/dialysis/",
    name: "Dialysis",
    icon: BarChart2,
    link_title: "Manage",
  },

];
