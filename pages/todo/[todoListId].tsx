import { fetchAllTodoItems, fetchTodoList } from "@/api/todo.apisCalls";
import { LeftSidebar } from "@/components/todo/LeftSidebar";
import { mainRoutes } from "@/constants/routes";
import { TodoProvider } from "@/context/TodoContext";
import { ITodoItem, ITodoList } from "@/types/todo.types";
import { checkIfUserLoggedInInternalPage } from "@/utils/auth.utils";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { cloneDeep, get, merge } from "lodash";
import { GetServerSidePropsContext, NextPage } from "next";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const userParams = await checkIfUserLoggedInInternalPage(ctx);
  const listId = get(ctx, "params.todoListId", "") as string;
  if (userParams.props?.isAuthenticated) {
    try {
      const response = await fetchAllTodoItems(listId, userParams.props.token);
      const selectedTodoListItems = get(response, "data.data.allTodo", []);

      return merge(userParams, {
        props: {
          selectedTodoListItems,
        },
      });
    } catch (e) {
      return {
        redirect: {
          permanent: false,
          destination: mainRoutes.root(),
        },
      };
    }
  }
  return merge(cloneDeep(userParams), {
    props: {
      todoItems: [],
    },
  });
};
interface ITodoListProps {
  selectedTodoListItems: ITodoItem[];
  allTodoList: ITodoList[];
}
const TodoList: NextPage<ITodoListProps> = ({
  allTodoList,
  selectedTodoListItems,
}) => {
  return (
    <TodoProvider>
      <Box width={"full"} h={"full"}>
        <Grid h="full" templateColumns="1fr 4fr">
          <GridItem>
            <LeftSidebar allTodoList={allTodoList} />
          </GridItem>
          <GridItem>
            <Box w="full" h="full" background={"whitesmoke"} />
          </GridItem>
        </Grid>
      </Box>
    </TodoProvider>
  );
};

export default TodoList;
