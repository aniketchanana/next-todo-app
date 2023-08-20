import { Box, VStack } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { TodoItemView } from "./TodoItemView";
import { useTodoStateContext } from "@/context/TodoContext/useTodoStateContext";
import { EmptyTodoItemState } from "./EmptyTodoItemState";
import { FullScreenSpinner } from "@/components/common/FullScreenSpinner";
import { cloneDeep } from "lodash";

export const TodoItemsList: FC = () => {
  const { selectedTodoListItems: todoItems, isAllTodoItemsLoading } =
    useTodoStateContext();
  if (isAllTodoItemsLoading) {
    return <FullScreenSpinner />;
  }
  if (todoItems.length === 0) {
    return <EmptyTodoItemState />;
  }
  const sortedTodoItems = useMemo(() => {
    const _todoItems = cloneDeep(todoItems);
    return _todoItems.sort((item2, item1) => {
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
  }, [todoItems]);
  return (
    <VStack gap={4} alignItems={"flex-start"}>
      {sortedTodoItems.map((todoItemDetails) => (
        <TodoItemView key={todoItemDetails.uuid} {...todoItemDetails} />
      ))}
    </VStack>
  );
};
