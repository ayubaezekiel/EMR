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
  TextField,
} from "@radix-ui/themes";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye, FileQuestion, Printer, X } from "lucide-react";
import { useMemo, useState } from "react";
import { changeRequestStatus } from "../../actions/actions";
import { ConfirmRequestStatusUpdate } from "../../forms/requests/ConfirmRequestStatusUpdate";
import { NoResultFound } from "../NoResultFound";
import { PatientCardHeader } from "../PatientCardHeader";
import { request_columns, RequestTypes } from "./shared";

export function AntenatalRequestWaitingCard() {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: request_data, isPending: isRequestPending } = useRequestQuery();

  const antenatal_request_waiting: RequestTypes[] =
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
            taken_by: `${a.profile?.first_name} ${a.profile?.middle_name ?? ""} ${a.profile?.last_name}`,
          }))
          .filter((a) => a.is_waiting && a.is_antenatal),
      [request_data?.request_data]
    ) ?? [];

  const table = useReactTable({
    data: antenatal_request_waiting,
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

              <Flex
                direction={"row"}
                justify={"between"}
                mt={"4"}
                height={"100px"}
              >
                <Badge>
                  {JSON.parse(JSON.stringify(row.original.services)).package}
                </Badge>
                <Badge>
                  Expected Delivary Date:{" "}
                  <Text color="red">
                    {format(
                      JSON.parse(JSON.stringify(row.original.services))
                        .expected_delivary_date,
                      "LLLL dd, yyyy"
                    )}
                  </Text>
                </Badge>
              </Flex>
              <Flex justify={"between"} mt={"4"}>
                <ConfirmRequestStatusUpdate
                  inValidate="requests"
                  id={row.original.id}
                  title="Move To Active?"
                  triggleLabel="Active"
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
                  warning="Are you sure you want to mark this antenatal request as completed?"
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
                    <Card my={"4"}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: JSON.parse(
                            JSON.stringify(row.original.services)
                          ).note,
                        }}
                      />
                    </Card>
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

export function AntenatalRequestCompletedCard() {
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: request_data, isPending: isRequestPending } = useRequestQuery();

  const antenatal_request_waiting: RequestTypes[] =
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
            taken_by: `${a.profile?.first_name} ${a.profile?.middle_name ?? ""} ${a.profile?.last_name}`,
          }))
          .filter((a) => a.is_completed && a.is_antenatal),
      [request_data?.request_data]
    ) ?? [];

  const table = useReactTable({
    data: antenatal_request_waiting,
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

              <Flex
                direction={"row"}
                justify={"between"}
                mt={"4"}
                height={"100px"}
              >
                <Badge>
                  {JSON.parse(JSON.stringify(row.original.services)).package}
                </Badge>
                <Badge>
                  Expected Delivary Date:{" "}
                  <Text color="red">
                    {format(
                      JSON.parse(JSON.stringify(row.original.services))
                        .expected_delivary_date,
                      "LLLL dd, yyyy"
                    )}
                  </Text>
                </Badge>
              </Flex>
              <Flex justify={"between"} mt={"4"}>
                <ConfirmRequestStatusUpdate
                  inValidate="requests"
                  id={row.original.id}
                  title="Move To Active?"
                  triggleLabel="Active"
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
                  warning="Are you sure you want to mark this antenatal request as completed?"
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
                    <Card my={"4"}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: JSON.parse(
                            JSON.stringify(row.original.services)
                          ).note,
                        }}
                      />
                    </Card>
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
