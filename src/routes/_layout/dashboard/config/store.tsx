import { createFileRoute } from "@tanstack/react-router";
import { Heading } from "@radix-ui/themes";
import { DrugOrGeneric } from "../../../../components/config/DrugOrGeneric";
import { DrugOrGenericBrand } from "../../../../components/config/Brand";
import { QuantityType } from "../../../../components/config/QuantityType";

export const Route = createFileRoute("/_layout/dashboard/config/store")({
	component: () => (
		<div>
			<Heading mb={"3"}>Pharmacy and Consumables Store</Heading>
			<DrugOrGeneric />
			<div className="grid md:grid-cols-2 gap-2">
				<DrugOrGenericBrand />
				<QuantityType />
			</div>
		</div>
	),
});
