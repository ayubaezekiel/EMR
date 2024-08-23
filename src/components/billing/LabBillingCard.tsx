import { Badge, Card, Flex, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { requestQueryOptions } from "../../actions/queries";
import { UpdateLabRequestForm } from "../../forms/requests/LabRequestForm";
import { PatientCardHeader } from "../PatientCardHeader";
import { ApprovePayments } from "../Payments";
import PendingComponent from "../PendingComponent";

export function LabBillingCard() {
	const { data: request_data, isPending: isLabPending } =
		useQuery(requestQueryOptions);

	const lab_data_filtered = useMemo(
		() =>
			request_data?.request_data?.filter(
				(a) => a.is_waiting === false && a.is_completed === false && a.is_lab,
			),
		[request_data?.request_data],
	);

	if (isLabPending) return <PendingComponent />;

	return (
		<div className="w-full">
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
				{lab_data_filtered?.map((a) => (
					<Card key={a.id}>
						<Flex justify={"between"}>
							<PatientCardHeader
								createdAt={a.created_at}
								firstName={a.patients?.first_name as string}
								lastName={a.patients?.last_name as string}
								patientId={a.patients_id}
								middleName={a.patients?.middle_name as string}
							/>
							<UpdateLabRequestForm {...a} />
						</Flex>
						<Flex direction={"column"} mt={"4"} height={"100px"}>
							<div className="flex flex-wrap gap-2 mt-4">
								{JSON.parse(JSON.stringify(a.services)).map(
									(d: {
										note: string;
										service: { name: string; amount: string };
									}) => (
										<Badge key={d.note}>
											{d.service.name} -{" "}
											<Text color="red">N{d.service.amount}</Text>
										</Badge>
									),
								)}
							</div>
						</Flex>
						<Flex justify={"end"} align={"center"} mt={"4"}>
							<ApprovePayments
								isApproved={Boolean(a.is_approved)}
								is_request
								is_appointment={false}
								requestId={a.id}
								services={JSON.parse(JSON.stringify(a.services)).map(
									(d: {
										note: string;
										service: { name: string; amount: string };
									}) => ({
										name: d.service.name,
										amount: d.service.amount,
									}),
								)}
								amount={JSON.parse(JSON.stringify(a.services))
									.map((d: { service: { amount: string } }) => d.service.amount)
									.reduce(
										(prev: string, curr: string) => Number(prev) + Number(curr),
									)}
								patientId={a.patients_id}
							/>
						</Flex>
					</Card>
				))}
			</div>
		</div>
	);
}
