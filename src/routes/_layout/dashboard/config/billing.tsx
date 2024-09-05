import { createFileRoute } from "@tanstack/react-router";
import { PaymentMethod } from "../../../../components/config/PaymentMethod";
import { Cashpoint } from "../../../../components/config/Cashpoint";
import { Heading } from "@radix-ui/themes";

export const Route = createFileRoute("/_layout/dashboard/config/billing")({
	component: () => (
		<div>
			<Heading>Billing</Heading>
			<div className="grid gap-4 md:grid-cols-2 mt-4">
				<PaymentMethod />
				<Cashpoint />
			</div>
		</div>
	),
});
