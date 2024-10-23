import { Badge, Flex, Text } from "@radix-ui/themes";
import { format } from "date-fns";
import { ApprovePayments } from "../Payments";

export function AntenatalBillingCard({
  services,
  first_name,
  middle_name,
  last_name,
  requestId,
  is_approved,
  patientId,
}: {
  services: unknown;
  first_name: string;
  middle_name?: string;
  last_name: string;
  requestId: string;
  is_approved: boolean;
  patientId: string;
}) {
  const refined_services = JSON.parse(services as string);

  return (
    <div>
      <Flex justify={"between"}>
        <Badge>
          {refined_services.package}
          <Text color="red">
            N{new Intl.NumberFormat().format(Number(refined_services.amount))}
          </Text>
        </Badge>
        <Badge>
          Expected Delivary Date:{" "}
          <Text color="red">
            {format(refined_services.expected_delivary_date, "LLLL dd, yyyy")}
          </Text>
        </Badge>
      </Flex>
      <Flex mt="2" align={"center"} gap={"2"} justify={"between"}>
        <Text size={"1"}>Issued By : </Text>
        <Badge>
          {first_name} {middle_name} {last_name}
        </Badge>
      </Flex>
      <Flex justify={"end"} align={"center"} mt={"4"}>
        <ApprovePayments
          isBulk={false}
          isApproved={is_approved}
          is_appointment={false}
          is_request
          requestId={requestId}
          services={[
            {
              name: "antenatal",
              amount: `${Number(refined_services.amount)}`,
            },
          ]}
          amount={`${Number(refined_services.amount)}`}
          patientId={patientId}
        />
      </Flex>
    </div>
  );
}
