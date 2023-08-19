import { DeleteLineIcon } from "@/components/common/Icons";
import { ITodoItem } from "@/types/todo.types";
import { Box, Checkbox, HStack } from "@chakra-ui/react";
import { FC } from "react";
import { ActionIconContainer } from "../ActionItemContainer";
import { deleteTodoItem } from "@/api/todo.apisCalls";
import { useRouter } from "next/router";
import { useCustomToast } from "@/customHooks/useCustomToast";
import { useTodoDispatchContext } from "@/context/TodoContext/useTodoDispatchContext";
import { deleteTodoItemAction } from "@/context/TodoContext/actions";

interface ITodoItemProps extends ITodoItem {}
export const TodoItemView: FC<ITodoItem> = ({
  isChecked,
  text,
  uuid: todoItemId,
}) => {
  const router = useRouter();
  const toast = useCustomToast();
  const todoDispatch = useTodoDispatchContext();
  const handlePaste = (e: any) => {
    e.preventDefault();

    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };
  const deleteTodoItemClick = async () => {
    try {
      const todoListId = router.query.todoListId as string;
      await deleteTodoItem(todoListId, todoItemId);
      todoDispatch(deleteTodoItemAction(todoItemId));
      toast({
        status: "success",
        title: "Delete todo item",
      });
    } catch (e) {
      toast({
        status: "error",
        title: "Unable to delete todo item",
      });
    }
  };
  const updateTodoItem = (todoId: string) => {};
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
      <HStack gap={2} alignItems={"flex-start"} w="full">
        <Checkbox colorScheme="gray" defaultChecked={isChecked} mt={"5px"} />

        <Box
          contentEditable={true}
          w="full"
          border={"none"}
          onPaste={handlePaste}
        >
          {text}
        </Box>
      </HStack>
      <ActionIconContainer iconColor={"red"} onClick={deleteTodoItemClick}>
        <DeleteLineIcon />
      </ActionIconContainer>
    </HStack>
  );
};
