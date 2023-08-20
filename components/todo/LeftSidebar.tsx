import { Box } from "@chakra-ui/react";
import { AddNewTodoListButton } from "./AddNewTodoListButton";
import { FC } from "react";
import { TodoListView } from "./TodoListView";

export const LeftSidebar: FC = () => {
  return (
    <Box
      w="full"
      h="full"
      display={"flex"}
      justifyContent={"center"}
      position={"relative"}
      background={"whitesmoke"}
    >
      <Box
        height={"calc(95% - 16px)"}
        position={"absolute"}
        top={"0"}
        width={"100%"}
      >
        <TodoListView />
      </Box>
      <Box
        position={"absolute"}
        bottom={0}
        width={"full"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"5%"}
        mb={2}
      >
        <AddNewTodoListButton />
      </Box>
    </Box>
  );
};
