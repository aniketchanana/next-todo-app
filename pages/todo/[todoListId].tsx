import { fetchAllTodoItems, fetchTodoList } from "@/api/todo.apisCalls";
import { LeftSidebar } from "@/components/todo/LeftSidebar";
import { RightSideSection } from "@/components/todo/RightSideSection";
import { mainRoutes } from "@/constants/routes";
import { TodoProvider } from "@/context/TodoContext";
import {
  setAllTodoItemLoading,
  setAllTodoItems,
} from "@/context/TodoContext/actions";
import { useTodoDispatchContext } from "@/context/TodoContext/useTodoDispatchContext";
import { ITodoItem, ITodoList } from "@/types/todo.types";
import { checkIfUserLoggedInInternalPage } from "@/utils/auth.utils";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { get } from "lodash";
import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await checkIfUserLoggedInInternalPage(ctx);
};
interface ITodoListProps {
  selectedTodoListItems: ITodoItem[];
  allTodoList: ITodoList[];
}
const TodoList: NextPage<ITodoListProps> = ({ allTodoList }) => {
  const todoDispatch = useTodoDispatchContext();
  const router = useRouter();
  const selectedTodoListId = router.query.todoListId as string;

  useEffect(() => {
    (async () => {
      console.log("i am here");
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

  return (
    <Box width={"full"} h={"full"}>
      <Grid h="full" templateColumns="1fr 4fr">
        <GridItem>
          <LeftSidebar allTodoList={allTodoList} />
        </GridItem>
        <GridItem>
          <RightSideSection />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default TodoList;
