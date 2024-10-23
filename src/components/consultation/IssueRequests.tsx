import { Badge, Card } from "@radix-ui/themes";
import { CreateConsumableRequestForm } from "../../forms/requests/ConsumableRequestForm";
import { CreateLabRequestForm } from "../../forms/requests/LabRequestForm";
import { CreatePharmRequestForm } from "../../forms/requests/PharmRequestForm";
import { CreateProcedureRequestForm } from "../../forms/requests/ProcedureRequestForm";
import { CreateRadiologyRequestForm } from "../../forms/requests/RadioloyRequestForm";
import { useParams } from "@tanstack/react-router";

export function IssueRequests({ isAdmission }: { isAdmission: boolean }) {
  const { patientId } = useParams({
    from: isAdmission
      ? "/_layout/dashboard/admissions/$patientId"
      : "/_layout/dashboard/appointments/$patientId",
  });
  return (
    <div>
      <Card my={"6"}>
        <div className="grid gap-3 md:grid-cols-3">
          <Card>
            <Badge color="red" mb={"5"}>
              Issue Laboratory Request
            </Badge>
            <div>
              <CreateLabRequestForm patientId={patientId} />
            </div>
          </Card>
          <Card>
            <Badge color="red" mb={"5"}>
              Issue Pharmacy Request
            </Badge>
            <div>
              <CreatePharmRequestForm patientId={patientId} />
            </div>
          </Card>
          <Card>
            <Badge color="red" mb={"5"}>
              Issue Radiology Request
            </Badge>
            <div>
              <CreateRadiologyRequestForm patientId={patientId} />
            </div>
          </Card>
          {/* <Card>
						<Badge color="red" mb={"5"}>
							Issue Antenatal Request
						</Badge>
						<div>
							<CreateAntenatalRequestForm />
						</div>
					</Card> */}
          <Card>
            <Badge color="red" mb={"5"}>
              Issue Consumable Request
            </Badge>
            <div>
              <CreateConsumableRequestForm patientId={patientId} />
            </div>
          </Card>
          <Card>
            <Badge color="red" mb={"5"}>
              Issue Procedure Request
            </Badge>
            <div>
              <CreateProcedureRequestForm patientId={patientId} />
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
}
