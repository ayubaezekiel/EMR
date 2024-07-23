import { Flex, Heading } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { consultationTemplatesQueryOptions } from "../../actions/queries";
import { CreateConsultationTemplateForm } from "../../forms/config/TemplatesForm";
import { consultation_templates_column } from "../table/columns/templates";
import { DataTable } from "../table/DataTable";

export function ConsultationTemplates() {
  //   const { consultation_templates_data } = useLoaderData({
  //     from: "/_layout/dashboard/config/consultation",
  //   });

  const { data } = useSuspenseQuery(consultationTemplatesQueryOptions);

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Templates</Heading>
        <CreateConsultationTemplateForm />
      </Flex>

      <DataTable
        filterLabel="filter by name..."
        filterer="name"
        columns={consultation_templates_column}
        data={data.consultation_templates_data ?? []}
      />
    </div>
  );
}
