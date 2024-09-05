import { Heading, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { patientsQueryOptions } from "../../../../actions/queries";
import { DataTable } from "../../../../components/table/DataTable";
import { patients } from "../../../../components/table/columns/patients";
import { useMemo } from "react";

export const Route = createFileRoute("/_layout/dashboard/patients/")({
	component: () => (
		<>
			<Heading mb={"3"}>Patients</Heading>
			<PatientTable />
		</>
	),
});

const PatientTable = () => {
	const { data, isPending } = useQuery(patientsQueryOptions);

	const patient_data =
		useMemo(
			() =>
				data?.patient_data?.map((p) => ({
					...p,
					hmo_plans: p.hmo_plans?.name,
				})),
			[data?.patient_data],
		) ?? [];

	return (
		<div>
			{isPending ? (
				<Spinner />
			) : (
				<DataTable
					filterLabel="filter names...."
					filterer="patients"
					columns={patients}
					data={patient_data}
				/>
			)}
		</div>
	);
};
