import { Card, Heading } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { UpdateProfileForm } from "../../../../forms/user/UpdateProfileForm";
import { UserPermission } from "../../../../forms/user/UserPermissions";

export const Route = createFileRoute("/_layout/dashboard/users/$userId")({
  component: () => (
    <div>
      <Heading mb={"3"}>User Profile</Heading>

      <div className="grid md:grid-cols-2 gap-4 mt-10">
        <div>
          <Card>
            <Heading mb={"3"}>Bio</Heading>
            <UpdateProfileForm />
          </Card>
        </div>
        <div>
          <Card>
            <Heading mb={"3"}>Permissions</Heading>
            <UserPermission />
          </Card>
        </div>
      </div>
    </div>
  ),
});
