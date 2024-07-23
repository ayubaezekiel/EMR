import { Flex, Heading } from "@radix-ui/themes";
import { DataTable } from "../../table/DataTable";
import { CreateHMOPlanForm } from "../../../forms/config/insurance/HMOPlanForm";
import {
  hmo_plans_column,
  NewHMOPlanType,
} from "../../table/columns/insurance/HMO_plans";
import { useSuspenseQuery } from "@tanstack/react-query";
import { hmoPlansQueryOptions } from "../../../actions/queries";

export default function HMOPlans() {
  // const { data } = useLoaderData({ from: "/_layout/dashboard/config/" });
  const { data } = useSuspenseQuery(hmoPlansQueryOptions);

  const all_hmo_pans: NewHMOPlanType[] =
    data.hmo_plans_data?.map((h) => ({
      ...h,
      hmo_companies: {
        name: h.hmo_companies?.name,
      },
    })) ?? [];

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>HMO Plans</Heading>
        <CreateHMOPlanForm />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={hmo_plans_column}
        data={all_hmo_pans}
      />
    </div>
  );
}
