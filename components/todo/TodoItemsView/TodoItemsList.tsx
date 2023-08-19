import { Box, Spinner, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { TodoItemView } from "./TodoItemView";
import { useTodoStateContext } from "@/context/TodoContext/useTodoStateContext";
import { EmptyTodoItemState } from "./EmptyTodoItemState";

export const TodoItemsList: FC = () => {
  const { selectedTodoListItems: todoItems, isAllTodoItemsLoading } =
    useTodoStateContext();
  if (isAllTodoItemsLoading) {
    return (
      <Box
        h="full"
        w="full"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Spinner />
      </Box>
    );
  }
  if (todoItems.length === 0) {
    return <EmptyTodoItemState />;
  }
  const sortedTodoItems = todoItems.sort((item2, item1) => {
    if (item2.isChecked && !item1.isChecked) {
      return 1;
    }
    if (
      item2.isChecked &&
      item1.isChecked &&
      new Date(item1.createdAt) < new Date(item2.createdAt)
    ) {
      return 1;
    }
    if (
      !item2.isChecked &&
      !item1.isChecked &&
      new Date(item1.createdAt) < new Date(item2.createdAt)
    ) {
      return 1;
    }
    return -1;
  });
  return (
    <VStack gap={4} alignItems={"flex-start"}>
      {sortedTodoItems.map((todoItemDetails) => (
        <TodoItemView key={todoItemDetails.uuid} {...todoItemDetails} />
      ))}
    </VStack>
  );
};
