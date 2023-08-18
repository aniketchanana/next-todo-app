import { ITodoList } from "@/types/todo.types";
import { FC } from "react";
import { TodoListListItem } from "./TodoListListItem";
import { Box, VStack } from "@chakra-ui/react";
import { useTodoStateContext } from "@/context/TodoContext/useTodoStateContext";

interface ITodoListViewProps {
  allTodoList: ITodoList[];
}
export const TodoListView: FC<ITodoListViewProps> = ({ allTodoList }) => {
  const state = useTodoStateContext();
  return (
    <VStack gap={2} h="full" w="full" px={2} mt={2}>
      {state.allTodoLists.map((listDetails) => (
        <TodoListListItem key={listDetails.uuid} {...listDetails} />
      ))}
    </VStack>
  );
};
