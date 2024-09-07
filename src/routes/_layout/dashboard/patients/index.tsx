import { Heading, Spinner } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { usePatientsQuery } from "../../../../actions/queries";
import { DataTable } from "../../../../components/table/DataTable";
import { patients } from "../../../../components/table/columns/patients";

export const Route = createFileRoute("/_layout/dashboard/patients/")({
	component: () => (
		<>
			<Heading mb={"3"}>Patients</Heading>
			<PatientTable />
		</>
	),
});

const PatientTable = () => {
	const { data, isPending } = usePatientsQuery();

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
