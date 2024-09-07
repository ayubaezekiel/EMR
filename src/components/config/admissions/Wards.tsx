import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useWardsQuery } from "../../../actions/queries";
import { CreateWardForm } from "../../../forms/config/admission/WardForm";
import { DataTable } from "../../table/DataTable";
import { wards_column } from "../../table/columns/admission/wards";

export function Wards() {
	const { data, isPending } = useWardsQuery();

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Wards</Heading>
				<CreateWardForm />
			</Flex>
			{isPending ? (
				<Spinner />
			) : (
				<DataTable
					filterLabel="filter by name..."
					filterer="name"
					columns={wards_column}
					data={data?.wards_data ?? []}
				/>
			)}
		</div>
	);
}
