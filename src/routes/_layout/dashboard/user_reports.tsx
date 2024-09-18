import { UserReports } from "@/components/config/UserReports";
import { Heading } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/dashboard/user_reports")({
	component: () => (
		<div>
			<Heading mb={"3"}>User Reports</Heading>
			<div>
				<UserReports />
			</div>
		</div>
	),
});
