import { ITodoList } from "@/types/todo.types";
import { FC } from "react";
import { TodoListListItem } from "./TodoListListItem";
import { VStack } from "@chakra-ui/react";
import { useTodoStateContext } from "@/context/TodoContext/useTodoStateContext";

export const TodoListView: FC = () => {
  const state = useTodoStateContext();
  return (
    <VStack gap={2} h="full" w="full" overflowY={"auto"} p={2}>
      {state.allTodoLists.map((listDetails) => (
        <TodoListListItem key={listDetails.uuid} {...listDetails} />
      ))}
    </VStack>
  );
};
