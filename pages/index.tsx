import { todoApi } from "@/constants/urls";
import { getApi } from "@/utils/api.utils";
import { checkIfUserLoggedInInternalPage } from "@/utils/auth.utils";
import { Box } from "@chakra-ui/react";

import { GetServerSidePropsContext } from "next/types";
import { useEffect } from "react";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await checkIfUserLoggedInInternalPage(ctx);
};
export default function Home() {
  useEffect(() => {
    (async () => {
      try {
        const res = await getApi(todoApi.getUserTodoList);

        console.log(res);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return <Box marginTop={1}>Yeah... i am logged in!!!</Box>;
}
