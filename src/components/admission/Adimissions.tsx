import {
	Badge,
	Button,
	Callout,
	Card,
	Flex,
	Inset,
	Separator,
	Spinner,
	Text,
} from "@radix-ui/themes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { endOfDay } from "date-fns";
import { ArrowRightCircle, FileQuestion } from "lucide-react";
import { useMemo } from "react";
import { changeAdmissionStatus } from "../../actions/actions";
import { admissionsQueryOptions } from "../../actions/queries";
import { UpdateAdmissionForm } from "../../forms/admission/AdmissionForm";
import { ConfirmAdmissionUpdate } from "../../forms/requests/ConfirmAdmissionUpdate";
import { PatientCardHeader } from "../PatientCardHeader";

export function AdmissionActiveCard() {
	const { data: admission_data, isPending: isAdmissionPending } = useQuery(
		admissionsQueryOptions,
	);
	const queryClient = useQueryClient();
	const admission_data_filtered = useMemo(
		() =>
			admission_data?.admissions_data?.filter(
				(a) => a.is_approved && a.is_active,
			),
		[admission_data?.admissions_data],
	);

	return isAdmissionPending ? (
		<Spinner />
	) : (
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

							<Flex my={"4"} justify={"between"}>
								<div className="flex flex-wrap gap-2">
									<Badge>{a.beds?.name}</Badge>
									<Badge>{a.wards?.name}</Badge>
								</div>
								{a.is_critical && (
									<Badge radius="full" color="red">
										critical
									</Badge>
								)}
							</Flex>
							<Flex justify={"between"}>
								<Text>Discharge Date:</Text>
								<Flex gap={"2"}>
									<Badge size={"3"} radius="full">
										{new Date(a.dischard_date!).toDateString()}
									</Badge>
									<Badge color="red" size={"3"} radius="full">
										{endOfDay(a.dischard_date!) < new Date()
											? "Due"
											: "Not Due"}
									</Badge>
								</Flex>
							</Flex>
							<Inset mt={"6"}>
								<Separator size={"4"} />
							</Inset>
							<Flex align={"center"} mt={"5"} justify={"between"}>
								<Button variant="soft" radius="full">
									<Link to={`/dashboard/admissions/${a.patients?.id}`}>
										<ArrowRightCircle />
									</Link>
								</Button>
								<Flex gap={"4"}>
									<ConfirmAdmissionUpdate
										inValidate="admissions"
										id={a.id}
										title="Move To Waiting?"
										triggleLabel="Active"
										disabled={a.is_active!}
										warning="Are you sure you want to move this request to waiting?"
										actionFn={async () => {
											await changeAdmissionStatus({
												id: a.id,
												isActive: true,
												isDischarged: false,
											});
											queryClient.invalidateQueries({
												queryKey: ["admissions"],
											});
										}}
									/>

									<ConfirmAdmissionUpdate
										inValidate="admissions"
										id={a.id}
										title="Dischard Patient?"
										triggleLabel="Discharge"
										disabled={a.is_discharged!}
										warning="Are you sure you want to discharge this discharge as patient?"
										actionFn={async () => {
											await changeAdmissionStatus({
												id: a.id,
												isActive: false,
												isDischarged: true,
											});
											queryClient.invalidateQueries({
												queryKey: ["admissions"],
											});
										}}
									/>
								</Flex>
							</Flex>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}

export function AdmissionDischargedCard() {
	const { data: admission_data, isPending: isAdmissionPending } = useQuery(
		admissionsQueryOptions,
	);
	const queryClient = useQueryClient();
	const admission_data_filtered = useMemo(
		() => admission_data?.admissions_data?.filter((a) => a.is_discharged),
		[admission_data?.admissions_data],
	);

	return isAdmissionPending ? (
		<Spinner />
	) : (
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

							<Flex my={"4"} justify={"between"}>
								<div className="flex flex-wrap gap-2">
									<Badge>{a.beds?.name}</Badge>
									<Badge>{a.wards?.name}</Badge>
								</div>
								{a.is_critical && (
									<Badge radius="full" color="red">
										critical
									</Badge>
								)}
							</Flex>
							<Flex justify={"between"}>
								<Text>Discharge Date:</Text>
								<Flex gap={"2"}>
									<Badge size={"3"} radius="full">
										{new Date(a.dischard_date!).toDateString()}
									</Badge>
									<Badge color="red" size={"3"} radius="full">
										{endOfDay(a.dischard_date!) < new Date()
											? "Due"
											: "Not Due"}
									</Badge>
								</Flex>
							</Flex>
							<Inset mt={"6"}>
								<Separator size={"4"} />
							</Inset>
							<Flex align={"center"} mt={"5"} justify={"between"}>
								<Button variant="soft" radius="full">
									<Link to={`/dashboard/admissions/${a.patients?.id}`}>
										<ArrowRightCircle />
									</Link>
								</Button>
								<Flex gap={"4"}>
									<ConfirmAdmissionUpdate
										inValidate="admissions"
										id={a.id}
										title="Move To Waiting?"
										triggleLabel="Active"
										disabled={a.is_active!}
										warning="Are you sure you want to move this request to waiting?"
										actionFn={async () => {
											await changeAdmissionStatus({
												id: a.id,
												isActive: true,
												isDischarged: false,
											});
											queryClient.invalidateQueries({
												queryKey: ["admissions"],
											});
										}}
									/>

									<ConfirmAdmissionUpdate
										inValidate="admissions"
										id={a.id}
										title="Dischard Patient?"
										triggleLabel="Discharge"
										disabled={a.is_discharged!}
										warning="Are you sure you want to discharge this discharge as patient?"
										actionFn={async () => {
											await changeAdmissionStatus({
												id: a.id,
												isActive: false,
												isDischarged: true,
											});
											queryClient.invalidateQueries({
												queryKey: ["admissions"],
											});
										}}
									/>
								</Flex>
							</Flex>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
