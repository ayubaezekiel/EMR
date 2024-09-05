import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { anaesthesiaQueryOptions } from "../../../actions/queries";
import { CreateAnaesthesiaForm } from "../../../forms/config/procedures/AnaesthesiaForm";
import { DataTable } from "../../table/DataTable";
import { anaesthesia_column } from "../../table/columns/procedure/anaesthesia";
import { useMemo } from "react";

export function Anaesthesia() {
	const { data, isPending } = useQuery(anaesthesiaQueryOptions);

	const anaesthesia =
		useMemo(
			() =>
				data?.anaesthesia_data?.map((a) => ({
					...a,
					anaesthesia_type: a.anaesthesia_type?.title,
				})),
			[data?.anaesthesia_data],
		) ?? [];

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Anaesthesia</Heading>
				<CreateAnaesthesiaForm />
			</Flex>
			{isPending ? (
				<Spinner />
			) : (
				<DataTable
					filterLabel="filter by name..."
					filterer="name"
					columns={anaesthesia_column}
					data={anaesthesia}
				/>
			)}
		</div>
	);
}
