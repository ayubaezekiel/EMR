import { Badge, Flex, Text } from "@radix-ui/themes";
import { ApprovePayments } from "../Payments";

export function AdmissionBillingCard({
  bed_name,
  bed_price,
  ward_name,
  ward_price,
  first_name,
  middle_name,
  last_name,
  admissionId,
  isApproved,
  patientId,
}: {
  bed_name: string;
  bed_price: string;
  ward_name: string;
  ward_price: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  admissionId: string;
  isApproved: boolean;
  patientId: string;
}) {
  return (
    <div>
      <Flex direction={"column"}>
        <div className="flex flex-wrap gap-2">
          <Badge>
            {bed_name}
            <Text color="red">
              N{new Intl.NumberFormat().format(Number(bed_price))}
            </Text>
          </Badge>

          <Badge>
            {ward_name}
            <Text color="red">
              N{new Intl.NumberFormat().format(Number(ward_price))}
            </Text>
          </Badge>
        </div>
      </Flex>
      <Flex align={"center"} gap={"2"} justify={"between"} mt={"2"}>
        <Text size={"1"}>Addmitted By : </Text>
        <Badge>
          {first_name} {middle_name} {last_name}
        </Badge>
      </Flex>
      <Flex justify={"end"} align={"center"} mt={"4"}>
        <ApprovePayments
          isBulk={false}
          isApproved={isApproved}
          is_appointment={false}
          isAdmission
          is_request={false}
          admissionId={admissionId}
          services={[
            {
              name: "admission",
              amount: `${Number(bed_price) + Number(ward_price)}`,
            },
          ]}
          amount={`${Number(bed_price) + Number(ward_price)}`}
          patientId={patientId}
        />
      </Flex>
    </div>
  );
}
