import { useAppointmentsQuery } from "@/actions/queries";
import { CreatePatientVitalsForm } from "@/forms/consultation/PatientVitalsForm";
import {
  Badge,
  Button,
  Card,
  Dialog,
  Flex,
  SegmentedControl,
  Spinner,
  Strong,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { changeAppointmentStatus } from "../../actions/actions";
import { NoResultFound } from "../NoResultFound";
import { PatientCardHeader } from "../PatientCardHeader";
import { PatientHistory } from "../consultation/HistoryTaking";
import { PatientVitals } from "../consultation/PatientVitals";
import { ConfirmAppointmentUpdate } from "./ConfirmAppointmentUpdate";
import { appointment_columns, AppointmentCardType } from "./shared";

export function AppointmentWaiting() {
  const queryClient = useQueryClient();
  const [globalFilter, setGlobalFilter] = useState("");
  const [segment, setSegment] = useState("vitals");

  const { data: appointments, isPending: isAppointmentPending } =
    useAppointmentsQuery();

  const appointment_data_waiting: AppointmentCardType[] =
    useMemo(
      () =>
        appointments?.appointment_data
          ?.map((d) => ({
            id: d.id,
            is_missed: d.is_missed as boolean,
            is_waiting: d.is_waiting as boolean,
            is_completed: d.is_completed as boolean,
            is_checkedin: d.is_checkedin as boolean,
            created_at: d.created_at as string,
            duration: d.duration as string,
            appointment_types: d.appointment_types?.name as string,
            patients_id: d.patients_id as string,
            clinics_name: d.clinics?.name as string,
            first_name: d.patients?.first_name as string,
            middle_name: d.patients?.middle_name as string,
            last_name: d.patients?.last_name as string,
          }))
          .filter((a) => {
            return a.is_waiting;
          }),
      [appointments?.appointment_data]
    ) ?? [];

  const table = useReactTable({
    data: appointment_data_waiting,
    columns: appointment_columns,
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
      {isAppointmentPending ? (
        <Spinner />
      ) : appointment_data_waiting?.length === 0 ? (
        <NoResultFound />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {table.getRowModel().rows.map((row) => (
            <Card key={row.id}>
              <PatientCardHeader
                createdAt={`${row.original.created_at}`}
                firstName={row.getValue("first_name") as string}
                lastName={row.getValue("last_name") as string}
                patientId={row.getValue("patients_id") as string}
                middleName={row.getValue("middle_name") as string}
              />

              <Flex direction={"column"} mt={"4"}>
                <Flex gap={"2"} mb={"4"} direction={"column"} justify={"end"}>
                  <div>
                    <Badge radius="full">
                      From:{" "}
                      {row.getValue("duration")
                        ? format(
                            `${row.getValue("duration")}`.slice(2, 20),
                            "LLL MM yyy, HH:mm a"
                          )
                        : "No date"}
                    </Badge>
                  </div>
                  <div>
                    <Badge radius="full" color="red">
                      To:{" "}
                      {row.getValue("duration")
                        ? format(
                            `${row.getValue("duration")}`.slice(24, 43),
                            "LLL MM yyy, HH:mm a"
                          )
                        : "No date"}
                    </Badge>
                  </div>
                </Flex>
                <Strong>
                  {`${row.getValue("appointment_types")}`.toUpperCase()}
                </Strong>
                <Flex gap={"2"} justify={"between"} align={"center"}>
                  <Text>{row.getValue("clinics_name")}</Text>
                  <div className="flex gap-2">
                    {row.original.is_waiting && (
                      <Badge color="amber">
                        waiting
                        <span className="p-1 bg-[var(--accent-9)] rounded-full animate-pulse" />
                      </Badge>
                    )}
                    {row.original.is_missed && (
                      <Badge color="red">
                        missed
                        <span className="p-1 bg-[var(--accent-9)] rounded-full animate-pulse" />
                      </Badge>
                    )}
                    {row.original.is_checkedin && (
                      <Badge color="blue">
                        checked in{" "}
                        <span className="p-1 bg-[var(--accent-9)] rounded-full animate-pulse" />
                      </Badge>
                    )}

                    {row.original.is_completed && (
                      <Badge>
                        completed
                        <span className="p-1 bg-[var(--accent-9)] rounded-full animate-pulse" />
                      </Badge>
                    )}
                  </div>
                </Flex>
              </Flex>
              <Flex justify={"between"} mt={"4"}>
                <CreatePatientVitalsForm patientId={row.original.patients_id} />
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Button
                      variant="soft"
                      radius="full"
                      loading={isAppointmentPending}
                    >
                      Nursing Records
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Content maxWidth={"80rem"}>
                    <Dialog.Title>Nursing</Dialog.Title>
                    <Dialog.Description size={"1"}>
                      Here are all the recorded patient vital signs
                    </Dialog.Description>
                    <SegmentedControl.Root
                      mt={"4"}
                      defaultValue={segment}
                      onValueChange={setSegment}
                    >
                      <SegmentedControl.Item value="vitals">
                        Vital Signs
                      </SegmentedControl.Item>
                      <SegmentedControl.Item value="history">
                        History Taking
                      </SegmentedControl.Item>
                    </SegmentedControl.Root>
                    {segment === "vitals" && (
                      <PatientVitals patientId={row.original.patients_id} />
                    )}
                    {segment === "history" && (
                      <PatientHistory patientId={row.original.patients_id} />
                    )}
                  </Dialog.Content>
                </Dialog.Root>
                <ConfirmAppointmentUpdate
                  id={row.original.id}
                  title="Mark As Missed?"
                  triggleLabel="Missed"
                  disabled={row.original.is_missed!}
                  warning="Are you sure you want to mark this appointment as missed?"
                  actionFn={async () => {
                    await changeAppointmentStatus({
                      id: row.original.id,
                      isMissed: true,
                      isWaiting: false,
                      isCheckedIn: false,
                      isCompleted: false,
                    });
                    queryClient.invalidateQueries({
                      queryKey: ["appointments"],
                    });
                  }}
                />
                <ConfirmAppointmentUpdate
                  id={row.original.id}
                  title="Has Checked In?"
                  triggleLabel="Checked In"
                  disabled={row.original.is_checkedin!}
                  warning="Are you sure this patient has checked in?"
                  actionFn={async () => {
                    await changeAppointmentStatus({
                      id: row.original.id,
                      isCheckedIn: true,
                      isWaiting: false,
                      isCompleted: false,
                      isMissed: false,
                    });
                    queryClient.invalidateQueries({
                      queryKey: ["appointments"],
                    });
                  }}
                />

                <Button
                  asChild
                  disabled={!row.original.is_checkedin}
                  size={"2"}
                  radius="full"
                >
                  Attend
                </Button>
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
