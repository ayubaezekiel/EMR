import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import {
	appointmentsTypesQueryOptions,
	vitalsQueryOptions,
} from "../../actions/queries";
import { CreateVitalsForm } from "../../forms/config/Vitals";
import PendingComponent from "../PendingComponent";
import { DataTable } from "../table/DataTable";
import { vitals_column } from "../table/columns/vitals";
import { CreateAppointmentTypeForm } from "../../forms/config/AppointmentTypeForm";
import { appointment_type_column } from "../table/columns/appointment_type";

export function Vitals() {
	const { data, isPending } = useQuery(vitalsQueryOptions);
	if (isPending) return <PendingComponent />;

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Vitals</Heading>
				<CreateVitalsForm />
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={vitals_column}
				data={data?.vitals_data ?? []}
			/>
		</div>
	);
}

export function NursingVitatls() {
	const { data, isPending } = useQuery(appointmentsTypesQueryOptions);
	if (isPending) return <PendingComponent />;

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Appointment Types</Heading>
				<CreateAppointmentTypeForm />
			</Flex>

			<DataTable
				filterLabel="filter by name..."
				filterer="name"
				columns={appointment_type_column}
				data={data?.appointment_type_data ?? []}
			/>
		</div>
	);
}
