import {
	Box,
	Callout,
	Card,
	Flex,
	IconButton,
	Popover,
	Spinner,
	TextField,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AlertCircle, Search } from "lucide-react";
import { useState } from "react";
import { patientsQueryOptions } from "../actions/queries";

export function NavPatientFilters() {
	const [patient, setPatient] = useState({ match: "", startLoading: false });
	const [open, onOpenChange] = useState(false);

	const { data, isPending } = useQuery(patientsQueryOptions);

	const filtered_patients = data?.patient_data?.filter(
		(p) =>
			p.first_name.toLowerCase().includes(patient.match.toLowerCase()) ||
			p.middle_name?.toLowerCase().includes(patient.match.toLowerCase()) ||
			p.last_name.toLowerCase().includes(patient.match.toLowerCase()),
	);
	return (
		<div className="">
			<Popover.Root open={open} onOpenChange={onOpenChange}>
				<Popover.Trigger>
					<IconButton variant="soft" size={"4"} radius="full">
						<Search />
					</IconButton>
				</Popover.Trigger>
				<Popover.Content width="360px">
					<Flex gap="3">
						<Box flexGrow="1">
							<TextField.Root
								onInput={(e) =>
									setPatient({
										match: e.currentTarget.value,
										startLoading:
											e.currentTarget.value.length < 3 &&
											e.currentTarget.value.length > 0
												? true
												: false,
									})
								}
								placeholder="type aleast 3 letters..."
							>
								<TextField.Slot side="right">
									<Search />
								</TextField.Slot>
							</TextField.Root>
							{isPending || patient.startLoading ? (
								<div className="flex justify-center mt-4">
									<Spinner />
								</div>
							) : filtered_patients?.length === 0 ? (
								<Callout.Root mt={"4"}>
									<Callout.Icon>
										<AlertCircle />
									</Callout.Icon>
									<Callout.Text ml={"2"}>No patient found</Callout.Text>
								</Callout.Root>
							) : (
								filtered_patients?.map((f) => (
									<Card mt={"2"} style={{ background: "var(--accent-3)" }}>
										<Link
											onClick={() => onOpenChange(false)}
											to={`/dashboard/patients/${f.id}/`}
											className="hover:text-[var(--accent-9)] hover:underline"
										>
											{f.first_name} {f.last_name} {f.last_name} [
											{f.id.slice(0, 8).toUpperCase()}]
										</Link>
									</Card>
								))
							)}
						</Box>
					</Flex>
				</Popover.Content>
			</Popover.Root>
		</div>
	);
}
