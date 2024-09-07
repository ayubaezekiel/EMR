import { useCashpointsQuery } from "@/actions/queries";
import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { CreateCashpointForm } from "../../forms/config/CashpointForm";
import { DataTable } from "../table/DataTable";
import { cashpoint_column } from "../table/columns/cash_point";

export function Cashpoint() {
	const { data, isPending } = useCashpointsQuery();

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Cashpoints</Heading>
				<CreateCashpointForm />
			</Flex>
			{isPending ? (
				<Spinner />
			) : (
				<DataTable
					filterLabel="filter by name..."
					filterer="name"
					columns={cashpoint_column}
					data={data?.cashpoint_data ?? []}
				/>
			)}
		</div>
	);
}
