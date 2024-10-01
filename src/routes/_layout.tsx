import { useProfile } from "@/lib/hooks";
import { Badge, Box, Heading, Section, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import {
  Outlet,
  createFileRoute,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { checkAuth } from "../lib/utils";

const Layout = () => {
  const navigate = useNavigate();
  const { data, isPending } = useQuery({
    queryFn: checkAuth,
    queryKey: ["user"],
  });

  const auth_status = localStorage.getItem(
    "sb-kdowzrjmnzhhabgyekjx-auth-token"
  );

  const { isProfilePending, profile_data } = useProfile();

  useEffect(() => {
    if (!auth_status) {
      navigate({ to: "/", replace: true });
    }
  }, [navigate, auth_status]);

  return (
    <Box>
      <Header />
      <main className="lg:px-20 p-2 mt-20">
        <Section>
          <Heading size={"1"} mb={"2"}>
            <div className="flex items-center gap-2">
              Staff -{" "}
              {isProfilePending ? (
                <Spinner />
              ) : (
                <Badge variant="solid">
                  {profile_data?.first_name} {profile_data?.middle_name ?? ""}{" "}
                  {profile_data?.last_name}
                </Badge>
              )}
              {isPending ? (
                <Spinner />
              ) : (
                <Badge variant="solid">{data?.email}</Badge>
              )}
              <Badge variant="solid">{profile_data?.branch?.name}</Badge>
            </div>
          </Heading>
          <Outlet />
        </Section>
      </main>
    </Box>
  );
};

export const Route = createFileRoute("/_layout")({
  beforeLoad: async () => {
    const auth = await checkAuth();
    if (!auth?.id) {
      throw redirect({ to: "/" });
    }
  },
  component: Layout,
});
