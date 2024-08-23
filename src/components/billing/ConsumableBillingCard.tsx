import { Badge, Callout, Card, Flex, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { FileQuestion } from "lucide-react";
import { useMemo } from "react";
import { requestQueryOptions } from "../../actions/queries";
import { PatientCardHeader } from "../PatientCardHeader";
import { ApprovePayments } from "../Payments";
import PendingComponent from "../PendingComponent";
import { UpdateConsumableRequestForm } from "../../forms/requests/ConsumableRequestForm";

export function ConsumableBillingCard() {
	const { data: request_data, isPending: isLabPending } =
		useQuery(requestQueryOptions);

	const consumable_data_filtered = useMemo(
		() =>
			request_data?.request_data?.filter(
				(a) =>
					a.is_waiting === false && a.is_completed === false && a.is_consumable,
			),
		[request_data?.request_data],
	);

	if (isLabPending) return <PendingComponent />;

	return (
		<div className="w-full">
			{consumable_data_filtered?.length === 0 ? (
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
					{consumable_data_filtered?.map((a) => (
						<Card key={a.id}>
							<Flex justify={"between"}>
								<PatientCardHeader
									createdAt={a.created_at}
									firstName={a.patients?.first_name as string}
									lastName={a.patients?.last_name as string}
									patientId={a.patients_id}
									middleName={a.patients?.middle_name as string}
								/>
								<UpdateConsumableRequestForm />
							</Flex>
							<Flex direction={"column"} mt={"4"} height={"100px"}>
								<div className="flex flex-wrap gap-2 mt-4">
									{JSON.parse(JSON.stringify(a.services)).map(
										(d: {
											note: string;
											consumable: { name: string; amount: string };
										}) => (
											<Badge key={d.note}>
												{d.consumable.name}
												<Text color="red">N{d.consumable.amount}</Text>
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
											consumable: { name: string; amount: string };
										}) => ({
											name: d.consumable.name,
											amount: d.consumable.amount,
										}),
									)}
									amount={JSON.parse(JSON.stringify(a.services))
										.map(
											(v: { consumable: { name: string; amount: string } }) =>
												v.consumable.amount,
										)
										.reduce(
											(prev: string, curr: string) =>
												Number(prev) + Number(curr),
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
