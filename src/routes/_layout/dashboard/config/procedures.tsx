import { Heading } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { Anaesthesia } from "../../../../components/config/procedures/Anaesthesia";
import { AnaesthesiaType } from "../../../../components/config/procedures/AnaesthesiaType";
import { Procedures } from "../../../../components/config/procedures/Procedures";
import { ProceduresCategories } from "../../../../components/config/procedures/ProceduresCategories";
import { Theatre } from "../../../../components/config/procedures/Theatre";

export const Route = createFileRoute("/_layout/dashboard/config/procedures")({
	component: () => (
		<div>
			<Heading mb={"3"}>Procedures</Heading>
			<Procedures />
			<div className="grid md:grid-cols-2 gap-2">
				<ProceduresCategories />
				<AnaesthesiaType />
				<Anaesthesia />
				<Theatre />
			</div>
		</div>
	),
});
