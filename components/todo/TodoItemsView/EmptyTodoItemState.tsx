import { VStack, Text } from "@chakra-ui/react";
import Image from "next/image";
export const EmptyTodoItemState = () => {
  return (
    <VStack alignItems={"center"} justifyContent={"center"} h={"full"}>
      <Image
        src={"/emptyState.svg"}
        width={400}
        height={400}
        alt="Empty state svg"
      />
      <Text mt={4} fontSize={"2xl"}>
        No todo items created!
      </Text>
    </VStack>
  );
};
