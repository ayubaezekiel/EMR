import { Box, Button, Card, Heading } from "@radix-ui/themes";
import { createLazyFileRoute } from "@tanstack/react-router";
import { services_routes } from "../../../lib/constants";
import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createLazyFileRoute("/_layout/dashboard/")({
	component: () => (
		<>
			<div className="flex justify-between items-center">
				<Heading mb={"3"}>Dashboard</Heading>
			</div>

			<div className="grid md:grid-cols-2 gap-4 lg:grid-cols-4 mt-10">
				<Card>
					<Box height={"100px"}>
						<Link to={"/dashboard"} className="w-full h-full ">
							<Button variant="ghost" style={{ width: "100%", height: "100%" }}>
								<Home /> Dashboard
							</Button>
						</Link>
					</Box>
				</Card>

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
