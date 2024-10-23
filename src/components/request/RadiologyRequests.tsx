import { DeleteActionForm } from "@/actions/DeleteAction";
import { useRequestQuery } from "@/actions/queries";
import {
  CreateRadiologyResultsForm,
  UpdateRadiologyResultsForm,
} from "@/forms/requests/results/RadiologyResults";
import { useRadiologyResults, useRequestById } from "@/lib/hooks";
import {
  Badge,
  Button,
  Card,
  Dialog,
  Flex,
  IconButton,
  Spinner,
} from "@radix-ui/themes";
import { Eye, X } from "lucide-react";
import { useMemo } from "react";
import {
  changeRequestStatus,
  deleteRadiologyResultAction,
} from "../../actions/actions";
import { ConfirmRequestStatusUpdate } from "../../forms/requests/ConfirmRequestStatusUpdate";
import { NoResultFound } from "../NoResultFound";
import { PatientCardHeader } from "../PatientCardHeader";
import PrintRadiologyRequests from "./pdfs/RadiologyRequestPdf";
import PrintRadiologyResult from "./pdfs/RadiologyResultsPdf";

export function RadiologyCardWaiting() {
  const { data: request_data, isPending: isRequestPending } = useRequestQuery();

  const radiology_request_waiting = useMemo(
    () =>
      request_data?.request_data?.filter((a) => a.is_waiting && a.is_radiology),
    [request_data?.request_data]
  );

  return isRequestPending ? (
    <Spinner />
  ) : (
    <div className="w-full">
      {radiology_request_waiting?.length === 0 ? (
        <NoResultFound />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {radiology_request_waiting?.map((a) => (
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
                  title="Mark As Complete?"
                  triggleLabel="Complete"
                  disabled={Boolean(a.is_completed)}
                  warning="Are you sure you want to mark this radiology request as completed?"
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
                      <PrintRadiologyRequests
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

                <CreateRadiologyResultsForm requestId={a.id} />
                <ViewRadiologyResults
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
      )}
    </div>
  );
}

export const RadiologyCardCompleted = () => {
  const { data: request_data, isPending: isRequestPending } = useRequestQuery();

  const radiology_request_completed = useMemo(
    () =>
      request_data?.request_data?.filter(
        (a) => a.is_completed && a.is_radiology
      ),
    [request_data?.request_data]
  );

  return isRequestPending ? (
    <Spinner />
  ) : radiology_request_completed?.length === 0 ? (
    <NoResultFound />
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {radiology_request_completed?.map((a) => (
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
              disabled={Boolean(a.is_waiting)}
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
              title="Mark As Complete?"
              triggleLabel="Complete"
              disabled={Boolean(a.is_completed)}
              warning="Are you sure you want to mark this radiology request as completed?"
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
                  <PrintRadiologyRequests
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
            <ViewRadiologyResults
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
};

export function PatientRadiologyCard({ patientId }: { patientId: string }) {
  const { request_data, isRequestPending } = useRequestById({ patientId });

  const radiology_data_filtered = useMemo(
    () => request_data?.filter((a) => a.is_radiology),
    [request_data]
  );

  return isRequestPending ? (
    <Spinner />
  ) : (
    <div className="w-full">
      {radiology_data_filtered?.length === 0 ? (
        <NoResultFound />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {radiology_data_filtered?.map((a) => (
            <Card key={a.id}>
              <Flex justify={"between"}>
                <PatientCardHeader
                  firstName={a.patients?.first_name as string}
                  lastName={a.patients?.last_name as string}
                  patientId={a.patients_id}
                  middleName={a.patients?.middle_name as string}
                />
              </Flex>

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
                    {JSON.parse(JSON.stringify(a.services)).map(
                      (d: { note: string; service: { name: string } }) => (
                        <Card my={"4"} key={d.note}>
                          <Badge mb={"2"}>{d.service.name}</Badge>{" "}
                          <Card>{d.note}</Card>
                        </Card>
                      )
                    )}

                    <Flex justify={"end"} mt={"4"}>
                      <PrintRadiologyRequests
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
      )}
    </div>
  );
}

const ViewRadiologyResults = ({
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
  const { isResultsPending, results_data } = useRadiologyResults(requestId);

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
          <Dialog.Title>Results</Dialog.Title>
          <Dialog.Close>
            <IconButton variant="ghost">
              <X />
            </IconButton>
          </Dialog.Close>
        </div>
        <UpdateRadiologyResultsForm
          created_by={results_data?.created_by as string}
          id={results_data?.id as string}
          request_id={results_data?.request_id as string}
          results={results_data?.results as string}
        />
        <Flex justify={"end"} mt={"4"} gap={"4"} align={"center"}>
          <PrintRadiologyResult
            recordedBy={`${results_data?.profile?.first_name} ${results_data?.profile?.middle_name ?? ""} ${results_data?.profile?.last_name}`}
            dateOfBirth={dateOfBirth}
            gender={gender}
            patient={patient}
            requestDate={requestDate}
            requestingDoctor={requestingDoctor}
            results={results_data?.results as string}
          />

          <DeleteActionForm
            id={`${results_data?.id}`}
            inValidate="results"
            title="Delete Radiology Result"
            warning="Are you sure? this result type parameter will be parmanently deleted from the
          database."
            actionFn={() => deleteRadiologyResultAction(`${results_data?.id}`)}
          />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
