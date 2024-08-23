import { Badge, Callout, Card, Flex, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { FileQuestion } from "lucide-react";
import { useMemo } from "react";
import { admissionsQueryOptions } from "../../actions/queries";
import { PatientCardHeader } from "../PatientCardHeader";
import { ApprovePayments } from "../Payments";
import PendingComponent from "../PendingComponent";
import { UpdateAdmissionForm } from "../../forms/admission/AdmissionForm";

export function AdmissionBillingCard() {
	const { data: admission_data, isPending: isAdmissionPending } = useQuery(
		admissionsQueryOptions,
	);

	const admission_data_filtered = useMemo(
		() =>
			admission_data?.admissions_data?.filter(
				(a) => !a.is_approved && !a.is_active && !a.is_discharged,
			),
		[admission_data?.admissions_data],
	);

	if (isAdmissionPending) return <PendingComponent />;

	return (
		<div className="w-full">
			{admission_data_filtered?.length === 0 ? (
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
					{admission_data_filtered?.map((a) => (
						<Card key={a.id}>
							<Flex justify={"between"}>
								<PatientCardHeader
									createdAt={`${a.created_at}`}
									firstName={a.patients?.first_name as string}
									lastName={a.patients?.last_name as string}
									patientId={a.patient_id}
									middleName={a.patients?.middle_name as string}
								/>
								<UpdateAdmissionForm {...a} />
							</Flex>

							<Flex direction={"column"} mt={"4"} height={"100px"}>
								<div className="flex flex-wrap gap-2 mt-4">
									<Badge>
										{a.beds?.name}
										<Text color="red">
											N
											{new Intl.NumberFormat().format(
												Number(a.beds?.default_price),
											)}
										</Text>
									</Badge>

									<Badge>
										{a.wards?.name}
										<Text color="red">
											N
											{new Intl.NumberFormat().format(
												Number(a.wards?.default_price),
											)}
										</Text>
									</Badge>
								</div>
							</Flex>
							<Flex justify={"end"} align={"center"} mt={"4"}>
								<ApprovePayments
									isApproved={a.is_approved!}
									is_appointment={false}
									isAdmission
									is_request={false}
									admissionId={a.id}
									services={[
										{
											name: "admission",
											amount: `${
												Number(a.beds?.default_price) +
												Number(a.wards?.default_price)
											}`,
										},
									]}
									amount={`${
										Number(a.beds?.default_price) +
										Number(a.wards?.default_price)
									}`}
									patientId={a.patient_id}
								/>
							</Flex>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
