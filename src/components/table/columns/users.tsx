import { deleteUserProfileAction } from "@/actions/config/user-profile";
import { DeleteActionForm } from "@/actions/DeleteAction";
import { Checkbox } from "@radix-ui/themes";
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

export const profiles_column: ColumnDef<DB["profile"]["Row"]>[] = [
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
    accessorKey: "first_name",
    header: "First Name",
    cell: ({ row }) => <div>{row.getValue("first_name")}</div>,
  },
  {
    accessorKey: "middle_name",
    header: "Middle Name",
    cell: ({ row }) => <div>{row.getValue("middle_name")}</div>,
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    cell: ({ row }) => <div>{row.getValue("last_name")}</div>,
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const params = row.original;

      return (
        <div className="flex gap-4">
          <DeleteActionForm
            id={params.id}
            inValidate="users"
            title="Delete User Profile"
            warning="Are you sure? this user profile type will be parmanently deleted from the
          database."
            actionFn={() => deleteUserProfileAction({ id: params.id })}
          />
        </div>
      );
    },
  },
];
