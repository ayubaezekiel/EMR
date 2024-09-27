import { deleteUserReportAction } from "@/actions/config/user_report";
import { UpdateUserReportForm } from "@/forms/config/UserReportForm";
import { Checkbox } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DeleteActionForm } from "../../../actions/DeleteAction";

export const user_reports_column: ColumnDef<DB["document_reports"]["Row"]>[] = [
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
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => (
      <div className="capitalize">
        {format(row.getValue("created_at"), "LLL dd,yyy HH:mm a")}
      </div>
    ),
  },
  {
    accessorKey: "profile",
    header: "Created By",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("profile")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "document_types",
    header: "Document Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("document_types")}</div>
    ),
  },
  {
    accessorKey: "file_url",
    header: "Download",
    cell: ({ row }) => (
      <a
        href={row.getValue("file_url")}
        download
        className="text-[var(--accent-11)] underline"
      >
        Download
      </a>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const params = row.original;

      return (
        <div className="flex gap-4">
          <UpdateUserReportForm {...params} />
          <DeleteActionForm
            id={params.id}
            inValidate="userReports"
            title="Delete User Report"
            warning="Are you sure? this report type will be parmanently deleted from the
          database."
            actionFn={() => deleteUserReportAction({ id: params.id })}
          />
        </div>
      );
    },
  },
];
