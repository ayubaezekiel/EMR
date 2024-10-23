import { Badge, Flex, Text } from "@radix-ui/themes";
import { ApprovePayments } from "../Payments";

export function PharmBillingCard({
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
      <div className="flex flex-wrap gap-2">
        {refined_services.map(
          (d: {
            note: string;
            brand: string;
            quantity: number;
            quantity_type: string;
            generic_drug: { name: string; amount: string };
          }) => (
            <Badge key={d.note}>
              {d.generic_drug.name}
              <Text color="red">
                N
                {new Intl.NumberFormat().format(
                  Number(d.generic_drug.amount) * d.quantity
                )}{" "}
                <Badge>
                  {d.quantity} {d.quantity_type}
                </Badge>
              </Text>
            </Badge>
          )
        )}
      </div>

      <Flex align={"center"} gap={"2"} justify={"between"} mt={"2"}>
        <Text size={"1"}>Issued By : </Text>
        <Badge>
          {first_name} {middle_name} {last_name}
        </Badge>
      </Flex>
      <Flex justify={"end"} align={"center"} mt={"4"}>
        <ApprovePayments
          isBulk={false}
          isApproved={is_approved!}
          is_request
          is_appointment={false}
          requestId={requestId}
          services={refined_services.map(
            (d: {
              note: string;
              generic_drug: { name: string; amount: string };
            }) => ({
              name: d.generic_drug.name,
              amount: d.generic_drug.amount,
            })
          )}
          amount={refined_services
            .map(
              (v: { generic_drug: { name: string; amount: string } }) =>
                v.generic_drug.amount
            )
            .reduce(
              (prev: string, curr: string) => Number(prev) + Number(curr)
            )}
          patientId={patientId}
        />
      </Flex>
    </div>
  );
}
