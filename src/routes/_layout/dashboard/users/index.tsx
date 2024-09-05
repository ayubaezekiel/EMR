import { Card, Flex, Heading, Spinner } from "@radix-ui/themes";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getUsers } from "../../../../actions/actions";
import { InviteUser } from "../../../../components/InviteUser";
import { DataTable } from "../../../../components/table/DataTable";
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

	const all_users: User[] = users_data?.user_data.users ?? [];

	return (
		<div>
			{isUsersPending ? (
				<Spinner />
			) : (
				<DataTable
					columns={users_column}
					data={all_users}
					filterLabel="filter by email..."
					filterer="email"
				/>
			)}
		</div>
	);
};
