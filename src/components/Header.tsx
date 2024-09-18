import { useBranchQuery } from "@/actions/queries";
import { useProfile } from "@/lib/hooks";
import {
	Avatar,
	Badge,
	Box,
	Button,
	DropdownMenu,
	Flex,
	Grid,
	IconButton,
	Separator,
	Spinner,
	Tooltip,
} from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
	AlignJustify,
	BookCheck,
	Cog,
	Home,
	Hospital,
	LogOutIcon,
	User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { services_routes } from "../lib/constants";
import supabase from "../supabase/client";
import { NavPatientFilters } from "./NavFilters";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";

const nav_items = [
	{ icon: Home, route: "/dashboard", tip: "Home" },
	{ icon: Hospital, route: "/dashboard/appointments", tip: "Appointments " },
	{ icon: BookCheck, route: "/dashboard/billing", tip: "Billing" },
];

const LogOut = async ({
	redirectOnLogout,
}: { redirectOnLogout: () => void }) => {
	const { error } = await supabase.auth.signOut();

	if (error) {
		toast.error(error.message);
	} else {
		redirectOnLogout();
	}
};
export function Header() {
	const [open, onOpenChange] = useState(false);
	const navigate = useNavigate();
	const { isProfilePending, profile_data } = useProfile();
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
						<IconButton size="4" variant="ghost" mr={"2"}>
							<AlignJustify className="h-5 w-5" />
							<span className="sr-only">Toggle Menu</span>
						</IconButton>
					</SheetTrigger>
					<SheetContent
						side="left"
						className="overflow-auto bg-white/90 text-black"
					>
						<Box>
							<div className="flex justify-between my-6 items-center">
								<HeaderProfile
									branch={profile_data?.branch?.name as string}
									isProfilePending={isProfilePending}
									can_switch_branch={Boolean(profile_data?.can_switch_branch)}
									email={profile_data?.email as string}
									is_super_user={Boolean(profile_data?.can_switch_branch)}
									user_id={profile_data?.id as string}
								/>

								<SheetTitle className="text-[var(--accent-7)]">
									Brightedge
								</SheetTitle>
							</div>
							<Separator size={"4"} />

							<div className="flex flex-col w-full gap-2 mt-6">
								{services_routes.map((r) => (
									<div
										key={r.name}
										className="hover:bg-[var(--accent-3)] items-center p-2 w-full rounded-md"
									>
										<Link
											onClick={() => onOpenChange(!open)}
											to={r.route}
											className="justify-start w-full flex items-center gap-1"
										>
											<IconButton radius="full" variant="soft" size={"3"}>
												<r.icon className="h-5 w-5 " />
											</IconButton>
											{r.name}
										</Link>
									</div>
								))}

								<Separator size={"4"} />
								<SheetFooter className="mt-2">
									<div className="items-center p-2 w-full rounded-md flex justify-between">
										<Button
											color="red"
											onClick={() => {
												onOpenChange(!open),
													LogOut({
														redirectOnLogout: () => {
															navigate({ to: "/", replace: true });
														},
													});
											}}
										>
											<LogOutIcon className="size-5 mr-2" />
											Logout
										</Button>
										{(profile_data?.is_super_user ||
											profile_data?.has_access_to_config) && (
											<Button
												asChild
												variant="soft"
												onClick={() => onOpenChange(false)}
											>
												<Link
													search={{ active: "settings" }}
													className="flex gap-1"
													to="/dashboard/config"
												>
													<Cog /> Admin
												</Link>
											</Button>
										)}
									</div>
								</SheetFooter>
							</div>
						</Box>
					</SheetContent>
				</Sheet>

				<NavPatientFilters />
			</Flex>
			<Flex gap={"4"} align={"center"} justify={"center"}>
				{nav_items.map((i) => (
					<Flex key={i.tip} direction={"column"} align={"center"} gap={"3"}>
						<Tooltip content={i.tip}>
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
			<HeaderProfile
				branch={profile_data?.branch?.name as string}
				isProfilePending={isProfilePending}
				can_switch_branch={Boolean(profile_data?.can_switch_branch)}
				email={profile_data?.email as string}
				is_super_user={Boolean(profile_data?.can_switch_branch)}
				user_id={profile_data?.id as string}
			/>
		</Grid>
	);
}

const HeaderProfile = ({
	isProfilePending,
	email,
	user_id,
	is_super_user,
	can_switch_branch,
	branch,
}: {
	isProfilePending: boolean;
	email: string;
	user_id: string;
	branch: string;
	is_super_user: boolean;
	can_switch_branch: boolean;
}) => {
	const { data: branch_data, isPending: isBranchPending } = useBranchQuery();
	const queryClient = useQueryClient();

	const navigate = useNavigate();

	useEffect(() => {
		if (!isProfilePending) {
			if (!user_id) {
				navigate({ to: "/", replace: true });
			}
		}
	});

	return (
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
				<DropdownMenu.Content variant="soft" style={{ zIndex: 2000 }}>
					<DropdownMenu.Label>
						{isProfilePending ? <Spinner /> : email}
					</DropdownMenu.Label>
					<DropdownMenu.Item asChild>
						<Link to={`/dashboard/users/${user_id}`}>Update Profile</Link>
					</DropdownMenu.Item>
					{(is_super_user || can_switch_branch) && <DropdownMenu.Separator />}
					{(is_super_user || can_switch_branch) &&
						(isProfilePending ? (
							<DropdownMenu.Item>
								<Spinner />
							</DropdownMenu.Item>
						) : (
							<DropdownMenu.Sub>
								<DropdownMenu.Label>
									<Flex gap={"4"}>
										Branch{" "}
										<Badge radius="full" color="red">
											{branch}
										</Badge>
									</Flex>
								</DropdownMenu.Label>
								<DropdownMenu.SubTrigger>Switch Branch</DropdownMenu.SubTrigger>

								<DropdownMenu.SubContent style={{ zIndex: 2000 }}>
									{isBranchPending ? (
										<DropdownMenu.Item>
											<Spinner />
										</DropdownMenu.Item>
									) : (
										branch_data?.branch_data?.map((b) => (
											<DropdownMenu.Item
												key={b.id}
												onSelect={async () => {
													const { error, data } = await supabase
														.from("profile")
														.update({ branch_id: `${b.id}` })
														.eq("user_id", user_id as string);

													if (error && !data) {
														toast.message(error.message);
													} else {
														queryClient.resetQueries();
														toast.success(`successfully switched to ${b.name}`);
													}
												}}
											>
												{b.name}
											</DropdownMenu.Item>
										))
									)}
								</DropdownMenu.SubContent>
							</DropdownMenu.Sub>
						))}
					<DropdownMenu.Separator />
					<DropdownMenu.Item
						onClick={() =>
							LogOut({
								redirectOnLogout: () => {
									navigate({ to: "/", replace: true });
								},
							})
						}
						color="red"
					>
						Logout
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Flex>
	);
};
