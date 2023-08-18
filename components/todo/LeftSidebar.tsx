import { Box } from "@chakra-ui/react";
import { AddNewTodoListButton } from "./AddNewTodoListButton";

export const LeftSidebar = () => {
  return (
    <Box
      w="full"
      h="full"
      display={"flex"}
      justifyContent={"center"}
      position={"relative"}
    >
      <Box position={"absolute"} bottom={0} mb={2}>
        <AddNewTodoListButton />
      </Box>
    </Box>
  );
};
