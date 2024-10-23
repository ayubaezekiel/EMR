import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useBillingQuery } from "@/lib/use-billing";
import {
  Button,
  Card,
  Heading,
  IconButton,
  Select,
  Spinner,
  TextField,
} from "@radix-ui/themes";
import { ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { PatientCardHeader } from "../PatientCardHeader";
import { ApprovePayments } from "../Payments";
import { AdmissionBillingCard } from "./AdmissionBillingCard";
import { AntenatalBillingCard } from "./AntenatalBillingCard";
import { AppointmentBillingCards } from "./AppointmentBillingCard";
import { ConsumableBillingCard } from "./ConsumableBillingCard";
import { LabBillingCard } from "./LabBillingCard";
import { PharmBillingCard } from "./PharmBillingCard";
import { RadiologyBillingCard } from "./RadiologyBillingCard";

export function BillingCards() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage, setPatientsPerPage] = useState(10);

  const { data: request_data, isPending: isRequestPending } =
    useBillingQuery(false);

  const totalAmountForRequests = ({ patientId }: { patientId: string }) => {
    const amounts = request_data?.patientsCollection.edges
      .map((patients) =>
        patients.node.requestsCollection.edges
          .filter(
            (filter) =>
              patients.node.requestsCollection.edges.length > 0 &&
              !filter.node.is_approved &&
              !filter.node.is_completed &&
              patients.node.id === patientId
          )
          .map((requests) =>
            JSON.parse(requests.node.services).map(
              (s: { service: { amount: string } }) => {
                if (s.service) {
                  return s.service.amount;
                }
              }
            )
          )
          .reduce((prev, next) => Number(prev) + Number(next), 0)
      )
      .reduce((prev, next) => Number(prev) + Number(next), 0);
    return amounts;
  };

  const totalAmountForAppointments = ({ patientId }: { patientId: string }) => {
    const amounts = request_data?.patientsCollection.edges
      .map((patients) =>
        patients.node.appointmentsCollection.edges
          .filter(
            (filter) =>
              patients.node.appointmentsCollection.edges.length > 0 &&
              !filter.node.is_approved &&
              !filter.node.is_completed &&
              patients.node.id === patientId
          )
          .map((app) =>
            app.node.follow_up
              ? app.node.appointment_types.follow_up_price
              : app.node.appointment_types.default_price
          )
          .reduce((prev, next) => Number(prev) + Number(next), 0)
      )
      .reduce((prev, next) => Number(prev) + Number(next), 0);
    return amounts;
  };

  const totalAmountForAdmission = ({ patientId }: { patientId: string }) => {
    const amounts = request_data?.patientsCollection.edges
      .map((patients) =>
        patients.node.admissionsCollection.edges
          .filter(
            (filter) =>
              patients.node.admissionsCollection.edges.length > 0 &&
              !filter.node.is_approved &&
              !filter.node.is_discharged &&
              patients.node.id === patientId
          )
          .flatMap(
            (adm) =>
              Number(adm.node.beds.default_price) +
              Number(adm.node.wards.default_price)
          )
          .reduce((prev, next) => Number(prev) + Number(next), 0)
      )
      .reduce((prev, next) => Number(prev) + Number(next), 0);
    return amounts;
  };

  const filteredPatients = useMemo(() => {
    if (!globalFilter.trim()) {
      return request_data?.patientsCollection.edges || [];
    }

    const searchTerms = globalFilter.toLowerCase().trim().split(/\s+/);

    return (
      request_data?.patientsCollection.edges.filter((p) => {
        const fullName =
          `${p.node.first_name} ${p.node.middle_name || ""} ${p.node.last_name}`.toLowerCase();
        return searchTerms.every(
          (term) =>
            fullName.includes(term) || p.node.id.toLowerCase().includes(term)
        );
      }) || []
    );
  }, [request_data?.patientsCollection.edges, globalFilter]);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return isRequestPending ? (
    <Spinner />
  ) : (
    <div>
      <div className="flex justify-between items-center mt-4">
        <TextField.Root
          type="text"
          placeholder="Search patients..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <Select.Root
          value={patientsPerPage.toString()}
          onValueChange={(value) => setPatientsPerPage(Number(value))}
        >
          <Select.Trigger placeholder="page size" />
          <Select.Content position="popper">
            <Select.Item value="5">5 per page</Select.Item>
            <Select.Item value="10">10 per page</Select.Item>
            <Select.Item value="20">20 per page</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {currentPatients.map((p) => (
          <div key={p.node.id}>
            <Card>
              <Collapsible>
                <div className="flex items-center justify-between space-x-4 px-4">
                  <PatientCardHeader
                    firstName={p.node.first_name as string}
                    lastName={p.node?.last_name as string}
                    patientId={p.node.id}
                    middleName={p.node?.middle_name as string}
                  />

                  <CollapsibleTrigger asChild>
                    <IconButton radius="full" variant="soft">
                      <ChevronsUpDown className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </IconButton>
                  </CollapsibleTrigger>
                </div>

                <ApprovePayments
                  isBulk
                  admissionId={
                    p.node.admissionsCollection.edges.find((adm) => adm.node.id)
                      ?.node.id
                  }
                  appointmentId={
                    p.node.appointmentsCollection.edges.find(
                      (app) => app.node.id
                    )?.node.id
                  }
                  isAdmission={p.node.admissionsCollection.edges.length > 0}
                  isApproved={false}
                  is_appointment={
                    p.node.appointmentsCollection.edges.length > 0
                  }
                  is_request={p.node.requestsCollection.edges.length > 0}
                  requestId={
                    p.node.admissionsCollection.edges.find((req) => req.node.id)
                      ?.node.id
                  }
                  amount={
                    totalAmountForRequests({ patientId: p.node.id }) +
                    totalAmountForAdmission({ patientId: p.node.id }) +
                    totalAmountForAppointments({
                      patientId: p.node.id,
                    })
                  }
                  patientId={p.node.id}
                  services={[
                    {
                      amount:
                        totalAmountForRequests({ patientId: p.node.id }) +
                        totalAmountForAdmission({ patientId: p.node.id }) +
                        totalAmountForAppointments({
                          patientId: p.node.id,
                        }),
                      name: "demo",
                    },
                  ]}
                />
                <CollapsibleContent className="space-y-2">
                  {p.node.appointmentsCollection.edges.length > 0 &&
                    p.node.appointmentsCollection.edges.map(
                      (app) =>
                        !app.node.is_approved && (
                          <Card key={app.node.id} mt={"2"}>
                            <Heading size={"1"} mb={"2"}>
                              Appointment
                            </Heading>
                            <AppointmentBillingCards
                              first_name={app.node.profile.first_name}
                              last_name={app.node.profile.last_name}
                              middle_name={app.node.profile.middle_name ?? ""}
                              patientId={p.node.id}
                              is_approved={app.node.is_approved}
                              appointmentId={app.node.id}
                              appointment_type={app.node.appointment_types.name}
                              appointment_type_default_price={
                                app.node.appointment_types.default_price
                              }
                              appointment_type_follow_up_price={
                                app.node.appointment_types.follow_up_price
                              }
                              clinic_name={app.node.clinics.name}
                              duration={app.node.duration}
                              follow_up={app.node.follow_up}
                            />
                          </Card>
                        )
                    )}
                  {p.node.admissionsCollection.edges.length > 0 &&
                    p.node.admissionsCollection.edges.map(
                      (add) =>
                        !add.node.is_approved && (
                          <Card key={add.node.id} mt={"2"}>
                            <Heading size={"1"} mb={"2"}>
                              Admission
                            </Heading>
                            <AdmissionBillingCard
                              admissionId={add.node.id}
                              bed_name={add.node.beds.name}
                              bed_price={add.node.beds.default_price}
                              first_name={add.node.profile.first_name}
                              last_name={add.node.profile.last_name}
                              middle_name={add.node.profile.middle_name ?? ""}
                              patientId={p.node.id}
                              ward_name={add.node.wards.name}
                              ward_price={add.node.wards.default_price}
                              isApproved={add.node.is_approved}
                            />
                          </Card>
                        )
                    )}

                  {p.node.requestsCollection.edges.length > 0 &&
                    p.node.requestsCollection.edges.map(
                      (req) =>
                        req.node.is_lab &&
                        !req.node.is_approved && (
                          <Card key={req.node.id} mt={"2"}>
                            <Heading size={"1"} mb={"2"}>
                              Lab Request
                            </Heading>
                            <LabBillingCard
                              is_approved={req.node.is_approved}
                              first_name={req.node.profile.first_name}
                              last_name={req.node.profile.last_name}
                              middle_name={req.node.profile.middle_name ?? ""}
                              patientId={p.node.id}
                              requestId={req.node.id}
                              services={req.node.services}
                            />
                          </Card>
                        )
                    )}

                  {p.node.requestsCollection.edges.length > 0 &&
                    p.node.requestsCollection.edges.map(
                      (req) =>
                        req.node.is_pharm &&
                        !req.node.is_approved && (
                          <Card key={req.node.id} mt={"2"}>
                            <Heading size={"1"} mb={"2"}>
                              Pharmacy Request
                            </Heading>
                            <PharmBillingCard
                              is_approved={req.node.is_approved}
                              first_name={req.node.profile.first_name}
                              last_name={req.node.profile.last_name}
                              middle_name={req.node.profile.middle_name ?? ""}
                              patientId={p.node.id}
                              requestId={req.node.id}
                              services={req.node.services}
                            />
                          </Card>
                        )
                    )}

                  {p.node.requestsCollection.edges.length > 0 &&
                    p.node.requestsCollection.edges.map(
                      (req) =>
                        req.node.is_radiology &&
                        !req.node.is_approved && (
                          <Card key={req.node.id} mt={"2"}>
                            <Heading size={"1"} mb={"2"}>
                              Radiology Request
                            </Heading>
                            <RadiologyBillingCard
                              is_approved={req.node.is_approved}
                              first_name={req.node.profile.first_name}
                              last_name={req.node.profile.last_name}
                              middle_name={req.node.profile.middle_name ?? ""}
                              patientId={p.node.id}
                              requestId={req.node.id}
                              services={req.node.services}
                            />
                          </Card>
                        )
                    )}

                  {p.node.requestsCollection.edges.length > 0 &&
                    p.node.requestsCollection.edges.map(
                      (req) =>
                        req.node.is_consumable &&
                        !req.node.is_approved && (
                          <Card key={req.node.id} mt={"2"}>
                            <Heading size={"1"} mb={"2"}>
                              Consumable Request
                            </Heading>
                            <ConsumableBillingCard
                              is_approved={req.node.is_approved}
                              first_name={req.node.profile.first_name}
                              last_name={req.node.profile.last_name}
                              middle_name={req.node.profile.middle_name ?? ""}
                              patientId={p.node.id}
                              requestId={req.node.id}
                              services={req.node.services}
                            />
                          </Card>
                        )
                    )}

                  {p.node.requestsCollection.edges.length > 0 &&
                    p.node.requestsCollection.edges.map(
                      (req) =>
                        req.node.is_antenatal &&
                        !req.node.is_approved && (
                          <Card key={req.node.id} mt={"2"}>
                            <Heading size={"1"} mb={"2"}>
                              Antenatal Request
                            </Heading>
                            <AntenatalBillingCard
                              is_approved={req.node.is_approved}
                              first_name={req.node.profile.first_name}
                              last_name={req.node.profile.last_name}
                              middle_name={req.node.profile.middle_name ?? ""}
                              patientId={p.node.id}
                              requestId={req.node.id}
                              services={req.node.services}
                            />
                          </Card>
                        )
                    )}
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 space-x-2">
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Prev
        </Button>

        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            onClick={() => paginate(i + 1)}
            variant={currentPage === i + 1 ? "ghost" : "outline"}
            className="mx-1"
          >
            {i + 1}
          </Button>
        ))}

        <Button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          variant="outline"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
