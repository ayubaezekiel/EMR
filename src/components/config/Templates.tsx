import { useConsultationTemplatesQuery } from "@/actions/queries";
import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { CreateConsultationTemplateForm } from "../../forms/config/TemplatesForm";
import { DataTable } from "../table/DataTable";
import { consultation_templates_column } from "../table/columns/templates";

export function ConsultationTemplates() {
  const { data, isPending } = useConsultationTemplatesQuery();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Templates</Heading>
        <CreateConsultationTemplateForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable
          filterLabel="filter by name..."
          filterer="name"
          columns={consultation_templates_column}
          data={data?.consultation_templates_data ?? []}
        />
      )}
    </div>
  );
}
