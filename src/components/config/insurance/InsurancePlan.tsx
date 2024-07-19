import { Flex, Heading } from "@radix-ui/themes";
import { useLoaderData } from "@tanstack/react-router";
import { DataTable } from "../../table/DataTable";
import { insurance_plans } from "../../table/columns/insurance_plan";
import { CreateInsurancePlanForm } from "../../../forms/config/insurance/InsurancePlanForm";

export function InsurancePlan() {
  const plans = useLoaderData({ from: "/_layout/dashboard/config" });

  const { data } = plans;

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Insurance Plans</Heading>
        <CreateInsurancePlanForm />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={insurance_plans}
        data={data.insurance_plan ?? []}
      />
    </div>
  );
}
