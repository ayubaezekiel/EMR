import {
  BarChart2,
  Beaker,
  Bed,
  BedDouble,
  BookA,
  Building2,
  ChefHat,
  Cog,
  DollarSign,
  DropletIcon,
  Pill,
  Pipette,
  Scan,
  Scissors,
  UserCheck2
} from "lucide-react";

export const nursing_routes = [
  {
    route: "/dashboard/appointments/",
    name: "Schedule Appointments",
    link_title: "Manage",
    icon: Building2,
    desc: "Configure Consultation Locations, Manage Specialties, Consultation Documentation Templates",
  },
  {
    route: "/dashboard/admissions/",
    name: "Admit Patient",
    link_title: "Manage",
    icon: BedDouble,
    desc: "Manage Wards, Beds, Routes for Fluid Chart",
  },
  {
    route: "/dashboard/antenatal/",
    name: "Antenatal",
    link_title: "Manage",
    icon: Bed,
    desc: "Manage Antenatal Locations, Packages, and Other Data",
  },
  {
    route: "/dashboard/vaccinations/",
    name: "Vaccinations",
    link_title: "Manage",
    icon: DropletIcon,
    desc: "Configure Vaccines and Stages",
  },

];

export const services_routes = [
  {
    route: "/dashboard/appointments/",
    name: "Appointments",
    link_title: "Manage",
    icon: Building2,
    desc: "Configure Consultation Locations, Manage Specialties, Consultation Documentation Templates",
  },

  {
    route: "/dashboard/nursing/",
    name: "Nursing",
    link_title: "Manage",
    icon: ChefHat,
    desc: "Configure Laboratory Locations, Manage Lab Tests, Report Layouts",
  },
  {
    route: "/dashboard/patients/",
    name: "Patients",
    link_title: "Manage",
    icon: UserCheck2,
    desc: "Configure Laboratory Locations, Manage Lab Tests, Report Layouts",
  },

  {
    route: "/dashboard/lab/",
    name: "Laboratory",
    link_title: "Manage",
    icon: Pipette,
    desc: "Configure Laboratory Locations, Manage Lab Tests, Report Layouts",
  },
  {
    route: "/dashboard/pharmacy/",
    name: "Pharmacy",
    link_title: "Manage",
    icon: Beaker,
    desc: "Configure Pharmacy Locations, Manage Drugs and Batches and Drug Inventory",
  },
  {
    route: "/dashboard/consumables/",
    name: "Consumables",
    link_title: "Manage",
    icon: Pill,
    desc: "Manage Medical Consumables and Stock",
  },
  {
    route: "/dashboard/radiology/",
    name: "Radiology",
    link_title: "Manage",
    icon: Scan,
    desc: "Configure Radiology Locations, Manage Radiological Investigations, Report Layouts",
  },
  {
    route: "/dashboard/admissions/",
    name: "Admissions",
    link_title: "Manage",
    icon: BedDouble,
    desc: "Manage Wards, Beds, Routes for Fluid Chart",
  },
  {
    route: "/dashboard/antenatal/",
    name: "Antenatal",
    link_title: "Manage",
    icon: Bed,
    desc: "Manage Antenatal Locations, Packages, and Other Data",
  },
  {
    route: "/dashboard/procedures/",
    name: "Medical Procedures",
    link_title: "Manage",
    icon: Scissors,
    desc: "Manage Medical Procedures, Locations, Categories",
  },
  {
    route: "/dashboard/vaccinations/",
    name: "Vaccinations",
    link_title: "Manage",
    icon: DropletIcon,
    desc: "Configure Vaccines and Stages",
  },
  {
    route: "/dashboard/reports/",
    name: "Medical Reports",
    link_title: "Manage",
    icon: BookA,
    desc: "Manage Medical Reports",
  },
  {
    route: "/dashboard/billing/",
    name: "Billing",
    link_title: "Manage",
    icon: DollarSign,
    desc: "Manage and approve payments",
  },
  {
    route: "/dashboard/dialysis/",
    name: "Dialysis",
    icon: BarChart2,
    link_title: "Manage",
    desc: "Manage Dialysis Locations, Services, Machines, and Other Data",
  },
  {
    route: "/dashboard/config/",
    name: "Configurations",
    icon: Cog,
    link_title: "Manage",
    desc: "Manage Dialysis Locations, Services, Machines, and Other Data",
  },
];
