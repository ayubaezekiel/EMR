import { useAdmissionsQuery } from "@/actions/queries";
import {
  Badge,
  Button,
  Card,
  Flex,
  Inset,
  Separator,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { endOfDay, format } from "date-fns";
import { ArrowRightCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { changeAdmissionStatus } from "../../actions/actions";
import { ConfirmAdmissionUpdate } from "../../forms/requests/ConfirmAdmissionUpdate";
import { NoResultFound } from "../NoResultFound";
import { PatientCardHeader } from "../PatientCardHeader";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { admission_columns, AdmissionTypes } from "./shared";

export function AdmissionActiveCard() {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: admission_data, isPending: isAdmissionPending } =
    useAdmissionsQuery();
  const queryClient = useQueryClient();
  const admission_data_filtered: AdmissionTypes[] =
    useMemo(
      () =>
        admission_data?.admissions_data
          ?.map((d) => ({
            id: d.id,
            is_active: d.is_active as boolean,
            is_approved: d.is_approved as boolean,
            is_critical: d.is_critical as boolean,
            is_discharged: d.is_discharged as boolean,
            created_at: d.created_at as string,
            beds: d.beds?.name as string,
            wards: d.wards?.name as string,
            patients_id: d.patient_id as string,
            admitted_by: `${d.profile?.first_name} ${d.profile?.middle_name ?? ""} ${d.profile?.last_name}`,
            first_name: d.patients?.first_name as string,
            middle_name: d.patients?.middle_name as string,
            last_name: d.patients?.last_name as string,
            discharge_date: d.dischard_date as string,
          }))
          .filter((a) => a.is_approved && a.is_active),
      [admission_data?.admissions_data]
    ) ?? [];

  const table = useReactTable({
    data: admission_data_filtered,
    columns: admission_columns,
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
      {isAdmissionPending ? (
        <Spinner />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {table.getRowModel().rows.length === 0 ? (
            <NoResultFound />
          ) : (
            table.getRowModel().rows.map((row) => (
              <Card key={row.id}>
                <PatientCardHeader
                  firstName={row.getValue("first_name") as string}
                  lastName={row.getValue("last_name") as string}
                  patientId={row.getValue("patients_id") as string}
                  middleName={row.getValue("middle_name") as string}
                />

                <Flex my={"4"} justify={"between"}>
                  <div className="flex flex-wrap gap-2">
                    <Badge>{row.getValue("beds")}</Badge>
                    <Badge>{row.getValue("wards")}</Badge>
                  </div>
                  {row.original.is_critical && (
                    <Badge radius="full" color="red">
                      critical
                    </Badge>
                  )}
                </Flex>
                <Flex align={"center"} gap={"2"} justify={"between"}>
                  Addmitted By : <Badge>{row.getValue("admitted_by")}</Badge>
                </Flex>
                <Flex justify={"between"}>
                  <Text>Discharge Date:</Text>
                  <Flex gap={"2"}>
                    <Badge size={"3"} radius="full">
                      {format(
                        row.original.discharge_date,
                        "LLL MM yyy, HH:mm a"
                      )}
                    </Badge>
                    <Badge color="red" size={"3"} radius="full">
                      {endOfDay(row.original.discharge_date) < new Date()
                        ? "Due"
                        : "Not Due"}
                    </Badge>
                  </Flex>
                </Flex>
                <Inset mt={"6"}>
                  <Separator size={"4"} />
                </Inset>
                <Flex align={"center"} mt={"5"} justify={"between"}>
                  <Button asChild variant="soft" radius="full">
                    <Link
                      to={`/dashboard/admissions/${row.getValue("patients_id")}`}
                    >
                      <ArrowRightCircle />
                    </Link>
                  </Button>
                  <Flex gap={"4"}>
                    <ConfirmAdmissionUpdate
                      inValidate="admissions"
                      id={row.id}
                      title="Move To Active?"
                      triggleLabel="Active"
                      disabled={row.original.is_active}
                      warning="Are you sure you want to move this request to waiting?"
                      actionFn={async () => {
                        await changeAdmissionStatus({
                          id: row.original.id,
                          isActive: true,
                          isDischarged: false,
                        });
                        queryClient.invalidateQueries({
                          queryKey: ["admissions"],
                        });
                      }}
                    />

                    <ConfirmAdmissionUpdate
                      inValidate="admissions"
                      id={row.original.id}
                      title="Dischard Patient?"
                      triggleLabel="Discharge"
                      disabled={row.original.is_discharged!}
                      warning="Are you sure you want to discharge this discharge as patient?"
                      actionFn={async () => {
                        await changeAdmissionStatus({
                          id: row.original.id,
                          isActive: false,
                          isDischarged: true,
                        });
                        queryClient.invalidateQueries({
                          queryKey: ["admissions"],
                        });
                      }}
                    />
                  </Flex>
                </Flex>
              </Card>
            ))
          )}
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

export function AdmissionDischargedCard() {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: admission_data, isPending: isAdmissionPending } =
    useAdmissionsQuery();
  const queryClient = useQueryClient();
  const admission_data_filtered: AdmissionTypes[] =
    useMemo(
      () =>
        admission_data?.admissions_data
          ?.map((d) => ({
            id: d.id,
            is_active: d.is_active as boolean,
            is_approved: d.is_approved as boolean,
            is_critical: d.is_critical as boolean,
            is_discharged: d.is_discharged as boolean,
            created_at: d.created_at as string,
            beds: d.beds?.name as string,
            wards: d.wards?.name as string,
            patients_id: d.patient_id as string,
            admitted_by: `${d.profile?.first_name} ${d.profile?.middle_name ?? ""} ${d.profile?.last_name}`,
            first_name: d.patients?.first_name as string,
            middle_name: d.patients?.middle_name as string,
            last_name: d.patients?.last_name as string,
            discharge_date: d.dischard_date as string,
          }))
          .filter((a) => a.is_discharged),
      [admission_data?.admissions_data]
    ) ?? [];

  const table = useReactTable({
    data: admission_data_filtered,
    columns: admission_columns,
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
      {isAdmissionPending ? (
        <Spinner />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {table.getRowModel().rows.length === 0 ? (
            <NoResultFound />
          ) : (
            table.getRowModel().rows.map((row) => (
              <Card key={row.id}>
                <PatientCardHeader
                  firstName={row.getValue("first_name") as string}
                  lastName={row.getValue("last_name") as string}
                  patientId={row.getValue("patients_id") as string}
                  middleName={row.getValue("middle_name") as string}
                />

                <Flex my={"4"} justify={"between"}>
                  <div className="flex flex-wrap gap-2">
                    <Badge>{row.getValue("beds")}</Badge>
                    <Badge>{row.getValue("wards")}</Badge>
                  </div>
                  {row.original.is_critical && (
                    <Badge radius="full" color="red">
                      critical
                    </Badge>
                  )}
                </Flex>
                <Flex align={"center"} gap={"2"} justify={"between"}>
                  Addmitted By : <Badge>{row.getValue("admitted_by")}</Badge>
                </Flex>
                <Flex justify={"between"}>
                  <Text>Discharge Date:</Text>
                  <Flex gap={"2"}>
                    <Badge size={"3"} radius="full">
                      {format(
                        row.original.discharge_date,
                        "LLL MM yyy, HH:mm a"
                      )}
                    </Badge>
                    <Badge color="red" size={"3"} radius="full">
                      {endOfDay(row.original.discharge_date) < new Date()
                        ? "Due"
                        : "Not Due"}
                    </Badge>
                  </Flex>
                </Flex>
                <Inset mt={"6"}>
                  <Separator size={"4"} />
                </Inset>

                <Flex align={"center"} mt={"5"} justify={"between"}>
                  <Button disabled variant="soft" radius="full">
                    <ArrowRightCircle />
                  </Button>
                  <Flex gap={"4"}>
                    <ConfirmAdmissionUpdate
                      inValidate="admissions"
                      id={row.original.id}
                      title="Move To Active?"
                      triggleLabel="Active"
                      disabled
                      warning="Are you sure you want to move this request to waiting?"
                      actionFn={async () => {
                        await changeAdmissionStatus({
                          id: row.original.id,
                          isActive: true,
                          isDischarged: false,
                        });
                        queryClient.invalidateQueries({
                          queryKey: ["admissions"],
                        });
                      }}
                    />

                    <ConfirmAdmissionUpdate
                      inValidate="admissions"
                      id={row.original.id}
                      title="Dischard Patient?"
                      triggleLabel="Discharge"
                      disabled={row.original.is_discharged!}
                      warning="Are you sure you want to discharge this discharge as patient?"
                      actionFn={async () => {
                        await changeAdmissionStatus({
                          id: row.original.id,
                          isActive: false,
                          isDischarged: true,
                        });
                        queryClient.invalidateQueries({
                          queryKey: ["admissions"],
                        });
                      }}
                    />
                  </Flex>
                </Flex>
              </Card>
            ))
          )}
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
