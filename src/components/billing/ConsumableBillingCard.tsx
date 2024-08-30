import { Badge, Callout, Card, Flex, Spinner, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { FileQuestion } from "lucide-react";
import { useMemo } from "react";
import { requestQueryOptions } from "../../actions/queries";
import { UpdateConsumableRequestForm } from "../../forms/requests/ConsumableRequestForm";
import { PatientCardHeader } from "../PatientCardHeader";
import { ApprovePayments } from "../Payments";

export function ConsumableBillingCard() {
	const { data: request_data, isPending: isConsPending } =
		useQuery(requestQueryOptions);

	const consumable_data_filtered = useMemo(
		() =>
			request_data?.request_data?.filter(
				(a) =>
					a.is_waiting === false && a.is_completed === false && a.is_consumable,
			),
		[request_data?.request_data],
	);

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
			) : isConsPending ? (
				<Spinner />
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

								<UpdateConsumableRequestForm {...a} />
							</Flex>
							<Flex direction={"column"} mt={"4"} height={"100px"}>
								<div className="flex flex-wrap gap-2 mt-4">
									{JSON.parse(JSON.stringify(a.services)).map(
										(d: {
											note: string;
											quantity: number;
											consumable: { name: string; amount: string };
										}) => (
											<Badge key={d.note}>
												{d.consumable.name}
												<Text color="red">
													N
													{new Intl.NumberFormat().format(
														Number(d.consumable.amount) * d.quantity,
													)}
													, qty:
													{d.quantity}
												</Text>
											</Badge>
										),
									)}
								</div>
							</Flex>
							<Flex align={"center"} gap={"2"} justify={"between"}>
								Issued By :{" "}
								<Badge>
									{a.profile?.first_name} {a.profile?.middle_name}{" "}
									{a.profile?.last_name}
								</Badge>
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
											(v: {
												quantity: number;
												consumable: { name: string; amount: string };
											}) => Number(Number(v.consumable.amount) * v.quantity),
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
