import { Badge, Flex, Text } from "@radix-ui/themes";
import { ApprovePayments } from "../Payments";

export function RadiologyBillingCard({
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
    <div className="w-full">
      <div className="flex flex-wrap gap-2">
        {refined_services.map(
          (d: { note: string; service: { name: string; amount: string } }) => (
            <Badge key={d.note}>
              {d.service.name} -{" "}
              <Text color="red">
                N{new Intl.NumberFormat().format(Number(d.service.amount))}
              </Text>
            </Badge>
          )
        )}
      </div>

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
          is_request
          is_appointment={false}
          requestId={requestId}
          services={refined_services.map(
            (d: {
              note: string;
              service: { name: string; amount: string };
            }) => ({
              name: d.service.name,
              amount: d.service.amount,
            })
          )}
          amount={refined_services
            .map((amt: { service: { amount: string } }) =>
              Number(amt.service.amount)
            )
            .reduce(
              (prev: number, curr: number) => Number(prev) + Number(curr)
            )}
          patientId={patientId}
        />
      </Flex>
    </div>
  );
}
