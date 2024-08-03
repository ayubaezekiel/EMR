import { Checkbox } from "@radix-ui/themes";
import { User } from "@supabase/supabase-js";
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

export const users_column: ColumnDef<User>[] = [
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
    header: "Date Created",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("created_at")).toDateString()}</div>
    ),
  },
  {
    accessorKey: "last_sign_in_at",
    header: "last Login",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("last_sign_in_at")).toDateString()}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <Link
        to={`/dashboard/users/${row.original.id}`}
        className="text-[var(--accent-9)] hover:underline"
      >
        {row.getValue("email")}
      </Link>
    ),
  },
  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ row }) => <div>{row.original.role}</div>,
  },
];
