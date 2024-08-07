import { Button, Card, Flex } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getPatientVitalsById } from "../../actions/actions";
import PendingComponent from "../PendingComponent";
import { useStepper } from "../stepper";

export function IssueRequests() {
  const { nextStep, prevStep } = useStepper();

  const { appointmentId } = useParams({
    from: "/_layout/dashboard/appointments/$appointmentId",
  });
  const { data, isPending } = useQuery({
    queryFn: () => getPatientVitalsById(appointmentId),
    queryKey: ["patientVitalsById"],
  });

  if (isPending) return <PendingComponent />;
  return (
    <div>
      <Card my={"6"}>
        <div className="grid gap-3 md:grid-cols-3">
          <Button size={"4"}>Issue Laboratory Request</Button>
          <Button size={"4"}>Issue Pharmacy Request</Button>
          <Button size={"4"}>Issue Radiology Request</Button>
          <Button size={"4"}>Issue Antenatal Request</Button>
          <Button size={"4"}>Issue Consumable Request</Button>
          <Button size={"4"}>Issue Procedure Request</Button>
        </div>
      </Card>

      <Flex justify={"end"} gap={"2"}>
        <Button variant="soft" type="button" onClick={prevStep} size={"4"}>
          Prev
        </Button>

        <Button type="submit" onClick={nextStep} size={"4"}>
          Reset
        </Button>
      </Flex>
    </div>
  );
}
