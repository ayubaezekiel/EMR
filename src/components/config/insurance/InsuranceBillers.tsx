import { Button, Flex, Heading } from "@radix-ui/themes";
import { useLoaderData } from "@tanstack/react-router";
import { insurance_billers_column } from "../../table/columns/insurance/insurance-billers";
import { DataTable } from "../../table/DataTable";
import { CreateInsuranceBillerForm } from "../../../forms/config/insurance/InsuranceBillersForm";

export default function InsuranceBillers() {
  const { data } = useLoaderData({ from: "/_layout/dashboard/config" });
  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Insurance Billers</Heading>
        <CreateInsuranceBillerForm />
      </Flex>

      <DataTable
        columns={insurance_billers_column}
        data={[]}
        filterLabel="filer by name..."
        filterer="name"
      />
    </div>
  );
}
