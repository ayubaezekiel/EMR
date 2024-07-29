import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import supabase from "../supabase/client";
import { toast } from "sonner";
import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Grid,
  IconButton,
  Spinner,
  Tooltip,
} from "@radix-ui/themes";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  AlignJustify,
  BookCheck,
  Home,
  Hospital,
  LogOutIcon,
  User,
} from "lucide-react";
import { services_routes } from "../lib/constants";
import { NavPatientFilters } from "./NavFilters";

const nav_items = [
  { icon: Home, route: "/dashboard", tip: "Home" },
  { icon: Hospital, route: "/dashboard/appointments", tip: "Appointments " },
  { icon: BookCheck, route: "/dashboard/billing", tip: "Billing" },
];

export function Header({ user }: { user: string }) {
  const [open, onOpenChange] = useState(false);

  const navigate = useNavigate();
  const LogOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
    } else {
      navigate({ to: "/", replace: true });
    }
  };

  return (
    <Grid
      top={"0"}
      width={"100%"}
      className="bg-[var(--amber-1)] shadow-md z-50"
      position={"fixed"}
      p={"5"}
      columns={"3"}
      height={"100px"}
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
          <SheetContent
            side="left"
            className="overflow-auto bg-white/90 text-black"
          >
            <Box>
              <SheetTitle className="text-[var(--accent-7)]">
                Brightedge
              </SheetTitle>
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
            </Box>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <Avatar size={"4"} fallback="L" radius="full" />
        </div>
        <NavPatientFilters />
      </Flex>
      <Flex gap={"4"} align={"center"} justify={"center"}>
        {nav_items.map((i) => (
          <Flex key={i.tip} direction={"column"} align={"center"} gap={"3"}>
            <Tooltip content="Billing">
              <Link to={i.route}>
                <Button size={"4"} variant="ghost">
                  <i.icon className="w-8 h-8 md:w-24" />
                </Button>
              </Link>
            </Tooltip>
            <Box
              as="span"
              className="p-0.5 bg-[var(--accent-9)] w-[10rem] absolute top-24"
            />
          </Flex>
        ))}
      </Flex>
      <Flex justify={"end"} align={"center"}>
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
            <DropdownMenu.Label>{user ?? <Spinner />}</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onClick={LogOut}>Logout</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Grid>
  );
}
