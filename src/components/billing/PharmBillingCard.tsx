import { Badge, Callout, Card, Flex, Spinner, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { FileQuestion } from "lucide-react";
import { useMemo } from "react";
import { DeleteActionForm } from "../../actions/DeleteAction";
import { deleteRequestAction } from "../../actions/actions";
import { requestQueryOptions } from "@/actions/queries";
import { PatientCardHeader } from "../PatientCardHeader";
import { ApprovePayments } from "../Payments";

export function PharmBillingCard() {
	const { data: request_data, isPending: isPharmPending } =
		useQuery(requestQueryOptions);

	const pharm_data_filtered = useMemo(
		() =>
			request_data?.request_data?.filter(
				(a) => a.is_waiting === false && a.is_completed === false && a.is_pharm,
			),
		[request_data?.request_data],
	);

	return (
		<div className="w-full">
			{pharm_data_filtered?.length === 0 ? (
				<Flex justify={"center"}>
					<Callout.Root mt={"9"}>
						<Callout.Icon>
							<FileQuestion />
						</Callout.Icon>
						<Callout.Text ml={"1"}>No result found</Callout.Text>
					</Callout.Root>
				</Flex>
			) : isPharmPending ? (
				<Spinner />
			) : (
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
					{pharm_data_filtered?.map((a) => (
						<Card key={a.id}>
							<Flex justify={"between"}>
								<PatientCardHeader
									createdAt={a.created_at}
									firstName={a.patients?.first_name as string}
									lastName={a.patients?.last_name as string}
									patientId={a.patients_id}
									middleName={a.patients?.middle_name as string}
								/>
								<DeleteActionForm
									id={a.id}
									inValidate="requests"
									title="Delete Request"
									warning="Are you sure? this request will be parmanently deleted from the
          database."
									actionFn={async () => await deleteRequestAction(a.id)}
								/>
							</Flex>

							<Flex direction={"column"} mt={"4"} height={"100px"}>
								<div className="flex flex-wrap gap-2 mt-4">
									{JSON.parse(JSON.stringify(a.services)).map(
										(d: {
											note: string;
											brand: string;
											quantity: number;
											quantity_type: string;
											generic_drug: { name: string; amount: string };
										}) => (
											<Badge key={d.note}>
												{d.generic_drug.name}
												<Text color="red">
													N
													{new Intl.NumberFormat().format(
														Number(d.generic_drug.amount) * d.quantity,
													)}{" "}
													<Badge>
														{d.quantity} {d.quantity_type}
													</Badge>
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
											generic_drug: { name: string; amount: string };
										}) => ({
											name: d.generic_drug.name,
											amount: d.generic_drug.amount,
										}),
									)}
									amount={JSON.parse(JSON.stringify(a.services))
										.map(
											(v: { generic_drug: { name: string; amount: string } }) =>
												v.generic_drug.amount,
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
