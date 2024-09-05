import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { proceduresQueryOptions } from "../../../actions/queries";
import { CreateProceduresForm } from "../../../forms/config/procedures/ProceduresForm";
import { DataTable } from "../../table/DataTable";
import { procedures_column } from "../../table/columns/procedure/procedure";
import { useMemo } from "react";

export function Procedures() {
	const { data, isPending } = useQuery(proceduresQueryOptions);

	const procedures =
		useMemo(
			() =>
				data?.procedure_data?.map((p) => ({
					...p,
					anaesthesia: p.anaesthesia?.name,
					theatre: p.theatre?.name,
					procedure_category: p.procedure_category?.name,
				})),
			[data?.procedure_data],
		) ?? [];
	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Medical Procedures</Heading>
				<CreateProceduresForm />
			</Flex>
			{isPending ? (
				<Spinner />
			) : (
				<DataTable
					filterLabel="filter by name..."
					filterer="name"
					columns={procedures_column}
					data={procedures}
				/>
			)}
		</div>
	);
}
