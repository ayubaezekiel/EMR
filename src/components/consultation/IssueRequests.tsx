import { Badge, Card } from "@radix-ui/themes";
import { CreateAntenatalRequestForm } from "../../forms/requests/AntenatalRequestForm";
import { CreateConsumableRequestForm } from "../../forms/requests/ConsumableRequestForm";
import { CreateLabRequestForm } from "../../forms/requests/LabRequestForm";
import { CreatePharmRequestForm } from "../../forms/requests/PharmRequestForm";
import { CreateProcedureRequestForm } from "../../forms/requests/ProcedureRequestForm";
import { CreateRadiologyRequestForm } from "../../forms/requests/RadioloyRequestForm";

export function IssueRequests({ patientId }: { patientId: string }) {
	return (
		<div>
			<Card my={"6"}>
				<div className="grid gap-3 md:grid-cols-3">
					<Card>
						<Badge color="red" mb={"5"}>
							Issue Laboratory Request
						</Badge>
						<CreateLabRequestForm patientId={patientId} />
					</Card>
					<Card>
						<Badge color="red" mb={"5"}>
							Issue Pharmacy Request
						</Badge>
						<CreatePharmRequestForm patientId={patientId} />
					</Card>
					<Card>
						<Badge color="red" mb={"5"}>
							Issue Radiology Request
						</Badge>
						<CreateRadiologyRequestForm patientId={patientId} />
					</Card>
					<Card>
						<Badge color="red" mb={"5"}>
							Issue Antenatal Request
						</Badge>
						<CreateAntenatalRequestForm />
					</Card>
					<Card>
						<Badge color="red" mb={"5"}>
							Issue Consumable Request
						</Badge>
						<CreateConsumableRequestForm patientId={patientId} />
					</Card>
					<Card>
						<Badge color="red" mb={"5"}>
							Issue Procedure Request
						</Badge>
						<CreateProcedureRequestForm patientId={patientId} />
					</Card>
				</div>
			</Card>
		</div>
	);
}
