import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { ActionIconContainer } from "./ActionItemContainer";
import { DeleteLineIcon } from "../common/Icons";
import { Button } from "../common/Button";
import { useTodoStateContext } from "@/context/TodoContext/useTodoStateContext";
import { useCustomToast } from "@/customHooks/useCustomToast";
import { deleteTodoList } from "@/api/todo.apisCalls";
import { useTodoDispatchContext } from "@/context/TodoContext/useTodoDispatchContext";
import { deleteTodoListAction } from "@/context/TodoContext/actions";
import { useRouter } from "next/router";
import { mainRoutes, todoRoutes } from "@/constants/routes";

export const DeletePopoverWithConfirmation: FC<{ todoListId: string }> = ({
  todoListId,
}) => {
  const { allTodoLists = [] } = useTodoStateContext();
  const todoDispatch = useTodoDispatchContext();
  const toast = useCustomToast();
  const router = useRouter();
  const currTodoList = useMemo(() => {
    return allTodoLists.find((listDetails) => listDetails.uuid === todoListId);
  }, [allTodoLists, todoListId]);
  const handleTodoListDeletion = async () => {
    try {
      await deleteTodoList(todoListId);
      if (allTodoLists.length === 1) {
        router.push(mainRoutes.root());
      } else if (
        allTodoLists.length > 1 &&
        todoListId === router.query.todoListId
      ) {
        const firstTodoList = allTodoLists[1];
        router.push(todoRoutes.todo(firstTodoList.uuid));
      }
      todoDispatch(deleteTodoListAction(todoListId));
      toast({
        title: `${currTodoList?.name} deleted`,
        status: "success",
      });
    } catch (e: any) {
      toast({
        ...e.response.data,
        status: "error",
      });
    }
  };
  return (
    <Popover
      key={todoListId}
      eventListeners={true}
      placement="right"
      strategy="fixed"
      trigger="click"
    >
      <PopoverTrigger>
        <Box>
          <ActionIconContainer iconColor={"red"}>
            <DeleteLineIcon />
          </ActionIconContainer>
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          <Box display={"flex"}>
            <Text
              style={{
                hyphens: "auto",
              }}
            >
              {`Are you sure you want to delete ${currTodoList?.name || ""}?`}
            </Text>
          </Box>
        </PopoverHeader>
        <PopoverArrow bg="blue.800" />
        <PopoverCloseButton />
        <PopoverBody>
          All the todo items under this list will be deleted and cannot be
          recovered.
        </PopoverBody>
        <PopoverFooter>
          <Button colorScheme="red" onClick={handleTodoListDeletion}>
            Delete
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
