import {
	Badge,
	Button,
	Card,
	Dialog,
	Flex,
	IconButton,
	Text,
} from "@radix-ui/themes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Printer, X } from "lucide-react";
import { useMemo } from "react";
import { requestQueryOptions } from "../../actions/queries";
import { ConfirmRequestStatusUpdate } from "../../forms/requests/ConfirmRequestStatusUpdate";
import { PatientCardHeader } from "../PatientCardHeader";
import PendingComponent from "../PendingComponent";
import { changeRequestStatus } from "../../actions/actions";
import { useRequestById } from "../../lib/hooks";

export function PharmRequestWaitingCard() {
	const { data: request_data, isPending: isRequestPending } =
		useQuery(requestQueryOptions);

	const pharm_request_waiting = useMemo(
		() => request_data?.request_data?.filter((a) => a.is_waiting && a.is_pharm),
		[request_data?.request_data],
	);

	const queryClient = useQueryClient();

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
								(d: { note: string; generic_drug: { name: string } }) => (
									<Badge key={d.note}>{d.generic_drug.name}</Badge>
								),
							)}
						</div>
					</Flex>
					<Flex justify={"between"} mt={"4"}>
						<ConfirmRequestStatusUpdate
							inValidate="requests"
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
								queryClient.invalidateQueries({ queryKey: ["requests"] });
							}}
						/>
						<ConfirmRequestStatusUpdate
							inValidate="requests"
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
								queryClient.invalidateQueries({ queryKey: ["requests"] });
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
									(d: { note: string; generic_drug: { name: string } }) => (
										<Card my={"4"} key={d.note}>
											<Badge mb={"2"}>{d.generic_drug.name}</Badge>{" "}
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
		() =>
			request_data?.request_data?.filter((a) => a.is_completed && a.is_pharm),
		[request_data?.request_data],
	);

	const queryClient = useQueryClient();

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
								(d: { note: string; generic_drug: { name: string } }) => (
									<Badge key={d.note}>{d.generic_drug.name}</Badge>
								),
							)}
						</div>
					</Flex>
					<Flex justify={"between"} mt={"4"}>
						<ConfirmRequestStatusUpdate
							inValidate="requests"
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
								queryClient.invalidateQueries({ queryKey: ["requests"] });
							}}
						/>
						<ConfirmRequestStatusUpdate
							inValidate="requests"
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
								queryClient.invalidateQueries({ queryKey: ["requests"] });
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
									(d: { note: string; generic_drug: { name: string } }) => (
										<Card my={"4"} key={d.note}>
											<Badge mb={"2"}>{d.generic_drug.name}</Badge>{" "}
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

export function PatientPharmRequestCard({ patientId }: { patientId: string }) {
	const { request_data, isRequestPending } = useRequestById({ patientId });

	const pharm_request = useMemo(
		() => request_data?.filter((a) => a.is_pharm),
		[request_data],
	);

	if (isRequestPending) return <PendingComponent />;

	return (
		<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
			{pharm_request?.map((a) => (
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
								(d: { brand: string; generic_drug: { name: string } }) => (
									<Badge key={d.brand}>
										{d.generic_drug.name} -{d.brand}
									</Badge>
								),
							)}
						</div>
					</Flex>
					<div className="flex gap-2">
						{!a.is_waiting && !a.is_completed && (
							<Badge color="red">
								pending payment
								<span className="p-1 bg-[var(--accent-9)] rounded-full animate-pulse" />
							</Badge>
						)}
						{a.is_waiting && (
							<Badge color="amber">
								waiting
								<span className="p-1 bg-[var(--accent-9)] rounded-full animate-pulse" />
							</Badge>
						)}
						{a.is_completed && (
							<Badge>
								completed
								<span className="p-1 bg-[var(--accent-9)] rounded-full animate-pulse" />
							</Badge>
						)}
					</div>
					<Flex justify={"end"} mt={"4"}>
						<Dialog.Root>
							<Dialog.Trigger>
								<Button variant={"soft"} size={"2"} radius="full">
									View Notes
								</Button>
							</Dialog.Trigger>
							<Dialog.Content size={"4"}>
								<div className="flex justify-between">
									<Dialog.Title>Notes</Dialog.Title>
									<Dialog.Close>
										<IconButton variant="ghost">
											<X />
										</IconButton>
									</Dialog.Close>
								</div>
								{JSON.parse(JSON.stringify(a.services)).map(
									(d: {
										note: string;
										dose: string;
										duration: string;
										time: string;
										brand: string;
										frequency: string;
										generic_drug: { name: string };
									}) => (
										<Card my={"4"} key={d.note}>
											<div>
												<div className="grid grid-cols-2 mb-6 justify-between gap-4">
													<Text>
														{d.generic_drug.name} ({d.brand})
													</Text>
													<Text>Dose :{d.dose}</Text>
													<Text>Frequency : {d.frequency}</Text>
													<Text>
														Duration : {d.duration}
														{d.time}
													</Text>
												</div>
												<Text>Note : {d.note}</Text>
											</div>
										</Card>
									),
								)}
								<Flex justify={"end"}>
									<Button>
										Print <Printer />
									</Button>
								</Flex>
							</Dialog.Content>
						</Dialog.Root>
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
