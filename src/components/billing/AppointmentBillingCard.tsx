import { useAppointmentsQuery } from "@/actions/queries";
import {
	Badge,
	Callout,
	Card,
	Flex,
	Spinner,
	Strong,
	Text,
} from "@radix-ui/themes";
import { FileQuestion } from "lucide-react";
import { useMemo } from "react";
import { UpdateAppointmentForm } from "../../forms/AppointmentForm";
import { PatientCardHeader } from "../PatientCardHeader";
import { ApprovePayments } from "../Payments";

export function AppointmentBillingCards({
	type,
	typeName,
}: {
	type: string;
	typeName: string;
}) {
	const { data: appointments, isPending: isAppointmentPending } =
		useAppointmentsQuery();
	const appointment_data_pending = useMemo(
		() =>
			appointments?.appointment_data?.filter(
				(a) => a.appointment_types_id === type && a.is_approved === false,
			),
		[appointments?.appointment_data, type],
	);

	return (
		<div className="w-full">
			{appointment_data_pending?.length === 0 ? (
				<Flex justify={"center"}>
					<Callout.Root mt={"9"}>
						<Callout.Icon>
							<FileQuestion />
						</Callout.Icon>
						<Callout.Text ml={"1"}>No result found</Callout.Text>
					</Callout.Root>
				</Flex>
			) : isAppointmentPending ? (
				<Spinner />
			) : (
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
					{appointment_data_pending?.map((a) => (
						<Card key={a.id}>
							<Flex justify={"between"}>
								<PatientCardHeader
									createdAt={a.created_at!}
									firstName={a.patients?.first_name as string}
									lastName={a.patients?.last_name as string}
									patientId={a.patients_id}
									middleName={a.patients?.middle_name as string}
								/>
								<UpdateAppointmentForm {...a} />
							</Flex>
							<Flex direction={"column"} mt={"4"}>
								<Flex gap={"2"} mb={"4"} direction={"column"} justify={"end"}>
									{a.is_all_day ? (
										<div>
											<Badge>
												All day{" "}
												<span className="p-1 animate-pulse bg-[var(--accent-9)] rounded-full" />
											</Badge>
										</div>
									) : (
										<div className="flex flex-col gap-2">
											<div>
												<Badge radius="full">
													From:{" "}
													{a.duration
														? `${new Date(`${a.duration}`.slice(2, 20)).toLocaleString()}`
														: "No date"}
												</Badge>
											</div>
											<div>
												<Badge radius="full" color="red">
													To:{" "}
													{a.duration
														? `${new Date(`${a.duration}`.slice(24, 43)).toLocaleString()}`
														: "No date"}
												</Badge>
											</div>
										</div>
									)}
								</Flex>
								<div className="flex justify-between items-center">
									<div className="flex flex-col">
										<Strong>{a.appointment_types?.name.toUpperCase()}</Strong>

										<Text>{a.clinics?.name}</Text>
									</div>
									<div className="flex flex-col">
										<div>
											<Text size={"1"}>Default price: </Text>
											<Badge>
												N
												{new Intl.NumberFormat().format(
													Number(a.appointment_types?.default_price),
												)}
											</Badge>
										</div>
										<div>
											<Text size={"1"}>Follow up price: </Text>
											<Badge>
												N
												{new Intl.NumberFormat().format(
													Number(a.appointment_types?.follow_up_price),
												)}
											</Badge>
										</div>
									</div>
								</div>
							</Flex>
							<Flex justify={"between"} align={"center"} mt={"4"}>
								<div>
									Follow Up? :{" "}
									{a.follow_up ? (
										<Badge>Yes</Badge>
									) : (
										<Badge color="red">No</Badge>
									)}
								</div>
								<ApprovePayments
									isApproved={a.is_approved!}
									appointmentId={a.id}
									is_appointment
									is_request={false}
									services={[
										{
											name: typeName,
											amount: a.follow_up
												? `${a.appointment_types?.follow_up_price}`
												: `${a.appointment_types?.default_price}`,
										},
									]}
									patientId={a.patients_id}
									amount={
										a.follow_up
											? `${a.appointment_types?.follow_up_price}`
											: `${a.appointment_types?.default_price}`
									}
								/>
							</Flex>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
