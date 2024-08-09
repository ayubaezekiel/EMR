import { useQuery } from "@tanstack/react-query";
import PendingComponent from "../PendingComponent";
import { requestQueryOptions } from "../../actions/queries";
import { Avatar, Badge, Card, Flex, Strong, Text } from "@radix-ui/themes";
import { UserCheck } from "lucide-react";
import { ApprovePayments } from "../Payments";
import { useMemo } from "react";

export function LabBillingCard() {
  const { data: request_data, isPending: isLabPending } =
    useQuery(requestQueryOptions);

  const lab_data_filtered = useMemo(
    () =>
      request_data?.request_data?.filter(
        (a) => a.is_waiting === false && a.is_completed === false && a.is_lab
      ),
    [request_data?.request_data]
  );

  if (isLabPending) return <PendingComponent />;

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {lab_data_filtered?.map((a) => (
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
                  (d: {
                    note: string;
                    service: { name: string; amount: string };
                  }) => (
                    <Badge key={d.note}>
                      {d.service.name} -{" "}
                      <Text color="red">N{d.service.amount}</Text>
                    </Badge>
                  )
                )}
              </div>
            </Flex>
            <Flex justify={"end"} align={"center"} mt={"4"}>
              <ApprovePayments
                isApproved={a.is_approved!}
                is_request
                is_appointment={false}
                requestId={a.id}
                services={JSON.parse(JSON.stringify(a.services)).map(
                  (d: {
                    note: string;
                    service: { name: string; amount: string };
                  }) => ({
                    name: d.service.name,
                    amount: d.service.amount,
                  })
                )}
                amount={JSON.parse(JSON.stringify(a.services)).reduce(
                  (
                    prev: { service: { name: string; amount: string } },
                    curr: { service: { name: string; amount: string } }
                  ) => Number(prev.service.amount) + Number(curr.service.amount)
                )}
                patientId={a.patients_id}
              />
            </Flex>
          </Card>
        ))}
      </div>
    </div>
  );
}
