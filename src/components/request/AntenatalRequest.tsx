import { useRequestQuery } from "@/actions/queries";
import { useRequestById } from "@/lib/hooks";
import {
  Badge,
  Button,
  Callout,
  Card,
  Dialog,
  Flex,
  IconButton,
  Spinner,
  Text,
} from "@radix-ui/themes";
import { format } from "date-fns";
import { Eye, FileQuestion, Printer, X } from "lucide-react";
import { useMemo } from "react";
import {
  changeRequestStatus,
  deleteRequestAction,
} from "../../actions/actions";
import { ConfirmRequestStatusUpdate } from "../../forms/requests/ConfirmRequestStatusUpdate";
import { PatientCardHeader } from "../PatientCardHeader";
import { DeleteActionForm } from "@/actions/DeleteAction";

export function AntenatalRequestWaitingCard() {
  const { data: request_data, isPending: isRequestPending } = useRequestQuery();

  const antenatal_request_waiting = useMemo(
    () =>
      request_data?.request_data?.filter((a) => a.is_waiting && a.is_antenatal),
    [request_data?.request_data]
  );

  return isRequestPending ? (
    <Spinner />
  ) : antenatal_request_waiting?.length === 0 ? (
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
      {antenatal_request_waiting?.map((a) => (
        <Card key={a.id}>
          <Flex justify={"between"}>
            <PatientCardHeader
              createdAt={a.created_at}
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
          <Flex direction={"row"} justify={"between"} mt={"4"} height={"100px"}>
            <Badge>{JSON.parse(JSON.stringify(a.services)).package}</Badge>
            <Badge>
              Expected Delivary Date:{" "}
              <Text color="red">
                {format(
                  JSON.parse(JSON.stringify(a.services)).expected_delivary_date,
                  "LLLL dd, yyyy"
                )}
              </Text>
            </Badge>
          </Flex>
          <Flex justify={"between"} mt={"4"}>
            <ConfirmRequestStatusUpdate
              inValidate="requests"
              id={a.id}
              title="Move To Active?"
              triggleLabel="Active"
              disabled={a.is_waiting!}
              warning="Are you sure you want to move this request to waiting?"
              actionFn={async () => {
                await changeRequestStatus({
                  id: a.id,
                  isWaiting: true,
                  isCompleted: false,
                });
              }}
            />
            <ConfirmRequestStatusUpdate
              inValidate="requests"
              id={a.id}
              title="Mark As Completed?"
              triggleLabel="Complete"
              disabled={a.is_completed!}
              warning="Are you sure you want to mark this antenatal request as completed?"
              actionFn={async () => {
                await changeRequestStatus({
                  id: a.id,
                  isWaiting: false,
                  isCompleted: true,
                });
              }}
            />
            <Dialog.Root>
              <Dialog.Trigger>
                <Button variant={"outline"} size={"2"} radius="full">
                  View Notes
                </Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <div className="flex justify-between">
                  <Dialog.Title>Notes</Dialog.Title>
                  <Dialog.Close>
                    <IconButton variant="ghost">
                      <X />
                    </IconButton>
                  </Dialog.Close>
                </div>
                <Card my={"4"}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: JSON.parse(JSON.stringify(a.services)).note,
                    }}
                  />
                </Card>
              </Dialog.Content>
            </Dialog.Root>
            <ProcessLabRequest {...a} />
          </Flex>
        </Card>
      ))}
    </div>
  );
}

export function AntenatalRequestCompletedCard() {
  const { data: request_data, isPending: isRequestPending } = useRequestQuery();

  const antenatal_request_completed = useMemo(
    () =>
      request_data?.request_data?.filter(
        (a) => a.is_completed && a.is_antenatal
      ),
    [request_data?.request_data]
  );

  return isRequestPending ? (
    <Spinner />
  ) : antenatal_request_completed?.length === 0 ? (
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
      {antenatal_request_completed?.map((a) => (
        <Card key={a.id}>
          <PatientCardHeader
            createdAt={a.created_at}
            firstName={a.patients?.first_name as string}
            lastName={a.patients?.last_name as string}
            patientId={a.patients_id}
            middleName={a.patients?.middle_name as string}
          />
          <Flex direction={"row"} justify={"between"} mt={"4"} height={"100px"}>
            <Badge>{JSON.parse(JSON.stringify(a.services)).package}</Badge>
            <Badge>
              Expected Delivary Date:{" "}
              <Text color="red">
                {format(
                  JSON.parse(JSON.stringify(a.services)).expected_delivary_date,
                  "LLLL dd, yyyy"
                )}
              </Text>
            </Badge>
          </Flex>
          <Flex justify={"between"} mt={"4"}>
            <ConfirmRequestStatusUpdate
              inValidate="requests"
              id={a.id}
              title="Move To Active?"
              triggleLabel="Active"
              disabled={true}
              warning="Are you sure you want to move this request to waiting?"
              actionFn={async () => {
                await changeRequestStatus({
                  id: a.id,
                  isWaiting: true,
                  isCompleted: false,
                });
              }}
            />
            <ConfirmRequestStatusUpdate
              inValidate="requests"
              id={a.id}
              title="Mark As Completed?"
              triggleLabel="Complete"
              disabled={a.is_completed!}
              warning="Are you sure you want to mark this antenatal request as completed?"
              actionFn={async () => {
                await changeRequestStatus({
                  id: a.id,
                  isWaiting: false,
                  isCompleted: true,
                });
              }}
            />
            <Dialog.Root>
              <Dialog.Trigger>
                <Button variant={"outline"} size={"2"} radius="full">
                  View Notes
                </Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <div className="flex justify-between">
                  <Dialog.Title>Notes</Dialog.Title>
                  <Dialog.Close>
                    <IconButton variant="ghost">
                      <X />
                    </IconButton>
                  </Dialog.Close>
                </div>
                <Card my={"4"}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: JSON.parse(JSON.stringify(a.services)).note,
                    }}
                  />
                </Card>
              </Dialog.Content>
            </Dialog.Root>
            <ProcessLabRequest {...a} />
          </Flex>
        </Card>
      ))}
    </div>
  );
}

const ProcessLabRequest = (data: DB["requests"]["Row"]) => {
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button disabled={data.is_completed!} size={"2"} radius="full">
            Process
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Process Lab Request</Dialog.Title>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque
          nam laudantium vel, adipisci, pariatur, accusantium tempora nihil
          aliquam exercitationem ut omnis totam earum provident asperiores
          incidunt magnam neque. Dolores!
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export function PatientAntenatalRequestCard({
  patientId,
}: {
  patientId: string;
}) {
  const { request_data, isRequestPending } = useRequestById({ patientId });

  const antenatal_data_filtered = useMemo(
    () => request_data?.filter((a) => a.is_antenatal),
    [request_data]
  );

  return isRequestPending ? (
    <Spinner />
  ) : antenatal_data_filtered?.length === 0 ? (
    <Flex justify={"center"}>
      <Callout.Root mt={"9"}>
        <Callout.Icon>
          <FileQuestion />
        </Callout.Icon>
        <Callout.Text ml={"1"}>No result found</Callout.Text>
      </Callout.Root>
    </Flex>
  ) : (
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
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {antenatal_data_filtered?.map((a) => (
            <Card key={a.id}>
              <Flex justify={"between"}>
                <PatientCardHeader
                  createdAt={a.created_at}
                  firstName={a.patients?.first_name as string}
                  lastName={a.patients?.last_name as string}
                  patientId={a.patients_id}
                  middleName={a.patients?.middle_name as string}
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
                    )}{" "}
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
              <div className="flex gap-2">
                {!a.is_waiting && !a.is_completed && (
                  <Badge color="red">
                    pending payment
                    <span className="p-1 bg-[var(--accent-9)] rounded-full animate-pulse" />
                  </Badge>
                )}
                {a.is_waiting && (
                  <Badge color="amber">
                    waiting
                    <span className="p-1 bg-[var(--accent-9)] rounded-full animate-pulse" />
                  </Badge>
                )}
                {a.is_completed && (
                  <Badge>
                    completed
                    <span className="p-1 bg-[var(--accent-9)] rounded-full animate-pulse" />
                  </Badge>
                )}
              </div>
              <Flex justify={"end"} align={"center"} mt={"4"}>
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Button variant={"soft"} size={"2"} radius="full">
                      <Eye /> View Notes
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Content>
                    <div className="flex justify-between">
                      <Dialog.Title>Notes</Dialog.Title>
                      <Dialog.Close>
                        <IconButton variant="ghost">
                          <X />
                        </IconButton>
                      </Dialog.Close>
                    </div>
                    <Card my={"4"}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: JSON.parse(JSON.stringify(a.services)).note,
                        }}
                      />
                    </Card>

                    <Flex justify={"end"}>
                      <Button>
                        Print <Printer />
                      </Button>
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>
              </Flex>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
