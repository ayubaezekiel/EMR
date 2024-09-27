import { CreateDocumentType } from "@/forms/config/DocumentTypeForm";
import { useDocumentType } from "@/lib/hooks";
import { Flex, Heading, Spinner } from "@radix-ui/themes";
import { DataTable } from "../table/DataTable";
import { document_type_column } from "../table/columns/document_type";

export function DocumentTypes() {
  const { document_type_data, isDocumentTypePending } = useDocumentType();

  return (
    <div>
      <Flex mb={"3"} justify={"between"}>
        <Heading>Document Types</Heading>
        <CreateDocumentType />
      </Flex>
      {isDocumentTypePending ? (
        <Spinner />
      ) : (
        <DataTable
          filterLabel="filter by name..."
          filterer="name"
          columns={document_type_column}
          data={document_type_data ?? []}
        />
      )}
    </div>
  );
}
