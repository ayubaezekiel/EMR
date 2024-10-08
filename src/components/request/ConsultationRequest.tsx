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
} from "@radix-ui/themes";
import { Link } from "@tanstack/react-router";
import { FileQuestion, Printer, X } from "lucide-react";
import { useMemo } from "react";
import { PatientCardHeader } from "../PatientCardHeader";

export function ConsultationRequestWaitingCard() {
  const { data: request_data, isPending: isRequestPending } =
    useConsultationQuery();

  const consultation_request_waiting = useMemo(
    () => request_data?.consultation_data?.filter((a) => !a.is_completed),
    [request_data?.consultation_data]
  );

  return isRequestPending ? (
    <Spinner />
  ) : consultation_request_waiting?.length === 0 ? (
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
      {consultation_request_waiting?.map((a) => (
        <Card key={a.id}>
          <PatientCardHeader
            createdAt={a.created_at!}
            firstName={a.admissions?.patients?.first_name as string}
            lastName={a.admissions?.patients?.last_name as string}
            patientId={a.admissions?.patient_id as string}
            middleName={a.admissions?.patients?.middle_name as string}
          />
          <Flex direction={"column"} mt={"4"} height={"100px"}>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge>{a.admissions?.wards?.name}</Badge>
              <Badge>{a.admissions?.beds?.name}</Badge>
            </div>
          </Flex>
          <Flex justify={"between"} mt={"4"}>
            <Link
              to={`/dashboard/appointments/${a.admissions?.patient_id}`}
              search={{
                admission: true,
                consultationId: a.id,
                completed: a.is_completed,
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
                <Card>{a.note}</Card>
              </Dialog.Content>
            </Dialog.Root>
          </Flex>
        </Card>
      ))}
    </div>
  );
}

export function ConsultationRequestCompletedCard() {
  const { data: request_data, isPending: isRequestPending } =
    useConsultationQuery();

  const consultation_request_completed = useMemo(
    () => request_data?.consultation_data?.filter((a) => a.is_completed),
    [request_data?.consultation_data]
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
            createdAt={a.created_at!}
            firstName={a.admissions?.patients?.first_name as string}
            lastName={a.admissions?.patients?.last_name as string}
            patientId={a.admissions?.patient_id as string}
            middleName={a.admissions?.patients?.middle_name as string}
          />
          <Flex direction={"column"} mt={"4"} height={"100px"}>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge>{a.admissions?.wards?.name}</Badge>
              <Badge>{a.admissions?.beds?.name}</Badge>
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
                <Card>{a.note}</Card>
              </Dialog.Content>
            </Dialog.Root>
          </Flex>
        </Card>
      ))}
    </div>
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
            createdAt={a.created_at}
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
