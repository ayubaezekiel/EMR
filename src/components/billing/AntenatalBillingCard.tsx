import { DeleteActionForm } from "@/actions/DeleteAction";
import { deleteRequestAction } from "@/actions/actions";
import { useRequestQuery } from "@/actions/queries";
import { Badge, Callout, Card, Flex, Spinner, Text } from "@radix-ui/themes";
import { format } from "date-fns";
import { FileQuestion } from "lucide-react";
import { useMemo } from "react";
import { PatientCardHeader } from "../PatientCardHeader";
import { ApprovePayments } from "../Payments";

export function AntenatalBillingCard() {
  const { data: request_data, isPending: isAntenatalPending } =
    useRequestQuery();

  const antenatal_data_filtered = useMemo(
    () =>
      request_data?.request_data?.filter(
        (a) =>
          a.is_waiting === false && a.is_completed === false && a.is_antenatal
      ),
    [request_data?.request_data]
  );

  return (
    <div className="w-full">
      {antenatal_data_filtered?.length === 0 ? (
        <Flex justify={"center"}>
          <Callout.Root mt={"9"}>
            <Callout.Icon>
              <FileQuestion />
            </Callout.Icon>
            <Callout.Text ml={"1"}>No result found</Callout.Text>
          </Callout.Root>
        </Flex>
      ) : isAntenatalPending ? (
        <Spinner />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {antenatal_data_filtered?.map((a) => (
            <Card key={a.id}>
              <Flex justify={"between"}>
                <PatientCardHeader
                  createdAt={`${a.created_at}`}
                  firstName={a.patients?.first_name as string}
                  lastName={a.patients?.last_name as string}
                  patientId={a.patients_id}
                  middleName={a.patients?.middle_name as string}
                />
                <DeleteActionForm
                  id={a.id}
                  inValidate="requests"
                  title="Delete Request"
                  warning="Are you sure? this request will be parmanently deleted from the
          database."
                  actionFn={async () => await deleteRequestAction(a.id)}
                />
              </Flex>

              <Flex
                direction={"row"}
                justify={"between"}
                mt={"4"}
                height={"100px"}
              >
                <Badge>
                  {JSON.parse(JSON.stringify(a.services)).package}
                  <Text color="red">
                    N
                    {new Intl.NumberFormat().format(
                      Number(JSON.parse(JSON.stringify(a.services)).amount)
                    )}
                  </Text>
                </Badge>
                <Badge>
                  Expected Delivary Date:{" "}
                  <Text color="red">
                    {format(
                      JSON.parse(JSON.stringify(a.services))
                        .expected_delivary_date,
                      "LLLL dd, yyyy"
                    )}
                  </Text>
                </Badge>
              </Flex>
              <Flex align={"center"} gap={"2"} justify={"between"}>
                Issued By :{" "}
                <Badge>
                  {a.profile?.first_name} {a.profile?.middle_name}{" "}
                  {a.profile?.last_name}
                </Badge>
              </Flex>
              <Flex justify={"end"} align={"center"} mt={"4"}>
                <ApprovePayments
                  isApproved={a.is_approved!}
                  is_appointment={false}
                  is_request
                  requestId={a.id}
                  services={[
                    {
                      name: "antenatal",
                      amount: `${Number(JSON.parse(JSON.stringify(a.services)).amount)}`,
                    },
                  ]}
                  amount={`${Number(JSON.parse(JSON.stringify(a.services)).amount)}`}
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
