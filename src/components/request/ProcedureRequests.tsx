import { useRequestQuery } from "@/actions/queries";
import { useRequestById } from "@/lib/hooks";
import {
  Badge,
  Button,
  Card,
  Dialog,
  Flex,
  IconButton,
  Spinner,
} from "@radix-ui/themes";
import { X } from "lucide-react";
import { useMemo } from "react";
import { changeRequestStatus } from "../../actions/actions";
import { ConfirmRequestStatusUpdate } from "../../forms/requests/ConfirmRequestStatusUpdate";
import { NoResultFound } from "../NoResultFound";
import { PatientCardHeader } from "../PatientCardHeader";
import PrintProcedureRequests from "./pdfs/ProcedureRequestPdf";

export function ProcedureRequestWaitingCard() {
  const { data: request_data, isPending: isRequestPending } = useRequestQuery();

  const procedure_request_waiting = useMemo(
    () =>
      request_data?.request_data?.filter((a) => a.is_waiting && a.is_procedure),
    [request_data?.request_data]
  );

  return isRequestPending ? (
    <Spinner />
  ) : procedure_request_waiting?.length === 0 ? (
    <NoResultFound />
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {procedure_request_waiting?.map((a) => (
        <Card key={a.id}>
          <PatientCardHeader
            firstName={a.patients?.first_name as string}
            lastName={a.patients?.last_name as string}
            patientId={a.patients_id}
            middleName={a.patients?.middle_name as string}
          />
          <Flex direction={"column"} mt={"4"} height={"100px"}>
            <div className="flex flex-wrap gap-2 mt-4">
              {JSON.parse(JSON.stringify(a.services)).map(
                (d: { note: string; service: { name: string } }) => (
                  <Badge key={d.note}>{d.service.name}</Badge>
                )
              )}
            </div>
          </Flex>
          <Flex justify={"between"} mt={"4"}>
            <ConfirmRequestStatusUpdate
              inValidate="requests"
              id={a.id}
              title="Move To Waiting?"
              triggleLabel="Waiting"
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
              warning="Are you sure you want to mark this appointment as missed?"
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
                {JSON.parse(JSON.stringify(a.services)).map(
                  (d: { note: string; service: { name: string } }) => (
                    <Card my={"4"} key={d.note}>
                      <Badge mb={"2"}>{d.service.name}</Badge>{" "}
                      <Card>{d.note}</Card>
                    </Card>
                  )
                )}
                <Flex justify={"end"} mt={"4"}>
                  <PrintProcedureRequests
                    dateOfBirth={`${new Date(a.patients?.dob as string).toDateString()}`}
                    gender={`${a.patients?.gender}`}
                    patient={`${a.patients?.first_name} ${a.patients?.middle_name ?? ""} ${a.patients?.last_name} [${a.patients_id.slice(0, 8).toUpperCase()}]`}
                    requestDate={`${new Date(a.patients?.created_at as string).toDateString()}`}
                    requestingDoctor={`${a.profile?.first_name} ${a.profile?.middle_name ?? ""} ${a.profile?.last_name}`}
                    requests={JSON.parse(JSON.stringify(a.services)).map(
                      (s: { note: string; service: { name: string } }) => ({
                        name: s.service.name,
                        note: s.note,
                      })
                    )}
                  />
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
            <ProcessLabRequest {...a} />
          </Flex>
        </Card>
      ))}
    </div>
  );
}

export function ProcedureRequestCompletedCard() {
  const { data: request_data, isPending: isRequestPending } = useRequestQuery();

  const procedure_request_completed = useMemo(
    () =>
      request_data?.request_data?.filter(
        (a) => a.is_completed && a.is_procedure
      ),
    [request_data?.request_data]
  );

  return isRequestPending ? (
    <Spinner />
  ) : procedure_request_completed?.length === 0 ? (
    <NoResultFound />
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {procedure_request_completed?.map((a) => (
        <Card key={a.id}>
          <PatientCardHeader
            firstName={a.patients?.first_name as string}
            lastName={a.patients?.last_name as string}
            patientId={a.patients_id}
            middleName={a.patients?.middle_name as string}
          />
          <Flex direction={"column"} mt={"4"} height={"100px"}>
            <div className="flex flex-wrap gap-2 mt-4">
              {JSON.parse(JSON.stringify(a.services)).map(
                (d: { note: string; service: { name: string } }) => (
                  <Badge key={d.note}>{d.service.name}</Badge>
                )
              )}
            </div>
          </Flex>
          <Flex justify={"between"} mt={"4"}>
            <ConfirmRequestStatusUpdate
              inValidate="requests"
              id={a.id}
              title="Move To Waiting?"
              triggleLabel="Waiting"
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
              warning="Are you sure you want to mark this appointment as missed?"
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
                {JSON.parse(JSON.stringify(a.services)).map(
                  (d: { note: string; service: { name: string } }) => (
                    <Card my={"4"} key={d.note}>
                      <Badge mb={"2"}>{d.service.name}</Badge>{" "}
                      <Card>{d.note}</Card>
                    </Card>
                  )
                )}

                <Flex justify={"end"} mt={"4"}>
                  <PrintProcedureRequests
                    dateOfBirth={`${new Date(a.patients?.dob as string).toDateString()}`}
                    gender={`${a.patients?.gender}`}
                    patient={`${a.patients?.first_name} ${a.patients?.middle_name ?? ""} ${a.patients?.last_name} [${a.patients_id.slice(0, 8).toUpperCase()}]`}
                    requestDate={`${new Date(a.patients?.created_at as string).toDateString()}`}
                    requestingDoctor={`${a.profile?.first_name} ${a.profile?.middle_name ?? ""} ${a.profile?.last_name}`}
                    requests={JSON.parse(JSON.stringify(a.services)).map(
                      (s: { note: string; service: { name: string } }) => ({
                        name: s.service.name,
                        note: s.note,
                      })
                    )}
                  />
                </Flex>
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

export function PatientProcedureRequestCard({
  patientId,
}: {
  patientId: string;
}) {
  const { request_data, isRequestPending } = useRequestById({ patientId });

  const procedure_request_completed = useMemo(
    () => request_data?.filter((a) => a.is_procedure),
    [request_data]
  );

  return isRequestPending ? (
    <Spinner />
  ) : procedure_request_completed?.length === 0 ? (
    <NoResultFound />
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {procedure_request_completed?.map((a) => (
        <Card key={a.id}>
          <PatientCardHeader
            firstName={a.patients?.first_name as string}
            lastName={a.patients?.last_name as string}
            patientId={a.patients_id}
            middleName={a.patients?.middle_name as string}
          />
          <Flex direction={"column"} mt={"4"} height={"100px"}>
            <div className="flex flex-wrap gap-2 mt-4">
              {JSON.parse(JSON.stringify(a.services)).map(
                (d: { note: string; service: { name: string } }) => (
                  <Badge key={d.note}>{d.service.name}</Badge>
                )
              )}
            </div>
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
          <Flex justify={"end"} mt={"4"}>
            <Dialog.Root>
              <Dialog.Trigger>
                <Button variant={"soft"} size={"2"} radius="full">
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
                {JSON.parse(JSON.stringify(a.services)).map(
                  (d: { note: string; service: { name: string } }) => (
                    <Card key={d.note}>
                      <Badge>{d.service.name}</Badge>
                      <Card my={"4"}>{d.note}</Card>
                    </Card>
                  )
                )}
                <Flex justify={"end"} mt={"4"}>
                  <PrintProcedureRequests
                    dateOfBirth={`${new Date(a.patients?.dob as string).toDateString()}`}
                    gender={`${a.patients?.gender}`}
                    patient={`${a.patients?.first_name} ${a.patients?.middle_name ?? ""} ${a.patients?.last_name} [${a.patients_id.slice(0, 8).toUpperCase()}]`}
                    requestDate={`${new Date(a.patients?.created_at as string).toDateString()}`}
                    requestingDoctor={`${a.profile?.first_name} ${a.profile?.middle_name ?? ""} ${a.profile?.last_name}`}
                    requests={JSON.parse(JSON.stringify(a.services)).map(
                      (s: { note: string; service: { name: string } }) => ({
                        name: s.service.name,
                        note: s.note,
                      })
                    )}
                  />
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
          </Flex>
        </Card>
      ))}
    </div>
  );
}
