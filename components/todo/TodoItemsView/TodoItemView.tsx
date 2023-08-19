import { DeleteLineIcon } from "@/components/common/Icons";
import { ITodoItem } from "@/types/todo.types";
import { Box, Checkbox, HStack, useOutsideClick } from "@chakra-ui/react";
import { FC, useRef, useState } from "react";
import { ActionIconContainer } from "../ActionItemContainer";
import { deleteTodoItem, updateTodoItemApi } from "@/api/todo.apisCalls";
import { useRouter } from "next/router";
import { useCustomToast } from "@/customHooks/useCustomToast";
import { useTodoDispatchContext } from "@/context/TodoContext/useTodoDispatchContext";
import {
  deleteTodoItemAction,
  updateTodoItemAction,
} from "@/context/TodoContext/actions";
import { isEmpty, isEqual } from "lodash";

interface ITodoItemProps extends ITodoItem {}
export const TodoItemView: FC<ITodoItem> = ({
  isChecked,
  text,
  uuid: todoItemId,
}) => {
  const router = useRouter();
  const toast = useCustomToast();
  const todoDispatch = useTodoDispatchContext();
  const todoListId = router.query.todoListId as string;
  const divInputRef = useRef<HTMLElement>();
  const [isEditingMode, setIsEditingMode] = useState(false);

  useOutsideClick({
    ref: divInputRef as any,
    handler: () => {
      divInputRef.current?.blur();
      setIsEditingMode(false);
    },
  });
  const handlePaste = (e: any) => {
    e.preventDefault();

    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };
  const deleteTodoItemHandler = async () => {
    try {
      await deleteTodoItem(todoListId, todoItemId);
      todoDispatch(deleteTodoItemAction(todoItemId));
      // toast({
      //   status: "success",
      //   title: "Delete todo item",
      // });
    } catch (e) {
      toast({
        status: "error",
        title: "Unable to delete todo item",
      });
    }
  };

  const updateTodoItem = async (
    updates: Partial<Pick<ITodoItem, "isChecked" | "text">>
  ) => {
    try {
      await updateTodoItemApi(todoListId, todoItemId, updates);
      todoDispatch(updateTodoItemAction(todoItemId, updates));
    } catch (e: any) {
      toast({
        status: "error",
        ...e.response.data,
      });
    }
  };
  const markTodoItem = async () => {
    await updateTodoItem({ isChecked: true });
  };
  const unMarkTodoItem = async () => {
    await updateTodoItem({ isChecked: false });
  };
  const updateTodoItemText = async (updatedText) => {
    await updateTodoItem({ text: updatedText });
  };
  const startEditing = () => {
    setIsEditingMode(true);
    setTimeout(() => {
      divInputRef.current?.focus();
    }, 0);
  };
  const handleTextInputBlur = (e: any) => {
    const updatedText = e.target.innerText;
    if (isEmpty(updatedText)) {
      deleteTodoItemHandler();
    }
    if (!isEqual(updatedText, text)) {
      updateTodoItemText(updatedText);
    }
  };

  return (
    <HStack
      p={4}
      py={3}
      background={"whitesmoke"}
      w="full"
      justifyContent={"space-between"}
      alignItems={"flex-start"}
      rounded={"base"}
    >
      <HStack gap={2} alignItems={"flex-start"} w="full">
        <Checkbox
          colorScheme="gray"
          isChecked={isChecked}
          mt={"5px"}
          onChange={isChecked ? unMarkTodoItem : markTodoItem}
        />

        <Box
          contentEditable={!isChecked && isEditingMode}
          w="full"
          border={"none"}
          onPaste={handlePaste}
          textDecoration={isChecked ? "line-through" : ""}
          onBlur={handleTextInputBlur}
          ref={divInputRef as any}
          onClick={startEditing}
        >
          {text}
        </Box>
      </HStack>
      <ActionIconContainer iconColor={"red"} onClick={deleteTodoItemHandler}>
        <DeleteLineIcon />
      </ActionIconContainer>
    </HStack>
  );
};
