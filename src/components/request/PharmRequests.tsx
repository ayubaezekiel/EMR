import {
	Badge,
	Button,
	Card,
	Dialog,
	Flex,
	IconButton,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useMemo } from "react";
import { requestQueryOptions } from "../../actions/queries";
import { ConfirmRequestStatusUpdate } from "../../forms/requests/ConfirmRequestStatusUpdate";
import { PatientCardHeader } from "../PatientCardHeader";
import PendingComponent from "../PendingComponent";
import { changeRequestStatus } from "../../actions/actions";

export function PharmRequestWaitingCard() {
	const { data: request_data, isPending: isRequestPending } =
		useQuery(requestQueryOptions);

	const pharm_request_waiting = useMemo(
		() => request_data?.request_data?.filter((a) => a.is_waiting && a.is_lab),
		[request_data?.request_data],
	);

	if (isRequestPending) return <PendingComponent />;

	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
			{pharm_request_waiting?.map((a) => (
				<Card key={a.id}>
					<PatientCardHeader
						createdAt={a.created_at}
						firstName={a.patients?.first_name as string}
						lastName={a.patients?.last_name as string}
						patientId={a.patients_id}
						middleName={a.patients?.middle_name as string}
					/>
					<Flex direction={"column"} mt={"4"} height={"100px"}>
						<div className="flex flex-wrap gap-2 mt-4">
							{JSON.parse(JSON.stringify(a.services)).map(
								(d: { note: string; service: { name: string } }) => (
									<Badge key={d.note}>{d.service.name}</Badge>
								),
							)}
						</div>
					</Flex>
					<Flex justify={"between"} mt={"4"}>
						<ConfirmRequestStatusUpdate
							inValidate="pharm"
							id={a.id}
							title="Move To Waiting?"
							triggleLabel="Waiting"
							disabled={a.is_waiting!}
							warning="Are you sure you want to move this request to waiting?"
							actionFn={async () => {
								await changeRequestStatus({
									id: a.id,
									isWaiting: true,
									isCompleted: false,
								});
							}}
						/>
						<ConfirmRequestStatusUpdate
							inValidate="pharm"
							id={a.id}
							title="Mark As Missed?"
							triggleLabel="Complete"
							disabled={a.is_completed!}
							warning="Are you sure you want to mark this appointment as missed?"
							actionFn={async () => {
								await changeRequestStatus({
									id: a.id,
									isWaiting: false,
									isCompleted: true,
								});
							}}
						/>
						<Dialog.Root>
							<Dialog.Trigger>
								<Button variant={"outline"} size={"2"} radius="full">
									View Notes
								</Button>
							</Dialog.Trigger>
							<Dialog.Content>
								<div className="flex justify-between">
									<Dialog.Title>Notes</Dialog.Title>
									<Dialog.Close>
										<IconButton variant="ghost">
											<X />
										</IconButton>
									</Dialog.Close>
								</div>
								{JSON.parse(JSON.stringify(a.services)).map(
									(d: { note: string; service: { name: string } }) => (
										<Card my={"4"} key={d.note}>
											<Badge mb={"2"}>{d.service.name}</Badge>{" "}
											<Card>{d.note}</Card>
										</Card>
									),
								)}
							</Dialog.Content>
						</Dialog.Root>
						<ProcessLabRequest {...a} />
					</Flex>
				</Card>
			))}
		</div>
	);
}

export function PharmRequestCompletedCard() {
	const { data: request_data, isPending: isRequestPending } =
		useQuery(requestQueryOptions);

	const pharm_request_completed = useMemo(
		() => request_data?.request_data?.filter((a) => a.is_completed && a.is_lab),
		[request_data?.request_data],
	);

	if (isRequestPending) return <PendingComponent />;

	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
			{pharm_request_completed?.map((a) => (
				<Card key={a.id}>
					<PatientCardHeader
						createdAt={a.created_at}
						firstName={a.patients?.first_name as string}
						lastName={a.patients?.last_name as string}
						patientId={a.patients_id}
						middleName={a.patients?.middle_name as string}
					/>
					<Flex direction={"column"} mt={"4"} height={"100px"}>
						<div className="flex flex-wrap gap-2 mt-4">
							{JSON.parse(JSON.stringify(a.services)).map(
								(d: { test: string; note: string }) => (
									<Badge key={d.note}>{d.test}</Badge>
								),
							)}
						</div>
					</Flex>
					<Flex justify={"between"} mt={"4"}>
						<ConfirmRequestStatusUpdate
							inValidate="pharm"
							id={a.id}
							title="Move To Waiting?"
							triggleLabel="Waiting"
							disabled={a.is_waiting!}
							warning="Are you sure you want to move this request to waiting?"
							actionFn={async () => {
								await changeRequestStatus({
									id: a.id,
									isWaiting: true,
									isCompleted: false,
								});
							}}
						/>
						<ConfirmRequestStatusUpdate
							inValidate="pharm"
							id={a.id}
							title="Mark As Missed?"
							triggleLabel="Complete"
							disabled={a.is_completed!}
							warning="Are you sure you want to mark this appointment as missed?"
							actionFn={async () => {
								await changeRequestStatus({
									id: a.id,
									isWaiting: false,
									isCompleted: true,
								});
							}}
						/>
						<Dialog.Root>
							<Dialog.Trigger>
								<Button variant={"outline"} size={"2"} radius="full">
									View Notes
								</Button>
							</Dialog.Trigger>
							<Dialog.Content>
								<div className="flex justify-between">
									<Dialog.Title>Notes</Dialog.Title>
									<Dialog.Close>
										<IconButton variant="ghost">
											<X />
										</IconButton>
									</Dialog.Close>
								</div>
								{JSON.parse(JSON.stringify(a.services)).map(
									(d: { test: string; note: string }) => (
										<Card my={"4"} key={d.note}>
											{d.note}
										</Card>
									),
								)}
							</Dialog.Content>
						</Dialog.Root>
						<ProcessLabRequest {...a} />
					</Flex>
				</Card>
			))}
		</div>
	);
}

const ProcessLabRequest = (data: DB["requests"]["Row"]) => {
	return (
		<div>
			<Dialog.Root>
				<Dialog.Trigger>
					<Button disabled={data.is_completed!} size={"2"} radius="full">
						Process
					</Button>
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Title>Process Lab Request</Dialog.Title>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque
					nam laudantium vel, adipisci, pariatur, accusantium tempora nihil
					aliquam exercitationem ut omnis totam earum provident asperiores
					incidunt magnam neque. Dolores!
				</Dialog.Content>
			</Dialog.Root>
		</div>
	);
};
