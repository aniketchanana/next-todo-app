import { LoginUser } from "@/api/auth.apiCalls";
import { UserAuthForm } from "@/components/auth/UserAuthForm";
import { AuthType } from "@/types/user.types";
import { checkIfUserLoggedInAuthPage } from "@/utils/auth.utils";
import { GetServerSidePropsContext } from "next/types";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await checkIfUserLoggedInAuthPage(ctx);
};

const Login = () => {
  return <UserAuthForm authType={AuthType.LOGIN} userAction={LoginUser} />;
};

export default Login;
