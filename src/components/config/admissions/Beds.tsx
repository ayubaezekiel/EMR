import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { bedsQueryOptions } from "../../../actions/queries";
import { CreateBedForm } from "../../../forms/config/admission/BedForm";
import { DataTable } from "../../table/DataTable";
import { BedProps, beds_column } from "../../table/columns/admission/beds";
import { useMemo } from "react";

export function Beds() {
	const { data, isPending } = useQuery(bedsQueryOptions);

	const bed_datas: BedProps[] =
		useMemo(
			() =>
				data?.beds_data?.map((b) => ({
					default_price: b.default_price,
					id: b.id,
					is_available: b.is_available,
					name: b.name,
					ward_id: b.ward_id,
					ward: `${b.wards?.name}`,
				})),
			[data?.beds_data],
		) ?? [];

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Beds</Heading>
				<CreateBedForm />
			</Flex>
			{isPending ? (
				<Spinner />
			) : (
				<DataTable
					filterLabel="filter by name..."
					filterer="name"
					columns={beds_column}
					data={bed_datas}
				/>
			)}
		</div>
	);
}
