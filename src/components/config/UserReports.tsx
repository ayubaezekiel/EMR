import { CreateUserReportForm } from "@/forms/config/UserReportForm";
import { useUserReport } from "@/lib/hooks";
import { Callout, Flex, Heading, Spinner } from "@radix-ui/themes";
import { FileQuestion } from "lucide-react";
import { DataTable } from "../table/DataTable";
import { user_reports_column } from "../table/columns/user_reports";
import { useMemo } from "react";

export function UserReports() {
	const { isUserReportPending, user_report_data } = useUserReport();

	const report_data = useMemo(
		() =>
			user_report_data?.map((r) => ({
				...r,
				document_types: r.document_types?.name,
				profile: `${r.profile?.first_name} ${r.profile?.middle_name ?? ""} ${r.profile?.last_name}`,
			})),
		[user_report_data],
	);
	return (
		<div>
			<Flex mb={"3"} justify={"between"}>
				<Heading>Reports Uploaded</Heading>
				<CreateUserReportForm />
			</Flex>
			{user_report_data?.length === 0 ? (
				<Flex justify={"center"}>
					<Callout.Root mt={"9"}>
						<Callout.Icon>
							<FileQuestion />
						</Callout.Icon>
						<Callout.Text ml={"1"}>No result found</Callout.Text>
					</Callout.Root>
				</Flex>
			) : (
				<div>
					{isUserReportPending ? (
						<Spinner />
					) : (
						<DataTable
							filterLabel="filter by name..."
							filterer="name"
							columns={user_reports_column}
							data={report_data ?? []}
						/>
					)}
				</div>
			)}
		</div>
	);
}
