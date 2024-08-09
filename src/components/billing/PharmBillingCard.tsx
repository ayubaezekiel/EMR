import { useQuery } from "@tanstack/react-query";
import PendingComponent from "../PendingComponent";
import { requestQueryOptions } from "../../actions/queries";
import {
  Avatar,
  Badge,
  Callout,
  Card,
  Flex,
  Strong,
  Text,
} from "@radix-ui/themes";
import { FileQuestion, UserCheck } from "lucide-react";
import { ApprovePayments } from "../Payments";
import { useMemo } from "react";

export function PharmBillingCard() {
  const { data: request_data, isPending: isLabPending } =
    useQuery(requestQueryOptions);

  const pharm_data_filtered = useMemo(
    () =>
      request_data?.request_data?.filter(
        (a) => a.is_waiting === false && a.is_completed === false && a.is_pharm
      ),
    [request_data?.request_data]
  );

  if (isLabPending) return <PendingComponent />;

  return (
    <div className="w-full">
      {pharm_data_filtered?.length === 0 ? (
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
          {pharm_data_filtered?.map((a) => (
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
                      brand: string;
                      generic_drug: { name: string; amount: string };
                    }) => (
                      <Badge key={d.note}>
                        {d.generic_drug.name} - {d.brand}
                        <Text color="red">N{d.generic_drug.amount}</Text>
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
                      generic_drug: { name: string; amount: string };
                    }) => ({
                      name: d.generic_drug.name,
                      amount: d.generic_drug.amount,
                    })
                  )}
                  amount={JSON.parse(JSON.stringify(a.services))
                    .map(
                      (v: { generic_drug: { name: string; amount: string } }) =>
                        v.generic_drug.amount
                    )
                    .reduce(
                      (prev: string, curr: string) =>
                        Number(prev) + Number(curr)
                    )}
                  patientId={a.patients_id}
                />
              </Flex>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
