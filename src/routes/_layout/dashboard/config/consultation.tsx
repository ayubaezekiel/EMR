import { Diagnosis } from "@/components/config/Diagnosis";
import { createFileRoute } from "@tanstack/react-router";
import { Vitals } from "../../../../components/config/Vitals";

export const Route = createFileRoute("/_layout/dashboard/config/consultation")({
  component: () => (
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <Vitals />
      <Diagnosis />
    </div>
  ),
});
