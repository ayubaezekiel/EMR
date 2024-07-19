import { Container, Flex, Text } from "@radix-ui/themes";

export function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="bg-[var(--accent-3)]">
      <Container p={"6"}>
        <Flex justify={"center"} direction={"column"} align={"center"}>
          <Text align={"center"}>Privacy & Terms</Text>
          <Text>Brightedge Technology &copy; {date}</Text>
        </Flex>
      </Container>
    </footer>
  );
}
