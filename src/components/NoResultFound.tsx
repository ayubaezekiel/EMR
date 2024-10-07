import { Callout, Flex } from "@radix-ui/themes";
import { FileQuestion } from "lucide-react";

export function NoResultFound() {
  return (
    <Flex justify={"center"}>
      <Callout.Root mt={"9"}>
        <Callout.Icon>
          <FileQuestion />
        </Callout.Icon>
        <Callout.Text ml={"1"}>No result found</Callout.Text>
      </Callout.Root>
    </Flex>
  );
}
