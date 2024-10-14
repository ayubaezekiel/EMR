import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useMemo } from "react";
import { useHmoPlansQuery } from "../../../actions/queries";
import { CreateHMOPlanForm } from "../../../forms/config/insurance/HMOPlanForm";
import { DataTable } from "../../table/DataTable";
import { hmo_plans_column } from "../../table/columns/insurance/HMO_plans";

export function HMOPlans() {
  const { data, isPending } = useHmoPlansQuery();

  const all_hmo_pans =
    useMemo(
      () =>
        data?.hmo_plans_data?.map((h) => ({
          ...h,
          hmo_companies: h.hmo_companies?.name,
        })),
      [data?.hmo_plans_data]
    ) ?? [];

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>HMO Plans</Heading>
        <CreateHMOPlanForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable columns={hmo_plans_column} data={all_hmo_pans} />
      )}
    </div>
  );
}
