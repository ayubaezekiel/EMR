import { AntenatalPackage } from "@/components/config/antenatal/AntenatalPackage";
import { Heading } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/dashboard/config/antenatal")({
	component: () => (
		<div>
			<Heading>Antenatal</Heading>
			<div className="grid mt-4">
				<AntenatalPackage />
			</div>
		</div>
	),
});
