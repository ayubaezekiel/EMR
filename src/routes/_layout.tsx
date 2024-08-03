import { Box, Heading, Section } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { Header } from "../components/Header";
import PendingComponent from "../components/PendingComponent";
import { Sidebar } from "../components/SideBar";
import { checkAuth } from "../lib/utils";
import { useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const { data, isPending } = useQuery({
    queryFn: checkAuth,
    queryKey: ["user"],
  });

  useEffect(() => {
    const block = async () => {
      const auth = await checkAuth();
      console.log(auth?.id);
      if (!auth?.id) {
        navigate({ to: "/", replace: true });
      }
    };
    block();
  }, [navigate]);

  if (isPending) return <PendingComponent />;
  return (
    <Box>
      <Header user={`${data?.email}`} userId={`${data?.id}`} />
      <aside className="lg:flex w-72 hidden justify-start  fixed inset-y-0">
        <Sidebar />
      </aside>
      <main className="lg:w-[80%] lg:ml-auto lg:px-20 p-2 mt-20">
        <Section>
          <Heading size={"1"} mb={"2"}>
            <div className="flex items-center gap-2">staff - {data?.email}</div>
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
