import { Box, Heading, Section, Spinner } from "@radix-ui/themes";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { Sidebar } from "../components/SideBar";
import { checkAuth } from "../lib/utils";

const Layout = () => {
  const user = Route.useLoaderData();
  return (
    <Box>
      <Header />
      <aside className="lg:flex w-72 hidden justify-start  fixed inset-y-0">
        <Sidebar />
      </aside>
      <main className="lg:w-[80%] lg:ml-auto lg:px-20 p-2 mt-20">
        <Section>
          <Heading size={"1"} mb={"2"}>
            staff - {user?.email ?? <Spinner />}
          </Heading>
          <Outlet />
        </Section>
      </main>
    </Box>
  );
};

export const Route = createFileRoute("/_layout")({
  beforeLoad: () => {
    if (!checkAuth()) {
      throw redirect({ to: "/" });
    }
  },
  loader: checkAuth,
  component: Layout,
});
