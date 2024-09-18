import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => (
		<>
			<Outlet />
		</>
	),
});

// const PermissionDenied = () => {
// 	return (
// 		<Flex>
// 			<Callout.Root color="red">
// 				<Callout.Icon>
// 					<AlertTriangle />
// 				</Callout.Icon>
// 				<Callout.Text>
// 					Permission denied, please ask for more previledge to access this page
// 				</Callout.Text>
// 			</Callout.Root>
// 		</Flex>
// 	);
// };
