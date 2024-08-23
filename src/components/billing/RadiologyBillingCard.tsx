import { Badge, Callout, Card, Flex, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { FileQuestion } from "lucide-react";
import { useMemo } from "react";
import { requestQueryOptions } from "../../actions/queries";
import { PatientCardHeader } from "../PatientCardHeader";
import { ApprovePayments } from "../Payments";
import PendingComponent from "../PendingComponent";
import { UpdateRadiologyRequestForm } from "../../forms/requests/RadioloyRequestForm";

export function RadiologyBillingCard() {
	const { data: request_data, isPending: isRadiologyPending } =
		useQuery(requestQueryOptions);

	const radiology_data_filtered = useMemo(
		() =>
			request_data?.request_data?.filter(
				(a) =>
					a.is_waiting === false && a.is_completed === false && a.is_radiology,
			),
		[request_data?.request_data],
	);

	if (isRadiologyPending) return <PendingComponent />;

	return (
		<div className="w-full">
			{radiology_data_filtered?.length === 0 ? (
				<Flex justify={"center"}>
					<Callout.Root mt={"9"}>
						<Callout.Icon>
							<FileQuestion />
						</Callout.Icon>
						<Callout.Text ml={"1"}>No result found</Callout.Text>
					</Callout.Root>
				</Flex>
			) : (
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
					{radiology_data_filtered?.map((a) => (
						<Card key={a.id}>
							<Flex justify={"between"}>
								<PatientCardHeader
									createdAt={a.created_at}
									firstName={a.patients?.first_name as string}
									lastName={a.patients?.last_name as string}
									patientId={a.patients_id}
									middleName={a.patients?.middle_name as string}
								/>
								<UpdateRadiologyRequestForm {...a} />
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
												<Text color="red">
													N
													{new Intl.NumberFormat().format(
														Number(d.service.amount),
													)}
												</Text>
											</Badge>
										),
									)}
								</div>
							</Flex>
							<Flex justify={"end"} align={"center"} mt={"4"}>
								<ApprovePayments
									isApproved={a.is_approved!}
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
									amount={JSON.parse(JSON.stringify(a.services)).reduce(
										(
											prev: { service: { name: string; amount: string } },
											curr: { service: { name: string; amount: string } },
										) =>
											Number(prev.service.amount) + Number(curr.service.amount),
									)}
									patientId={a.patients_id}
								/>
							</Flex>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
