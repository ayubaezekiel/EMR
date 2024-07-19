import { Box, Button, Card, Heading } from "@radix-ui/themes";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { nursing_routes } from "../../lib/constants";

export const Route = createFileRoute("/_layout/dashboard/nursing")({
  component: () => (
    <div>
      <Heading mb={"3"}>Nursing</Heading>
      <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-4">
        {nursing_routes.map((p) => (
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
    </div>
  ),
});
