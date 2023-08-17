import { checkIfUserLoggedInInternalPage } from "@/utils/auth.utils";
import { Box } from "@chakra-ui/react";

import { GetServerSidePropsContext } from "next/types";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await checkIfUserLoggedInInternalPage(ctx);
};
export default function Home() {
  return <Box marginTop={1}>Yeah... i am logged in!!!</Box>;
}
