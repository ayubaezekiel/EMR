import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getPatientVitalsById } from "../../actions/actions";
import PendingComponent from "../PendingComponent";
import { DataTable } from "../table/DataTable";
import { patient_vitals_column } from "../table/columns/vitals";
import { Json } from "../../lib/supabase.types";

export interface VitalsProps {
	id: string;
	date_created: string;
	patient_id: string;
	vitals: Json;
	profile: string;
}
export function PatientVitals({ patientId }: { patientId: string }) {
	const { data, isPending } = useQuery({
		queryFn: () => getPatientVitalsById(patientId),
		queryKey: ["patientVitalsById"],
	});

	const patient_vitals_data: VitalsProps[] =
		useMemo(
			() =>
				data?.patient_vitals_data?.map((v) => ({
					id: `${v.id}`,
					date_created: `${v.date_created}`,
					patient_id: `${v.patient_id}`,
					vitals: v.vitals,
					profile: `${v.profile?.first_name} ${v.profile?.middle_name ?? ""} ${v.profile?.last_name}`,
				})),
			[data?.patient_vitals_data],
		) ?? [];

	if (isPending) return <PendingComponent />;

	return (
		<div>
			<DataTable
				columns={patient_vitals_column}
				data={patient_vitals_data}
				filterLabel="search by name..."
				filterer="name"
			/>
		</div>
	);
}
