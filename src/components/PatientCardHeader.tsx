import { Avatar, Flex, Strong, Text } from "@radix-ui/themes";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
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
    <Link
      to={`/dashboard/patients/${patientId}`}
      className="hover:underline text-inherit no-underline"
    >
      <Flex justify={"between"}>
        <Flex gap={"2"} align={"center"}>
          <Avatar fallback={<UserCheck />} radius="full" size={"3"} />
          <Flex direction={"column"}>
            <Flex gap={"1"} align={"center"}>
              <Text>
                <Strong>
                  {firstName} {middleName} {lastName} [
                  {patientId.slice(0, 8).toUpperCase()}]
                </Strong>
              </Text>
            </Flex>
            <Flex gap={"1"} align={"center"}>
              <Text size={"1"}>
                <Strong>created</Strong>
              </Text>
              .
              <Text size={"1"}>{format(createdAt, "LLL MM yyy, HH:mm a")}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}
