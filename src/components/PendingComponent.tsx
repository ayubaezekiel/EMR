import { LoadingOverlay, MantineProvider } from "@mantine/core";

export default function PendingComponent() {
  return (
    <MantineProvider>
      <LoadingOverlay
        visible
        zIndex={1000}
        overlayProps={{ blur: 2, top: "0", bottom: "0" }}
      />
    </MantineProvider>
  );
}
