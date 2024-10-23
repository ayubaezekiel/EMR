import { useConsultationQuery } from "@/actions/queries";
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
import { Link } from "@tanstack/react-router";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FileQuestion, Printer, X } from "lucide-react";
import { useMemo, useState } from "react";
import { PatientCardHeader } from "../PatientCardHeader";
import {
  admission_consultation_columns,
  ConsultationAdmissionTypes,
} from "./shared";
import { NoResultFound } from "../NoResultFound";

export function ConsultationRequestWaitingCard() {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: request_data, isPending: isRequestPending } =
    useConsultationQuery();

  const consultation_request_waiting: ConsultationAdmissionTypes[] =
    useMemo(
      () =>
        request_data?.consultation_data
          ?.map((a) => ({
            created_at: a.created_at as string,
            id: a.id,
            note: a.note as string,
            ward_name: a.admissions?.wards?.name as string,
            bed_name: a.admissions?.beds?.name as string,
            patients_id: a.admissions?.patient_id as string,
            is_completed: a.is_completed as boolean,
            admission_id: a.admission_id as string,
            first_name: a.admissions?.patients?.first_name as string,
            middle_name: a.admissions?.patients?.middle_name as string,
            last_name: a.admissions?.patients?.last_name as string,
            create_by: `${a.profile?.first_name} ${a.profile?.middle_name ?? ""} ${a.profile?.last_name}`,
          }))
          .filter((a) => !a.is_completed),
      [request_data?.consultation_data]
    ) ?? [];

  const table = useReactTable({
    data: consultation_request_waiting,
    columns: admission_consultation_columns,
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
                  <Badge>{row.getValue("ward_name")}</Badge>
                  <Badge>{row.getValue("bed_name")}</Badge>
                </div>
              </Flex>
              <Flex justify={"between"} mt={"4"}>
                <Link
                  to={`/dashboard/appointments/${row.original.patients_id}`}
                  search={{
                    admission: true,
                    consultationId: row.original.id,
                    completed: row.original.is_completed,
                  }}
                >
                  <Button size={"3"} radius="full" variant="soft">
                    Attend
                  </Button>
                </Link>
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
                    <Card>{row.getValue("note")}</Card>
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

export function ConsultationRequestCompletedCard() {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: request_data, isPending: isRequestPending } =
    useConsultationQuery();

  const consultation_request_completed: ConsultationAdmissionTypes[] =
    useMemo(
      () =>
        request_data?.consultation_data
          ?.map((a) => ({
            created_at: a.created_at as string,
            id: a.id,
            note: a.note as string,
            ward_name: a.admissions?.wards?.name as string,
            bed_name: a.admissions?.beds?.name as string,
            patients_id: a.admissions?.patient_id as string,
            is_completed: a.is_completed as boolean,
            admission_id: a.admission_id as string,
            first_name: a.admissions?.patients?.first_name as string,
            middle_name: a.admissions?.patients?.middle_name as string,
            last_name: a.admissions?.patients?.last_name as string,
            create_by: `${a.profile?.first_name} ${a.profile?.middle_name ?? ""} ${a.profile?.last_name}`,
          }))
          .filter((a) => a.is_completed),
      [request_data?.consultation_data]
    ) ?? [];

  const table = useReactTable({
    data: consultation_request_completed,
    columns: admission_consultation_columns,
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
                  <Badge>{row.getValue("ward_name")}</Badge>
                  <Badge>{row.getValue("bed_name")}</Badge>
                </div>
              </Flex>
              <Flex justify={"between"} mt={"4"}>
                <Button disabled size={"3"} radius="full" variant="soft">
                  Attend
                </Button>

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
                    <Card>{row.getValue("note")}</Card>
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

export function PatientConsultationRequestCard({
  patientId,
}: {
  patientId: string;
}) {
  const { request_data, isRequestPending } = useRequestById({ patientId });

  const consultation_request_completed = useMemo(
    () => request_data?.filter((a) => a.is_procedure),
    [request_data]
  );

  return isRequestPending ? (
    <Spinner />
  ) : consultation_request_completed?.length === 0 ? (
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
      {consultation_request_completed?.map((a) => (
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
                <Flex justify={"end"} mt={"2"}>
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
  );
}
