import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { imagingTempQueryOptions } from "../../../actions/queries";
import { CreateImagingTemplateForm } from "../../../forms/config/radiology/ImagingTemplateForm";
import { DataTable } from "../../table/DataTable";
import { imaging_temp_column } from "../../table/columns/radiology";

export function ImagingTemplate() {
  const { data } = useQuery(imagingTempQueryOptions);

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Imaging Templates</Heading>
        <CreateImagingTemplateForm />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={imaging_temp_column}
        data={data?.imaging_temp_data ?? []}
      />
    </div>
  );
}
