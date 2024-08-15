import { Heading } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { Beds } from "../../../../components/config/admissions/Beds";
import { FluidRoutes } from "../../../../components/config/admissions/FluidRoutes";
import { Wards } from "../../../../components/config/admissions/Wards";

export const Route = createFileRoute("/_layout/dashboard/config/admissions")({
	component: () => (
		<div>
			<Heading mb={"3"}>Admission</Heading>
			<div className="grid md:grid-cols-2 gap-2">
				<Wards />
				<Beds />
				<FluidRoutes />
			</div>
		</div>
	),
});
