import { CreateProfileForm } from "@/forms/user/NewProfile";
import { getAllProfiles } from "@/lib/utils";
import { Card, Flex, Heading, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { InviteUser } from "../../../../components/InviteUser";
import { DataTable } from "../../../../components/table/DataTable";
import { profiles_column } from "../../../../components/table/columns/users";

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
          <Flex gap={"2"}>
            <CreateProfileForm />
            <InviteUser />
          </Flex>
        </Flex>
      </Card>
      <AllUsers />
    </div>
  ),
});

const AllUsers = () => {
  const { data: profiles, isPending: isProfilesPending } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllProfiles,
  });

  const all_profiles = useMemo(() => profiles, [profiles]) ?? [];

  return (
    <div>
      {isProfilesPending ? (
        <Spinner />
      ) : (
        <DataTable
          columns={profiles_column}
          data={all_profiles}
          filterLabel="filter by email..."
          filterer="email"
        />
      )}
    </div>
  );
};
