import {
	Button,
	Card,
	Heading,
	Select,
	Spinner,
	Tabs,
	TextField,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { endOfDay, format } from "date-fns";
import { CopyMinus, Search } from "lucide-react";
import { useState } from "react";
import { appointmentsTypesQueryOptions } from "../../../../actions/queries";
import { AppointmentCheckedIn } from "../../../../components/appointment/AppointmentCheckedIn";
import { AppointmentCompleted } from "../../../../components/appointment/AppointmentCompleted";
import { AppointmentMissed } from "../../../../components/appointment/AppointmentMissed";
import { AppointmentWaiting } from "../../../../components/appointment/AppointmentWaiting";
import { DateRangePicker } from "../../../../components/ui/date-range-picker";
import { CreateAppointmentForm } from "../../../../forms/AppointmentForm";

export const Route = createFileRoute("/_layout/dashboard/appointments/")({
	component: () => (
		<>
			<Heading mb={"3"}>Appointments</Heading>
			<AppointmentCard />
		</>
	),
});

function AppointmentCard() {
	const [searchName, setSearchName] = useState("");
	const [type, setType] = useState("");
	const [range, setRange] = useState({
		from: "2000-01-01 15:00",
		to: "2000-01-01 16:00",
	});

	const { data: appointment_type, isPending: isAppointmentTypePending } =
		useQuery(appointmentsTypesQueryOptions);

	const appointment_type_data = appointment_type?.appointment_type_data;

	const reset = () => {
		setSearchName("");
		setRange({ from: "2000-01-01 16:00", to: "2000-01-01 15:00" });
	};

	return (
		<div className="w-full">
			<Card variant="ghost" my={"3"} style={{ background: "var(--accent-2)" }}>
				<div className="flex justify-between flex-col gap-2 md:flex-row">
					<div className="flex flex-col gap-2">
						{isAppointmentTypePending ? <Spinner /> : <CreateAppointmentForm />}
						<TextField.Root
							disabled={
								`[${range.from}, ${range.to})`.length > 10 &&
								`[${range.from}, ${range.to})` !==
									"[2000-01-01 15:00, 2000-01-01 16:00)"
							}
							onChange={(e) => setSearchName(e.target.value)}
							placeholder="Type atleast 3 characters..."
						>
							<TextField.Slot side="right">
								<Search />
							</TextField.Slot>
						</TextField.Root>
					</div>

					<div className="flex gap-2 flex-col">
						<DateRangePicker
							onUpdate={(values) => {
								setRange({
									from: format(endOfDay(values.range.from), "yyyy-MM-dd HH:mm"),
									to: format(endOfDay(values.range.to!), "yyyy-MM-dd HH:mm"),
								});
							}}
							align="start"
							locale="en-GB"
							showCompare={false}
						/>

						<Select.Root onValueChange={(e) => setType(e)}>
							<Select.Trigger placeholder="Filter by type" />
							<Select.Content position="popper">
								<Select.Group>
									<Select.Label>--filter by appointment type--</Select.Label>
									{appointment_type_data?.map((t) => (
										<Select.Item key={t.id} value={t.name}>
											{t.name}
										</Select.Item>
									))}
								</Select.Group>
							</Select.Content>
						</Select.Root>
						<Button size={"1"} variant="soft" onClick={reset}>
							Reset <CopyMinus size={10} />
						</Button>
					</div>
				</div>
			</Card>
			<Tabs.Root defaultValue="waiting">
				<Tabs.List>
					<Tabs.Trigger value="waiting">Waiting</Tabs.Trigger>
					<Tabs.Trigger value="checked">Checked In</Tabs.Trigger>
					<Tabs.Trigger value="missed">Missed</Tabs.Trigger>
					<Tabs.Trigger value="completed">Completed</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content value="waiting" mt={"2"}>
					<AppointmentWaiting
						from={range.from}
						searchName={searchName}
						to={range.to}
						type={type}
					/>
				</Tabs.Content>
				<Tabs.Content value="checked" mt={"2"}>
					<AppointmentCheckedIn
						from={range.from}
						searchName={searchName}
						to={range.to}
						type={type}
					/>
				</Tabs.Content>
				<Tabs.Content value="missed" mt={"2"}>
					<AppointmentMissed
						from={range.from}
						searchName={searchName}
						to={range.to}
						type={type}
					/>
				</Tabs.Content>

				<Tabs.Content value="completed" mt={"2"}>
					<AppointmentCompleted
						from={range.from}
						searchName={searchName}
						to={range.to}
						type={type}
					/>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
}
