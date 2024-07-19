import { redirect, useLoaderData, useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import supabase from "../supabase/client";
import { toast } from "sonner";
import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Grid,
  Heading,
  IconButton,
  Popover,
  Section,
  Spinner,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import {
  AlignJustify,
  Bell,
  Home,
  Hospital,
  LogOutIcon,
  Search,
  SearchCheck,
  User,
} from "lucide-react";
import { services_routes } from "../lib/constants";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";

const Layout = () => {
  const user = useLoaderData({ from: "/_layout" });
  return (
    <Box>
      <Header />
      <aside className="lg:flex w-96 hidden justify-start p-6 fixed inset-y-0">
        <Sidebar />
      </aside>
      <main className="lg:w-[80%] lg:ml-auto lg:px-20 p-2 mt-20">
        <Section>
          <Heading size={"1"} mb={"2"}>
            Staff - {user.email ?? <Spinner />}
          </Heading>
          <Outlet />
        </Section>
      </main>
    </Box>
  );
};

export const Route = createFileRoute("/_layout")({
  beforeLoad: () => {
    CheckAuth();
  },
  loader: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw redirect({ to: "/" });
    }
    return data.session?.user;
  },
  component: Layout,
});

const CheckAuth = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    toast.error(error.message);
    throw redirect({ to: "/", replace: true });
  }
  if (data.session) {
    throw redirect({ to: "/dashboard" });
  }
};

function Header() {
  const [open, onOpenChange] = useState(false);
  const user = useLoaderData({ from: "/_layout" });

  const navigate = useNavigate();
  const LogOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
    }

    navigate({ to: "/", replace: true });
  };

  return (
    <Grid
      top={"0"}
      width={"100%"}
      className="bg-[var(--amber-1)] shadow-md z-50"
      position={"fixed"}
      p={"5"}
      columns={"3"}
      justify={"between"}
      align={"center"}
    >
      <Flex gap={"2"} justify={"start"} align={"center"}>
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetTrigger asChild>
            <div className="lg:hidden">
              <IconButton size="4" variant="ghost" mr={"2"}>
                <AlignJustify className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </IconButton>
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="overflow-auto">
            <SheetTitle>Brightedge</SheetTitle>
            <div className="flex flex-col w-full gap-4 mt-6">
              {services_routes.map((r) => (
                <div
                  key={r.name}
                  className="hover:bg-blue-500/10 items-center p-2 w-full rounded-md"
                >
                  <Link
                    onClick={() => onOpenChange(!open)}
                    to={r.route}
                    className="justify-start w-full flex items-center gap-1"
                  >
                    <r.icon className="h-5 w-5 " />
                    {r.name}
                  </Link>
                </div>
              ))}

              <SheetFooter className="mt-10">
                <div className="hover:bg-red-500/10  items-center p-2 w-full rounded-md">
                  <Button
                    onClick={() => {
                      onOpenChange(!open), LogOut();
                    }}
                  >
                    Logout <LogOutIcon className="size-5 ml-2" />
                  </Button>
                </div>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
        <div className="hidden md:block">
          <Avatar size={"4"} fallback="L" radius="full" />
        </div>
        <div className="hidden xl:hidden md:block">
          <Popover.Root>
            <Popover.Trigger>
              <IconButton variant="soft" size={"4"} radius="full">
                <Search />
              </IconButton>
            </Popover.Trigger>
            <Popover.Content width="360px">
              <Flex gap="3">
                <Box flexGrow="1">
                  <TextField.Root placeholder="Search for an appartment…">
                    <TextField.Slot side="right">
                      <Search />
                    </TextField.Slot>
                  </TextField.Root>
                </Box>
              </Flex>
            </Popover.Content>
          </Popover.Root>
        </div>
        <div className="hidden xl:block">
          <TextField.Root size={"3"} radius="full" variant="soft">
            <TextField.Slot>
              <IconButton variant="ghost">
                <Search />
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
        </div>
      </Flex>
      <Flex gap={"4"} align={"center"} justify={"center"}>
        <Flex
          direction={"column"}
          justify={"center"}
          align={"center"}
          gap={"3"}
        >
          <Tooltip content="Home">
            <Button className="relative" size={"4"} variant="ghost">
              <Home className="w-8 h-8 md:w-24" />
            </Button>
          </Tooltip>
          <Box
            as="span"
            className="p-0.5 bg-[var(--accent-9)] w-[10rem] absolute top-24"
          />
        </Flex>

        <Flex direction={"column"} align={"center"} gap={"3"}>
          <Tooltip content="Appartment">
            <Button size={"4"} variant="ghost">
              <Hospital className="w-8 h-8 md:w-24" />
            </Button>
          </Tooltip>
          <Box
            as="span"
            className="p-0.5 bg-[var(--accent-9)] w-[10rem] absolute top-24"
          />
        </Flex>

        <Flex direction={"column"} align={"center"} gap={"3"}>
          <Tooltip content="Filter">
            <Button size={"4"} variant="ghost">
              <SearchCheck className="w-8 h-8 md:w-24" />
            </Button>
          </Tooltip>
          <Box
            as="span"
            className="p-0.5 bg-[var(--accent-9)] w-[10rem] absolute top-24"
          />
        </Flex>
      </Flex>
      <Flex gap={"4"} justify={"end"} align={"center"}>
        <IconButton variant="soft" size={"4"} radius="full">
          <Bell className="w-4 h-4" />
        </IconButton>
        <div className="hidden md:block">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton radius="full" variant="soft">
                <Avatar
                  size={"4"}
                  radius="full"
                  fallback={<User height={16} width={16} />}
                />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content variant="soft">
              <DropdownMenu.Label>
                {user.email ?? <Spinner />}
              </DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onClick={LogOut}>Logout</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </Flex>
    </Grid>
  );
}

function Sidebar() {
  return (
    <div className="flex flex-col w-full gap-4 mt-24 overflow-auto">
      <div className="hover:bg-[var(--accent-3)] p-2 w-full rounded-md">
        <Link
          to={"/dashboard"}
          className="justify-start w-full flex items-center gap-1"
        >
          <Home className="h-5 w-5 " />
          Dashboard
        </Link>
      </div>
      <div className="hover:bg-[var(--accent-3)] p-2 w-full rounded-md">
        <Link
          to={"/dashboard"}
          className="justify-start w-full flex items-center gap-1"
        >
          <Bell className="h-5 w-5 " />
          Notification
        </Link>
      </div>
      {services_routes.map((r) => (
        <div
          key={r.name}
          className="hover:bg-[var(--accent-3)] p-2 w-full rounded-md"
        >
          <Link
            to={r.route}
            className="justify-start w-full flex items-center gap-1"
          >
            <r.icon className="h-5 w-5 " />
            {r.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
