import { Box, Input } from "@chakra-ui/react";
import { AddTodoInput } from "./AddTodoItemInput";
import { useTodoStateContext } from "@/context/TodoContext/useTodoStateContext";
import { TodoItemsList } from "./TodoItemsView/TodoItemsList";
import { useEffect, useRef } from "react";

export const RightSideSection = () => {
  const listRef = useRef<any>();
  const scrollToLastElement = () => {
    setTimeout(() => {
      listRef.current.scrollTop += listRef.current?.scrollHeight + 1000;
    }, 100);
  };

  return (
    <Box w="full" h="full" display={"flex"} position={"relative"}>
      <Box
        as="div"
        left={0}
        height={"calc(88% - 32px)"}
        position={"absolute"}
        top={"0"}
        width={"100%"}
        px={40}
        mt={8}
        ref={listRef}
        overflowY={"auto"}
      >
        <TodoItemsList />
      </Box>
      <Box
        position={"absolute"}
        bottom={0}
        left={0}
        width={"full"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        height={"12%"}
        px={40}
      >
        <AddTodoInput scrollToLastElement={scrollToLastElement} />
      </Box>
    </Box>
  );
};
