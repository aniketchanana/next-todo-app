import { ITodoList } from "@/types/todo.types";
import { Box, HStack } from "@chakra-ui/react";
import { FC } from "react";
import { Text } from "@chakra-ui/react";
import { DeleteLineIcon, PencilLineIcon } from "../common/Icons";

const ActionIconContainer = ({ children, iconColor }) => {
  return (
    <Box
      color={`${iconColor}.300`}
      transform={"scale(1)"}
      transition={"0.1s all ease-in"}
      _hover={{
        color: iconColor,
        transform: "scale(1.2)",
      }}
    >
      {children}
    </Box>
  );
};
export const TodoListListItem: FC<ITodoList> = ({ name }) => {
  return (
    <Box
      px={3}
      py={2}
      w="full"
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      cursor={"pointer"}
      background="gray.200"
      fontWeight={"normal"}
      borderRadius={"base"}
      width={"100%"}
    >
      <Box textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"}>
        {name}
      </Box>
      <HStack gap={1}>
        <ActionIconContainer iconColor={"teal"}>
          <PencilLineIcon />
        </ActionIconContainer>
        <ActionIconContainer iconColor={"red"}>
          <DeleteLineIcon />
        </ActionIconContainer>
      </HStack>
    </Box>
  );
};
