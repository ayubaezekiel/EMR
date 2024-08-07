import { createFileRoute } from "@tanstack/react-router";
import { LabTestCategories } from "../../../../components/config/lab/LabTestCategories";
import { LabTestTemplate } from "../../../../components/config/lab/LabTestTemplate";
import { LabTestParams } from "../../../../components/config/lab/LabTestParams";
import { LabTests } from "../../../../components/config/lab/LabTest";

export const Route = createFileRoute("/_layout/dashboard/config/lab")({
  component: () => (
    <div className="flex flex-col gap-10">
      <LabTests />

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <LabTestCategories />
        <LabTestTemplate />
        <LabTestParams />
      </div>
    </div>
  ),
});
