import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { useMemo } from "react";
import { useBedsQuery } from "../../../actions/queries";
import { CreateBedForm } from "../../../forms/config/admission/BedForm";
import { DataTable } from "../../table/DataTable";
import { beds_column } from "../../table/columns/admission/beds";

export function Beds() {
  const { data, isPending } = useBedsQuery();

  const bed_datas =
    useMemo(
      () =>
        data?.beds_data?.map((b) => ({
          ...b,
          ward: `${b.wards?.name}`,
        })),
      [data?.beds_data]
    ) ?? [];

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Beds</Heading>
        <CreateBedForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable columns={beds_column} data={bed_datas} />
      )}
    </div>
  );
}
