import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { deleteConsultationTemplatesAction } from "../../../actions/config/templates";
import { DeleteActionForm } from "../../../actions/DeleteAction";
import { UpdateConsultationTemplateForm } from "../../../forms/config/TemplatesForm";

export const consultation_templates_column: ColumnDef<
  DB["consultation_templates"]["Row"]
>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const temp = row.original;

      return (
        <div className="flex gap-4">
          <UpdateConsultationTemplateForm {...temp} />
          <DeleteActionForm
            id={temp.id}
            inValidate="consultationTemplates"
            title="Delete Consultation Template"
            warning="Are you sure? this template will be parmanently deleted from the
          database."
            actionFn={() => deleteConsultationTemplatesAction({ id: temp.id })}
          />
        </div>
      );
    },
  },
];
