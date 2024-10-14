import { createFileRoute } from "@tanstack/react-router";
import { Imaging } from "../../../../components/config/radiology/Imaging";
import { ImagingCategories } from "../../../../components/config/radiology/ImagingCategories";

export const Route = createFileRoute("/_layout/dashboard/config/radiology")({
  component: () => (
    <div className="flex flex-col gap-10">
      <Imaging />
      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <ImagingCategories />
      </div>
    </div>
  ),
});
