import { createFileRoute } from "@tanstack/react-router";
import { Heading } from "@radix-ui/themes";
import { DrugOrGeneric } from "../../../../components/config/DrugOrGeneric";
import { DrugOrGenericBrand } from "../../../../components/config/Brand";

export const Route = createFileRoute("/_layout/dashboard/config/pharmacy")({
  component: () => (
    <div>
      <Heading mb={"3"}>Pharmacy</Heading>
      <DrugOrGeneric />
      <DrugOrGenericBrand />
    </div>
  ),
});
