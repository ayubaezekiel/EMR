import { Avatar, Flex, Strong, Text } from "@radix-ui/themes";
import { UserCheck } from "lucide-react";

interface PatientProps {
	firstName: string;
	middleName?: string;
	lastName: string;
	createdAt: string;
	patientId: string;
}
export function PatientCardHeader({
	createdAt,
	firstName,
	lastName,
	middleName,
	patientId,
}: PatientProps) {
	return (
		<Flex justify={"between"}>
			<Flex gap={"2"} align={"center"}>
				<Avatar fallback={<UserCheck />} radius="full" size={"3"} />
				<Flex direction={"column"}>
					<Flex gap={"1"} align={"center"}>
						<Strong>
							{firstName} {middleName} {lastName} [
							{patientId.slice(0, 8).toUpperCase()}]
						</Strong>
					</Flex>
					<Flex gap={"1"} align={"center"}>
						<Text size={"1"}>
							<Strong>created</Strong>
						</Text>
						.<Text size={"1"}>{new Date(createdAt).toLocaleString()}</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}
