import { BillingCards } from "@/components/billing/BillingCard";
import { Heading } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/dashboard/billing")({
  component: () => (
    <div>
      <Heading>Billing</Heading>
      <Billing />
    </div>
  ),
});

const Billing = () => {
  return (
    <div>
      <BillingCards />
    </div>
  );
};
