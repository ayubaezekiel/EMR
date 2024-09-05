import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import {
	appointmentsTypesQueryOptions,
	vitalsQueryOptions,
} from "@/actions/queries";
import { CreateAppointmentTypeForm } from "../../forms/config/AppointmentTypeForm";
import { CreateVitalsForm } from "../../forms/config/Vitals";
import { DataTable } from "../table/DataTable";
import { appointment_type_column } from "../table/columns/appointment_type";
import { vitals_column } from "../table/columns/vitals";

export function Vitals() {
	const { data, isPending } = useQuery(vitalsQueryOptions);

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Vitals</Heading>
				<CreateVitalsForm />
			</Flex>
			{isPending ? (
				<Spinner />
			) : (
				<DataTable
					filterLabel="filter by name..."
					filterer="name"
					columns={vitals_column}
					data={data?.vitals_data ?? []}
				/>
			)}
		</div>
	);
}

export function NursingVitatls() {
	const { data, isPending } = useQuery(appointmentsTypesQueryOptions);

	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Appointment Types</Heading>
				<CreateAppointmentTypeForm />
			</Flex>
			{isPending ? (
				<Spinner />
			) : (
				<DataTable
					filterLabel="filter by name..."
					filterer="name"
					columns={appointment_type_column}
					data={data?.appointment_type_data ?? []}
				/>
			)}
		</div>
	);
}
