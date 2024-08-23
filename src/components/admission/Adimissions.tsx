import { Badge, Callout, Card, Flex, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { FileQuestion } from "lucide-react";
import { useMemo } from "react";
import { changeRequestStatus } from "../../actions/actions";
import { admissionsQueryOptions } from "../../actions/queries";
import { UpdateAdmissionForm } from "../../forms/admission/AdmissionForm";
import { ConfirmAdmissionUpdate } from "../../forms/requests/ConfirmAdmissionUpdate";
import { PatientCardHeader } from "../PatientCardHeader";
import PendingComponent from "../PendingComponent";
import { Link } from "@tanstack/react-router";

export function AdmissionActiveCard() {
	const { data: admission_data, isPending: isAdmissionPending } = useQuery(
		admissionsQueryOptions,
	);

	const admission_data_filtered = useMemo(
		() =>
			admission_data?.admissions_data?.filter(
				(a) => a.is_approved && a.is_active,
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
								<Link
									to={`/dashboard/admissions/${a.patients?.id}`}
									className="hover:underline"
								>
									<PatientCardHeader
										createdAt={`${a.created_at}`}
										firstName={a.patients?.first_name as string}
										lastName={a.patients?.last_name as string}
										patientId={a.patient_id}
										middleName={a.patients?.middle_name as string}
									/>
								</Link>
								<UpdateAdmissionForm
									admitted_by={a.admitted_by}
									dischard_date={a.dischard_date}
									id={a.id}
									created_at={a.created_at}
									is_active={a.is_active}
									is_approved={a.is_approved}
									is_critical={a.is_critical}
									is_discharged={a.is_discharged}
									beds_id={a.beds_id}
									wards_id={a.wards_id}
									patient_id={a.patient_id}
								/>
							</Flex>

							<Flex direction={"column"} mt={"4"} height={"100px"}>
								<div className="flex flex-wrap gap-2 mt-4">
									<Badge>{a.beds?.name}</Badge>
									<Badge>{a.wards?.name}</Badge>
								</div>
							</Flex>
							<div className="flex justify-between">
								<Text>Discharge Date:</Text>
								<Badge color="red" size={"3"}>
									{new Date(a.dischard_date!).toDateString()}
								</Badge>
							</div>
							<Flex justify={"between"} align={"center"} mt={"4"}>
								<ConfirmAdmissionUpdate
									inValidate="admissions"
									id={a.id}
									title="Move To Waiting?"
									triggleLabel="Issue Request"
									disabled={a.is_active!}
									warning="Are you sure you want to move this request to waiting?"
									actionFn={async () => {
										await changeRequestStatus({
											id: a.id,
											isWaiting: true,
											isCompleted: false,
										});
									}}
								/>
								<ConfirmAdmissionUpdate
									inValidate="admissions"
									id={a.id}
									title="Move To Waiting?"
									triggleLabel="Inbound"
									disabled={a.is_active!}
									warning="Are you sure you want to move this request to waiting?"
									actionFn={async () => {
										await changeRequestStatus({
											id: a.id,
											isWaiting: true,
											isCompleted: false,
										});
									}}
								/>
								<ConfirmAdmissionUpdate
									inValidate="admissions"
									id={a.id}
									title="Move To Waiting?"
									triggleLabel="Record"
									disabled={a.is_active!}
									warning="Are you sure you want to move this request to waiting?"
									actionFn={async () => {
										await changeRequestStatus({
											id: a.id,
											isWaiting: true,
											isCompleted: false,
										});
									}}
								/>
								<ConfirmAdmissionUpdate
									inValidate="admissions"
									id={a.id}
									title="Mark As Missed?"
									triggleLabel="Discharge"
									disabled={a.is_discharged!}
									warning="Are you sure you want to mark this appointment as missed?"
									actionFn={async () => {
										await changeRequestStatus({
											id: a.id,
											isWaiting: false,
											isCompleted: true,
										});
									}}
								/>
							</Flex>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
