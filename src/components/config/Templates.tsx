import { Flex, Heading } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { consultationTemplatesQueryOptions } from "../../actions/queries";
import { CreateConsultationTemplateForm } from "../../forms/config/TemplatesForm";
import PendingComponent from "../PendingComponent";
import { consultation_templates_column } from "../table/columns/templates";
import { DataTable } from "../table/DataTable";

export function ConsultationTemplates() {
  const { data, isPending } = useQuery(consultationTemplatesQueryOptions);
  if (isPending) return <PendingComponent />;

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
        data={data?.consultation_templates_data ?? []}
      />
    </div>
  );
}
