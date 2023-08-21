import { Box, HStack, Input } from "@chakra-ui/react";
import { AddTodoInput } from "./AddTodoItemInput";
import { TodoItemsList } from "./TodoItemsView/TodoItemsList";
import { useEffect, useRef } from "react";
import { useTodoDispatchContext } from "@/context/TodoContext/useTodoDispatchContext";
import { useRouter } from "next/router";
import {
  setAllTodoItemLoading,
  setAllTodoItems,
} from "@/context/TodoContext/actions";
import { fetchAllTodoItems } from "@/api/todo.apisCalls";
import { authRoutes, mainRoutes } from "@/constants/routes";
import { get } from "lodash";
import { LogoutLineIcon } from "../common/Icons";
import { useCustomToast } from "@/customHooks/useCustomToast";
import { logoutUserApi } from "@/api/auth.apiCalls";
import { ActionIconContainer } from "./ActionItemContainer";

export const RightSideSection = () => {
  const listRef = useRef<any>();
  const scrollToLastElement = () => {
    setTimeout(() => {
      listRef.current.scrollTop += listRef.current?.scrollHeight + 1000;
    }, 100);
  };

  const todoDispatch = useTodoDispatchContext();
  const router = useRouter();
  const selectedTodoListId = router.query.todoListId as string;
  const toast = useCustomToast();

  useEffect(() => {
    (async () => {
      todoDispatch(setAllTodoItemLoading(true));
      try {
        const response = await fetchAllTodoItems(selectedTodoListId);
        const selectedTodoListItems = get(response, "data.allTodo", []);
        todoDispatch(setAllTodoItems(selectedTodoListItems));
      } catch (e: any) {
        router.push(mainRoutes.root());
        todoDispatch(setAllTodoItems([]));
      } finally {
        todoDispatch(setAllTodoItemLoading(false));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTodoListId]);

  const logoutUser = async () => {
    try {
      await logoutUserApi();
      router.push(authRoutes.login());
    } catch (e: any) {
      toast({
        ...e.response.data,
      });
    }
  };

  return (
    <Box w="full" h="full" position={"relative"}>
      <HStack
        fontSize={"2xl"}
        color={"gray.500"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        px={12}
        cursor={"pointer"}
      >
        <ActionIconContainer
          onClick={logoutUser}
          iconColor="gray"
          label="Logout"
        >
          <LogoutLineIcon />
        </ActionIconContainer>
      </HStack>
      <Box
        as="div"
        left={0}
        height={"calc(88% - 40px)"}
        position={"absolute"}
        top={"0"}
        width={"100%"}
        px={40}
        mt={10}
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
