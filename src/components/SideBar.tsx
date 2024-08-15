import { Link } from "@tanstack/react-router";
import { services_routes } from "../lib/constants";
import { Home } from "lucide-react";
import { ScrollArea } from "@radix-ui/themes";

export function Sidebar() {
	return (
		<ScrollArea type="always" scrollbars="vertical">
			<div className="flex flex-col w-full gap-4 mt-24 p-6">
				<div className="hover:bg-[var(--accent-3)] p-2 w-full rounded-md">
					<Link
						to={"/dashboard"}
						className="justify-start w-full flex items-center gap-1"
					>
						<Home className="h-5 w-5 " />
						Dashboard
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
		</ScrollArea>
	);
}
