import {
	Badge,
	Button,
	Callout,
	Card,
	Dialog,
	Flex,
	IconButton,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { Eye, FileQuestion, Printer, X } from "lucide-react";
import { useMemo } from "react";
import { changeRequestStatus } from "../../actions/actions";
import { requestQueryOptions } from "../../actions/queries";
import { ConfirmRequestStatusUpdate } from "../../forms/requests/ConfirmRequestStatusUpdate";
import { useRequestById } from "../../lib/hooks";
import { PatientCardHeader } from "../PatientCardHeader";
import PendingComponent from "../PendingComponent";

export function ConsumableRequestWaitingCard() {
	const { data: request_data, isPending: isRequestPending } =
		useQuery(requestQueryOptions);

	const pharm_request_waiting = useMemo(
		() =>
			request_data?.request_data?.filter(
				(a) => a.is_waiting && a.is_consumable,
			),
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
								(d: { note: string; consumable: { name: string } }) => (
									<Badge key={d.note}>{d.consumable.name}</Badge>
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
									(d: { note: string; consumable: { name: string } }) => (
										<Card my={"4"} key={d.note}>
											<Badge mb={"2"}>{d.consumable.name}</Badge>{" "}
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

export function ConsumableRequestCompletedCard() {
	const { data: request_data, isPending: isRequestPending } =
		useQuery(requestQueryOptions);

	const pharm_request_completed = useMemo(
		() =>
			request_data?.request_data?.filter((a) => a.is_completed && a.is_pharm),
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

export function PatientConsumableRequestCard({
	patientId,
}: { patientId: string }) {
	const { request_data, isRequestPending } = useRequestById({ patientId });

	const consumable_data_filtered = useMemo(
		() => request_data?.filter((a) => a.is_consumable),
		[request_data],
	);

	if (isRequestPending) return <PendingComponent />;

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
							</Flex>
							<Flex direction={"column"} mt={"4"} height={"100px"}>
								<div className="flex flex-wrap gap-2 mt-4">
									{JSON.parse(JSON.stringify(a.services)).map(
										(d: {
											note: string;
											consumable: { name: string; amount: string };
										}) => (
											<Badge key={d.note}>{d.consumable.name}</Badge>
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
							<Flex justify={"end"} align={"center"} mt={"4"}>
								<Dialog.Root>
									<Dialog.Trigger>
										<Button variant={"soft"} size={"2"} radius="full">
											<Eye /> View Notes
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
											(d: {
												note: string;
												quantity: string;
												consumable: { name: string; amount: string };
											}) => (
												<Card my={"4"} key={d.note}>
													<Flex gap={"2"}>
														<Badge>{d.consumable.name}</Badge>
														<Badge>Qauntity: {d.quantity}</Badge>
													</Flex>

													<Card mt={"2"}>{d.note}</Card>
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
			)}
		</div>
	);
}