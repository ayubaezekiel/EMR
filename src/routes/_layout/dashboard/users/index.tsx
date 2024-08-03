import { createFileRoute } from "@tanstack/react-router";
import { InviteUser } from "../../../../components/InviteUser";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { DataTable } from "../../../../components/table/DataTable";
import { getUsers } from "../../../../actions/actions";
import { useQuery } from "@tanstack/react-query";
import PendingComponent from "../../../../components/PendingComponent";
import { User } from "@supabase/supabase-js";
import { users_column } from "../../../../components/table/columns/users";

export const Route = createFileRoute("/_layout/dashboard/users/")({
  component: () => (
    <div>
      <Card
        variant="ghost"
        my={"4"}
        style={{
          background: "var(--accent-3)",
        }}
      >
        <Flex justify={"between"} align={"center"}>
          <Heading>Users</Heading>
          <InviteUser />
        </Flex>
      </Card>
      <AllUsers />
    </div>
  ),
});

const AllUsers = () => {
  const { data: users_data, isPending: isUsersPending } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  if (isUsersPending) return <PendingComponent />;

  const all_users: User[] = users_data?.user_data.users ?? [];

  return (
    <div>
      <DataTable
        columns={users_column}
        data={all_users}
        filterLabel="filter by email..."
        filterer="email"
      />
    </div>
  );
};
