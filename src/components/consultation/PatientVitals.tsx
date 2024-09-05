import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getPatientVitalsById } from "../../actions/actions";
import { DataTable } from "../table/DataTable";
import { patient_vitals_column } from "../table/columns/vitals";
import { Json } from "../../lib/supabase.types";
import { Spinner } from "@radix-ui/themes";

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

	const patient_vitals_data =
		useMemo(
			() =>
				data?.patient_vitals_data?.map((v) => ({
					...v,
					profile: `${v.profile?.first_name} ${v.profile?.middle_name ?? ""} ${v.profile?.last_name}`,
				})),
			[data?.patient_vitals_data],
		) ?? [];

	return (
		<div>
			{isPending ? (
				<Spinner />
			) : (
				<DataTable
					columns={patient_vitals_column}
					data={patient_vitals_data}
					filterLabel="search by name..."
					filterer="name"
				/>
			)}
		</div>
	);
}
