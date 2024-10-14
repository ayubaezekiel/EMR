import { useTemplatesQuery } from "@/actions/queries";
import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { CreateTemplateForm } from "../../forms/config/TemplatesForm";
import { DataTable } from "../table/DataTable";
import { templates_column } from "../table/columns/templates";

export function Templates() {
  const { data, isPending } = useTemplatesQuery();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Templates</Heading>
        <CreateTemplateForm />
      </Flex>
      {isPending ? (
        <Spinner />
      ) : (
        <DataTable
          columns={templates_column}
          data={data?.consultation_templates_data ?? []}
        />
      )}
    </div>
  );
}
