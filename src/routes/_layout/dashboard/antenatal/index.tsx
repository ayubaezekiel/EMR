import { createFileRoute } from "@tanstack/react-router";

import { DateRangePicker } from "@nextui-org/date-picker";
import {
	AlertDialog,
	Avatar,
	Badge,
	Button,
	Card,
	Dialog,
	Flex,
	Heading,
	IconButton,
	Strong,
	Tabs,
	Text,
} from "@radix-ui/themes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserCheck, X } from "lucide-react";
import { changeRequestStatus } from "../../../../actions/actions";
import { requestQueryOptions } from "../../../../actions/queries";
import PendingComponent from "../../../../components/PendingComponent";
import { CreateAntenatalRequestForm } from "../../../../forms/requests/AntenatalRequestForm";

export const Route = createFileRoute("/_layout/dashboard/antenatal/")({
	component: () => (
		<>
			<Heading mb={"3"}>Antenatal Requests</Heading>
			<LabRequest />
		</>
	),
});

const LabRequest = () => {
	return (
		<div>
			<Card variant="ghost" my={"3"} style={{ background: "var(--accent-2)" }}>
				<div className="flex justify-between flex-col gap-2 md:flex-row">
					<CreateAntenatalRequestForm />

					<div className="flex gap-2 flex-col">
						<DateRangePicker />
					</div>
				</div>
			</Card>
			<Tabs.Root defaultValue="waiting" my={"4"}>
				<Tabs.List>
					<Tabs.Trigger value="waiting">Waiting</Tabs.Trigger>
					<Tabs.Trigger value="completed">Completed</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content value="waiting" mt={"2"}>
					<LabRequestCard isCompleted={false} isWaiting={true} />
				</Tabs.Content>

				<Tabs.Content value="completed" mt={"2"}>
					<LabRequestCard isCompleted={true} isWaiting={false} />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
};

interface LabRequestStatus {
	isWaiting?: boolean;
	isCompleted?: boolean;
}
function LabRequestCard({ isCompleted, isWaiting }: LabRequestStatus) {
	const { data: request_data, isPending: isRequestPending } =
		useQuery(requestQueryOptions);

	if (isRequestPending) return <PendingComponent />;

	const lab_request_waiting = request_data?.request_data?.filter(
		(a) => a.is_waiting === isWaiting && a.is_lab === true,
	);

	const lab_request_completed = request_data?.request_data?.filter(
		(a) => a.is_completed === isCompleted && a.is_lab === true,
	);

	return (
		<div className="w-full">
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
				{isWaiting &&
					lab_request_waiting?.map((a) => (
						<Card key={a.id}>
							<Flex justify={"between"}>
								<Flex gap={"2"} align={"center"}>
									<Avatar fallback={<UserCheck />} radius="full" size={"3"} />
									<Flex direction={"column"}>
										<Flex gap={"1"} align={"center"}>
											<Strong>
												{a.patients?.first_name} {a.patients?.middle_name}{" "}
												{a.patients?.last_name} [
												{a.patients_id.slice(0, 8).toUpperCase()}]
											</Strong>
										</Flex>
										<Flex gap={"1"} align={"center"}>
											<Text size={"1"}>
												<Strong>created</Strong>
											</Text>
											.
											<Text size={"1"}>
												{new Date(a.created_at!).toLocaleString()}
											</Text>
										</Flex>
									</Flex>
								</Flex>
							</Flex>

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
								<ConfirmLabRequestUpdate
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
								<ConfirmLabRequestUpdate
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

				{isCompleted &&
					lab_request_completed?.map((a) => (
						<Card key={a.id}>
							<Flex justify={"between"}>
								<Flex gap={"2"} align={"center"}>
									<Avatar fallback={<UserCheck />} radius="full" size={"3"} />
									<Flex direction={"column"}>
										<Flex gap={"1"} align={"center"}>
											<Strong>
												{a.patients?.first_name} {a.patients?.middle_name}{" "}
												{a.patients?.last_name} [
												{a.patients_id.slice(0, 8).toUpperCase()}]
											</Strong>
										</Flex>
										<Flex gap={"1"} align={"center"}>
											<Text size={"1"}>
												<Strong>created</Strong>
											</Text>
											.
											<Text size={"1"}>
												{new Date(a.created_at!).toLocaleString()}
											</Text>
										</Flex>
									</Flex>
								</Flex>
							</Flex>
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
								<ConfirmLabRequestUpdate
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
								<ConfirmLabRequestUpdate
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

interface UpdateActionType {
	id: string;
	title: string;
	warning: string;
	triggleLabel: string;
	disabled: boolean;
	actionFn: ({ id }: { id: string }) => void;
}
const ConfirmLabRequestUpdate = ({
	actionFn,
	id,
	title,
	warning,
	triggleLabel,
	disabled,
}: UpdateActionType) => {
	const queryClient = useQueryClient();
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button disabled={disabled} size={"2"} radius="full" variant="soft">
					{triggleLabel}
				</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content maxWidth="450px">
				<AlertDialog.Title>{title}</AlertDialog.Title>
				<AlertDialog.Description size="2">{warning}</AlertDialog.Description>

				<Flex gap="3" mt="4" justify="end">
					<AlertDialog.Cancel>
						<Button variant="soft" color="gray">
							Cancel
						</Button>
					</AlertDialog.Cancel>
					<AlertDialog.Action>
						<Button
							disabled={disabled}
							variant="solid"
							color="red"
							onClick={() => {
								actionFn({ id: id });
								queryClient.invalidateQueries({ queryKey: ["labRequests"] });
							}}
						>
							Confirm
						</Button>
					</AlertDialog.Action>
				</Flex>
			</AlertDialog.Content>
		</AlertDialog.Root>
	);
};