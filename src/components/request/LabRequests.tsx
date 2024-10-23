import { DeleteActionForm } from "@/actions/DeleteAction";
import { useRequestQuery } from "@/actions/queries";
import {
  CreateLabResultsForm,
  UpdateLabResultsForm,
} from "@/forms/requests/results/LabResults";
import { useLabResults, useRequestById } from "@/lib/hooks";
import { Json } from "@/lib/supabase.types";
import {
  Badge,
  Button,
  Card,
  Dialog,
  Flex,
  IconButton,
  Spinner,
  Table,
} from "@radix-ui/themes";
import { Eye, X } from "lucide-react";
import { useMemo } from "react";
import {
  changeRequestStatus,
  deleteLabResultAction,
} from "../../actions/actions";
import { ConfirmRequestStatusUpdate } from "../../forms/requests/ConfirmRequestStatusUpdate";
import { NoResultFound } from "../NoResultFound";
import { PatientCardHeader } from "../PatientCardHeader";
import PrintLabRequests from "./pdfs/LabRequestPdfs";
import PrintLabResult from "./pdfs/LabResultsPdf";

export function LabRequestWaitingCard() {
  const { data: request_data, isPending: isRequestPending } = useRequestQuery();

  const lab_request_waiting = useMemo(
    () => request_data?.request_data?.filter((a) => a.is_waiting && a.is_lab),
    [request_data?.request_data]
  );

  return isRequestPending ? (
    <Spinner />
  ) : lab_request_waiting?.length === 0 ? (
    <NoResultFound />
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {lab_request_waiting?.map((a) => (
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

                <Table.Root variant="surface">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell>Test</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Note</Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {JSON.parse(JSON.stringify(a.services)).map(
                      (d: { note: string; service: { name: string } }) => (
                        <Table.Row>
                          <Table.RowHeaderCell>
                            {d.service.name}
                          </Table.RowHeaderCell>
                          <Table.Cell>{d.note}</Table.Cell>
                        </Table.Row>
                      )
                    )}
                  </Table.Body>
                </Table.Root>
                <Flex justify={"end"} mt={"4"}>
                  <PrintLabRequests
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
            <CreateLabResultsForm requestId={a.id} />
            <ViewLabResults
              dateOfBirth={`${new Date(a.patients?.dob as string).toDateString()}`}
              gender={`${a.patients?.gender}`}
              patient={`${a.patients?.first_name} ${a.patients?.middle_name ?? ""} ${a.patients?.last_name} [${a.patients_id.slice(0, 8).toUpperCase()}]`}
              requestDate={`${new Date(a.patients?.created_at as string).toDateString()}`}
              requestingDoctor={`${a.profile?.first_name} ${a.profile?.middle_name ?? ""} ${a.profile?.last_name}`}
              requestId={a.id}
            />
          </Flex>
        </Card>
      ))}
    </div>
  );
}

const ViewLabResults = ({
  requestId,
  dateOfBirth,
  gender,
  patient,
  requestDate,
  requestingDoctor,
}: {
  requestId: string;
  dateOfBirth: string;
  gender: string;
  patient: string;
  requestDate: string;
  requestingDoctor: string;
}) => {
  const { isResultsPending, results_data } = useLabResults(requestId);

  const results = JSON.parse(JSON.stringify(results_data?.results ?? []));

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          loading={isResultsPending}
          variant="classic"
          size={"2"}
          radius="full"
        >
          Results
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

        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Paramter</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>value</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Reference</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Remark</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {results.map(
              (d: {
                parameter: string;
                value: string;
                reference_range: string;
                is_abnormal: boolean;
              }) => (
                <Table.Row>
                  <Table.RowHeaderCell>{d.parameter}</Table.RowHeaderCell>
                  <Table.Cell>{d.value}</Table.Cell>
                  <Table.Cell>{d.reference_range}</Table.Cell>
                  <Table.Cell>
                    {d.is_abnormal ? (
                      <Badge color="red">Abnormal</Badge>
                    ) : (
                      <Badge>Normal</Badge>
                    )}
                  </Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table.Root>
        <Flex justify={"end"} mt={"4"} gap={"4"} align={"center"}>
          <PrintLabResult
            recordedBy={`${results_data?.profile?.first_name} ${results_data?.profile?.middle_name ?? ""} ${results_data?.profile?.last_name}`}
            dateOfBirth={dateOfBirth}
            gender={gender}
            patient={patient}
            requestDate={requestDate}
            requestingDoctor={requestingDoctor}
            results={results}
          />
          <UpdateLabResultsForm
            id={results_data?.id as string}
            request_id={results_data?.request_id as string}
            results={results_data?.results as Json}
            created_by={results_data?.created_by as string}
          />
          <DeleteActionForm
            id={`${results_data?.id}`}
            inValidate="results"
            title="Delete Lab Result"
            warning="Are you sure? this result type parameter will be parmanently deleted from the
          database."
            actionFn={() => deleteLabResultAction(`${results_data?.id}`)}
          />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export function LabRequestCompletedCard() {
  const { data: request_data, isPending: isRequestPending } = useRequestQuery();

  const lab_request_completed = useMemo(
    () => request_data?.request_data?.filter((a) => a.is_completed && a.is_lab),
    [request_data?.request_data]
  );

  return isRequestPending ? (
    <Spinner />
  ) : lab_request_completed?.length === 0 ? (
    <NoResultFound />
  ) : (
    <div className="w-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {lab_request_completed?.map((a) => (
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
                  <Table.Root variant="surface">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeaderCell>Test</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Note</Table.ColumnHeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {JSON.parse(JSON.stringify(a.services)).map(
                        (d: { note: string; service: { name: string } }) => (
                          <Table.Row>
                            <Table.RowHeaderCell>
                              {d.service.name}
                            </Table.RowHeaderCell>
                            <Table.Cell>{d.note}</Table.Cell>
                          </Table.Row>
                        )
                      )}
                    </Table.Body>
                  </Table.Root>

                  <Flex justify={"end"} mt={"4"}>
                    <PrintLabRequests
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
    </div>
  );
}

export function PatientLabRequestCard({ patientId }: { patientId: string }) {
  const { isRequestPending, request_data } = useRequestById({ patientId });

  const lab_request = useMemo(
    () => request_data?.filter((a) => a.is_lab),
    [request_data]
  );

  return isRequestPending ? (
    <Spinner />
  ) : lab_request?.length === 0 ? (
    <NoResultFound />
  ) : (
    <div className="w-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {lab_request?.map((a) => (
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
                  <Table.Root variant="surface">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeaderCell>Test</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Note</Table.ColumnHeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {JSON.parse(JSON.stringify(a.services)).map(
                        (d: { note: string; service: { name: string } }) => (
                          <Table.Row>
                            <Table.RowHeaderCell>
                              {d.service.name}
                            </Table.RowHeaderCell>
                            <Table.Cell>{d.note}</Table.Cell>
                          </Table.Row>
                        )
                      )}
                    </Table.Body>
                  </Table.Root>
                  <Flex justify={"end"} mt={"4"}>
                    <PrintLabRequests
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
    </div>
  );
}
