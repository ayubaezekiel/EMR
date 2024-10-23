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
  Text,
  TextField,
} from "@radix-ui/themes";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, X } from "lucide-react";
import { useMemo, useState } from "react";
import { changeRequestStatus } from "../../actions/actions";
import { ConfirmRequestStatusUpdate } from "../../forms/requests/ConfirmRequestStatusUpdate";
import { NoResultFound } from "../NoResultFound";
import { PatientCardHeader } from "../PatientCardHeader";
import PrintConsumableRequests from "./pdfs/PharmacyRequestPdf";
import { request_columns, RequestTypes } from "./shared";

export function ConsumableRequestWaitingCard() {
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: request_data, isPending: isRequestPending } = useRequestQuery();

  const consumable_request_waiting: RequestTypes[] =
    useMemo(
      () =>
        request_data?.request_data
          ?.map((a) => ({
            created_at: a.created_at,
            id: a.id,
            is_antenatal: a.is_antenatal as boolean,
            is_approved: a.is_approved as boolean,
            is_completed: a.is_completed as boolean,
            is_consumable: a.is_consumable as boolean,
            is_lab: a.is_lab as boolean,
            is_pharm: a.is_pharm as boolean,
            is_procedure: a.is_procedure as boolean,
            is_radiology: a.is_radiology as boolean,
            is_waiting: a.is_waiting as boolean,
            patients_id: a.patients_id as string,
            first_name: a.patients?.first_name as string,
            middle_name: a.patients?.middle_name as string,
            last_name: a.patients?.last_name as string,
            services: a.services as string,
            gender: a.patients?.gender as string,
            dob: a.patients?.dob as string,
            taken_by: `${a.profile?.first_name} ${a.profile?.middle_name ?? ""} ${a.profile?.last_name}`,
          }))
          .filter((a) => a.is_waiting && a.is_consumable),
      [request_data?.request_data]
    ) ?? [];

  const table = useReactTable({
    data: consumable_request_waiting,
    columns: request_columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <>
      <div className="mb-4">
        <TextField.Root
          placeholder="Search all fields..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>
      {isRequestPending ? (
        <Spinner />
      ) : table.getRowModel().rows.length === 0 ? (
        <NoResultFound />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {table.getRowModel().rows.map((row) => (
            <Card key={row.id}>
              <PatientCardHeader
                firstName={row.getValue("first_name") as string}
                lastName={row.getValue("last_name") as string}
                patientId={row.getValue("patients_id") as string}
                middleName={row.getValue("middle_name") as string}
              />

              <Flex direction={"column"} mt={"4"} height={"100px"}>
                <div className="flex flex-wrap gap-2 mt-4">
                  {JSON.parse(JSON.stringify(row.original.services)).map(
                    (d: { note: string; consumable: { name: string } }) => (
                      <Badge key={d.note}>{d.consumable.name}</Badge>
                    )
                  )}
                </div>
              </Flex>
              <Flex justify={"between"} mt={"4"}>
                <ConfirmRequestStatusUpdate
                  inValidate="requests"
                  id={row.original.id}
                  title="Move To Waiting?"
                  triggleLabel="Waiting"
                  disabled={row.original.is_waiting!}
                  warning="Are you sure you want to move this request to waiting?"
                  actionFn={async () => {
                    await changeRequestStatus({
                      id: row.original.id,
                      isWaiting: true,
                      isCompleted: false,
                    });
                  }}
                />
                <ConfirmRequestStatusUpdate
                  inValidate="requests"
                  id={row.original.id}
                  title="Mark As Completed?"
                  triggleLabel="Complete"
                  disabled={row.original.is_completed!}
                  warning="Are you sure you want to mark this consumable request as completed?"
                  actionFn={async () => {
                    await changeRequestStatus({
                      id: row.original.id,
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
                    {JSON.parse(JSON.stringify(row.original.services)).map(
                      (d: { note: string; consumable: { name: string } }) => (
                        <Card my={"4"} key={d.note}>
                          <Badge mb={"2"}>{d.consumable.name}</Badge>{" "}
                          <Card>{d.note}</Card>
                        </Card>
                      )
                    )}

                    <Flex justify={"end"} mt={"4"}>
                      <PrintConsumableRequests
                        dateOfBirth={`${new Date(row.getValue("created_at") as string).toDateString()}`}
                        gender={row.getValue("gender")}
                        patient={`${row.getValue("first_name")} ${row.getValue("middle_name") ?? ""} ${row.getValue("last_name")} [${row.original.patients_id.slice(0, 8).toUpperCase()}]`}
                        requestDate={row.getValue("ceated_at")}
                        requestingDoctor={row.getValue("taken_by")}
                        requests={JSON.parse(
                          JSON.stringify(row.original.services)
                        ).map(
                          (s: {
                            note: string;
                            consumable: { name: string };
                          }) => ({
                            name: s.consumable.name,
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <Text size={"1"}>Page</Text>
          <TextField.Root
            className="w-16"
            type="number"
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
          <Text size={"1"}>of {table.getPageCount()}</Text>
        </div>
        <div className="space-x-2">
          <Button
            variant="soft"
            size="1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="soft"
            size="1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export function ConsumableRequestCompletedCard() {
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: request_data, isPending: isRequestPending } = useRequestQuery();

  const consumable_request_waiting: RequestTypes[] =
    useMemo(
      () =>
        request_data?.request_data
          ?.map((a) => ({
            created_at: a.created_at,
            id: a.id,
            is_antenatal: a.is_antenatal as boolean,
            is_approved: a.is_approved as boolean,
            is_completed: a.is_completed as boolean,
            is_consumable: a.is_consumable as boolean,
            is_lab: a.is_lab as boolean,
            is_pharm: a.is_pharm as boolean,
            is_procedure: a.is_procedure as boolean,
            is_radiology: a.is_radiology as boolean,
            is_waiting: a.is_waiting as boolean,
            patients_id: a.patients_id as string,
            first_name: a.patients?.first_name as string,
            middle_name: a.patients?.middle_name as string,
            last_name: a.patients?.last_name as string,
            services: a.services as string,
            gender: a.patients?.gender as string,
            dob: a.patients?.dob as string,
            taken_by: `${a.profile?.first_name} ${a.profile?.middle_name ?? ""} ${a.profile?.last_name}`,
          }))
          .filter((a) => a.is_completed && a.is_consumable),
      [request_data?.request_data]
    ) ?? [];

  const table = useReactTable({
    data: consumable_request_waiting,
    columns: request_columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <>
      <div className="mb-4">
        <TextField.Root
          placeholder="Search all fields..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>
      {isRequestPending ? (
        <Spinner />
      ) : table.getRowModel().rows.length === 0 ? (
        <NoResultFound />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {table.getRowModel().rows.map((row) => (
            <Card key={row.id}>
              <PatientCardHeader
                firstName={row.getValue("first_name") as string}
                lastName={row.getValue("last_name") as string}
                patientId={row.getValue("patients_id") as string}
                middleName={row.getValue("middle_name") as string}
              />

              <Flex direction={"column"} mt={"4"} height={"100px"}>
                <div className="flex flex-wrap gap-2 mt-4">
                  {JSON.parse(JSON.stringify(row.original.services)).map(
                    (d: { note: string; consumable: { name: string } }) => (
                      <Badge key={d.note}>{d.consumable.name}</Badge>
                    )
                  )}
                </div>
              </Flex>
              <Flex justify={"between"} mt={"4"}>
                <ConfirmRequestStatusUpdate
                  inValidate="requests"
                  id={row.original.id}
                  title="Move To Waiting?"
                  triggleLabel="Waiting"
                  disabled={true}
                  warning="Are you sure you want to move this request to waiting?"
                  actionFn={async () => {
                    await changeRequestStatus({
                      id: row.original.id,
                      isWaiting: true,
                      isCompleted: false,
                    });
                  }}
                />
                <ConfirmRequestStatusUpdate
                  inValidate="requests"
                  id={row.original.id}
                  title="Mark As Completed?"
                  triggleLabel="Complete"
                  disabled={row.original.is_completed!}
                  warning="Are you sure you want to mark this consumable request as completed?"
                  actionFn={async () => {
                    await changeRequestStatus({
                      id: row.original.id,
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
                    {JSON.parse(JSON.stringify(row.original.services)).map(
                      (d: { note: string; consumable: { name: string } }) => (
                        <Card my={"4"} key={d.note}>
                          <Badge mb={"2"}>{d.consumable.name}</Badge>{" "}
                          <Card>{d.note}</Card>
                        </Card>
                      )
                    )}

                    <Flex justify={"end"} mt={"4"}>
                      <PrintConsumableRequests
                        dateOfBirth={`${new Date(row.getValue("created_at") as string).toDateString()}`}
                        gender={row.getValue("gender")}
                        patient={`${row.getValue("first_name")} ${row.getValue("middle_name") ?? ""} ${row.getValue("last_name")} [${row.original.patients_id.slice(0, 8).toUpperCase()}]`}
                        requestDate={row.getValue("ceated_at")}
                        requestingDoctor={row.getValue("taken_by")}
                        requests={JSON.parse(
                          JSON.stringify(row.original.services)
                        ).map(
                          (s: {
                            note: string;
                            consumable: { name: string };
                          }) => ({
                            name: s.consumable.name,
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <Text size={"1"}>Page</Text>
          <TextField.Root
            className="w-16"
            type="number"
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
          <Text size={"1"}>of {table.getPageCount()}</Text>
        </div>
        <div className="space-x-2">
          <Button
            variant="soft"
            size="1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="soft"
            size="1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export function PatientConsumableRequestCard({
  patientId,
}: {
  patientId: string;
}) {
  const { request_data, isRequestPending } = useRequestById({ patientId });

  const consumable_data_filtered = useMemo(
    () => request_data?.filter((a) => a.is_consumable),
    [request_data]
  );

  return isRequestPending ? (
    <Spinner />
  ) : consumable_data_filtered?.length === 0 ? (
    <NoResultFound />
  ) : (
    <div className="w-full">
      {consumable_data_filtered?.length === 0 ? (
        <NoResultFound />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {consumable_data_filtered?.map((a) => (
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
                    (d: {
                      note: string;
                      consumable: { name: string; amount: string };
                    }) => (
                      <Badge key={d.note}>{d.consumable.name}</Badge>
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
                      (d: {
                        note: string;
                        quantity: string;
                        consumable: { name: string; amount: string };
                      }) => (
                        <Card my={"4"} key={d.note}>
                          <Flex gap={"2"}>
                            <Badge>{d.consumable.name}</Badge>
                            <Badge>Qauntity: {d.quantity}</Badge>
                          </Flex>

                          <Card mt={"2"}>{d.note}</Card>
                        </Card>
                      )
                    )}

                    <Flex justify={"end"} mt={"4"}>
                      <PrintConsumableRequests
                        dateOfBirth={`${new Date(a.patients?.dob as string).toDateString()}`}
                        gender={`${a.patients?.gender}`}
                        patient={`${a.patients?.first_name} ${a.patients?.middle_name ?? ""} ${a.patients?.last_name} [${a.patients_id.slice(0, 8).toUpperCase()}]`}
                        requestDate={`${new Date(a.patients?.created_at as string).toDateString()}`}
                        requestingDoctor={`${a.profile?.first_name} ${a.profile?.middle_name ?? ""} ${a.profile?.last_name}`}
                        requests={JSON.parse(JSON.stringify(a.services)).map(
                          (s: {
                            note: string;
                            consumable: { name: string };
                          }) => ({
                            name: s.consumable.name,
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
