import { FullScreenSpinner } from "@/components/common/FullScreenSpinner";
import { LeftSidebar } from "@/components/todo/LeftSidebar";
import { RightSideSection } from "@/components/todo/RightSideSection";
import { TodoProvider, TodoStateContext } from "@/context/TodoContext";
import { ITodoItem, ITodoList } from "@/types/todo.types";
import { checkIfUserLoggedInInternalPage } from "@/utils/auth.utils";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { GetServerSidePropsContext, NextPage } from "next";
import Image from "next/image";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await checkIfUserLoggedInInternalPage(ctx);
};
interface ITodoListProps {
  selectedTodoListItems: ITodoItem[];
  allTodoList: ITodoList[];
}
const TodoList: NextPage<ITodoListProps> = ({ allTodoList }) => {
  return (
    <TodoProvider>
      <TodoStateContext.Consumer>
        {({ isAllTodoListLoading, allTodoLists }) => {
          if (isAllTodoListLoading) {
            <FullScreenSpinner />;
          }
          if (allTodoLists.length <= 0) {
            return (
              <Box
                w="full"
                h="full"
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
              >
                <Image
                  src={"/emptyState.svg"}
                  width={400}
                  height={400}
                  alt="Empty state svg"
                />
              </Box>
            );
          }
          return (
            <Box width={"full"} h={"full"}>
              <Grid h="full" templateColumns="1fr 4fr">
                <GridItem>
                  <LeftSidebar />
                </GridItem>
                <GridItem>
                  <RightSideSection />
                </GridItem>
              </Grid>
            </Box>
          );
        }}
      </TodoStateContext.Consumer>
    </TodoProvider>
  );
};

export default TodoList;
