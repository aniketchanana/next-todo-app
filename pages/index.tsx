import { AddNewTodoListButton } from "@/components/todo/AddNewTodoListButton";
import { todoEndpoints } from "@/constants/endPoints";
import { todoRoutes } from "@/constants/routes";
import { IFetchTodoListResponse, ITodoItem } from "@/types/todo.types";
import { IUserDetails } from "@/types/user.types";
import { getApi } from "@/utils/api.utils";
import { checkIfUserLoggedInInternalPage } from "@/utils/auth.utils";
import { Box } from "@chakra-ui/react";
import { get } from "lodash";
import Image from "next/image";

import { GetServerSidePropsContext, NextPage } from "next/types";
const fetchFirstTodoList = async (token) => {
  try {
    const res = await getApi<IFetchTodoListResponse>(
      `${todoEndpoints.getUserTodoList}?pageNumber=1&pageSize=1`,
      {
        token,
      }
    );
    return res.data;
  } catch (e: any) {
    throw e;
  }
};
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const userParams = await checkIfUserLoggedInInternalPage(ctx);
  try {
    if (userParams.props?.isAuthenticated) {
      const res = await fetchFirstTodoList(userParams.props.token);
      const allTodoLists = get(res, "data.allList", []);

      if (allTodoLists.length > 0) {
        return {
          redirect: {
            permanent: false,
            destination: todoRoutes.todo(allTodoLists[0].uuid),
          },
        };
      }
    }
  } catch {}

  return userParams;
};

interface IHomePageProps {
  userDetails: { user: IUserDetails };
  isAuthenticated: boolean;
  token: string;
  allList: Array<ITodoItem>;
}

const Home: NextPage<IHomePageProps> = () => {
  return (
    <Box className="flex w-full h-full items-center justify-center flex-col">
      <Box mb={4}>
        <Image
          src={"/emptyState.svg"}
          width={400}
          height={400}
          alt="Empty state svg"
        />
      </Box>
      <AddNewTodoListButton />
    </Box>
  );
};

export default Home;
