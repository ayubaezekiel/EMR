import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { hmoPlansQueryOptions } from "../../../actions/queries";
import { CreateHMOPlanForm } from "../../../forms/config/insurance/HMOPlanForm";
import {
	hmo_plans_column,
	NewHMOPlanType,
} from "../../table/columns/insurance/HMO_plans";
import { DataTable } from "../../table/DataTable";
import PendingComponent from "../../PendingComponent";

export function HMOPlans() {
	const { data, isPending } = useQuery(hmoPlansQueryOptions);

	if (isPending) return <PendingComponent />;

	const all_hmo_pans: NewHMOPlanType[] =
		data?.hmo_plans_data?.map((h) => ({
			...h,
			hmo_companies: {
				name: h.hmo_companies?.name,
			},
		})) ?? [];

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>HMO Plans</Heading>
				<CreateHMOPlanForm />
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={hmo_plans_column}
				data={all_hmo_pans}
			/>
		</div>
	);
}
