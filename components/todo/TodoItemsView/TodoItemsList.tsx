import { VStack } from "@chakra-ui/react";
import { FC } from "react";
import { TodoItemView } from "./TodoItemView";
import { useTodoStateContext } from "@/context/TodoContext/useTodoStateContext";
import { EmptyTodoItemState } from "./EmptyTodoItemState";

export const TodoItemsList: FC = () => {
  const { selectedTodoListItems: todoItems } = useTodoStateContext();
  if (todoItems.length === 0) {
    return <EmptyTodoItemState />;
  }
  return (
    <VStack gap={4} alignItems={"flex-start"}>
      {todoItems.map((todoItemDetails) => (
        <TodoItemView key={todoItemDetails.uuid} {...todoItemDetails} />
      ))}
    </VStack>
  );
};
