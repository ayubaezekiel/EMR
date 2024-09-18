import {
	Box,
	Button,
	Callout,
	Card,
	Flex,
	Heading,
	Spinner,
} from "@radix-ui/themes";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { services_routes } from "../../../lib/constants";
import { useCenter } from "../../../lib/hooks";

export const Route = createLazyFileRoute("/_layout/dashboard/")({
	component: () => (
		<>
			<div className="flex justify-between items-center">
				<Heading mb={"3"}>Dashboard</Heading>
			</div>
			<Warning />
			<div className="grid md:grid-cols-2 gap-4 lg:grid-cols-4 mt-10">
				{services_routes.map((p) => (
					<Card>
						<Box height={"100px"} key={p.route}>
							<Link to={p.route} className="w-full h-full ">
								<Button
									variant="ghost"
									style={{ width: "100%", height: "100%" }}
								>
									<p.icon /> {p.name}
								</Button>
							</Link>
						</Box>
					</Card>
				))}
			</div>
		</>
	),
});

const Warning = () => {
	const { center_data, isCenterPending } = useCenter();

	return isCenterPending ? (
		<Flex justify={"center"} align={"center"}>
			<Spinner />
		</Flex>
	) : (
		!center_data?.id.length && (
			<Callout.Root color="red" className="group">
				<Callout.Icon>
					<TriangleAlert />
				</Callout.Icon>
				<Callout.Text>
					Welcome,{" "}
					<Link to="/dashboard/config" className="group-hover:underline">
						click here
					</Link>{" "}
					to set up your center and forms in the configuration dashboard or
					visit the link on the sidebar
				</Callout.Text>
			</Callout.Root>
		)
	);
};
