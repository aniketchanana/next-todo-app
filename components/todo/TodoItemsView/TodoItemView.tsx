import { DeleteLineIcon } from "@/components/common/Icons";
import { ITodoItem } from "@/types/todo.types";
import { Box, Checkbox, HStack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { ActionIconContainer } from "../ActionItemContainer";

interface ITodoItemProps extends ITodoItem {}
export const TodoItemView: FC<ITodoItem> = ({ isChecked, text }) => {
  return (
    <HStack
      p={4}
      py={3}
      background={"whitesmoke"}
      w="full"
      justifyContent={"space-between"}
      alignItems={"center"}
      rounded={"base"}
    >
      <HStack gap={2} alignItems={"center"}>
        <Checkbox colorScheme="gray" isChecked={isChecked} />
        <Text>{text}</Text>
      </HStack>
      <ActionIconContainer iconColor={"red"}>
        <DeleteLineIcon />
      </ActionIconContainer>
    </HStack>
  );
};
