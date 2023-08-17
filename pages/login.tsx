import { UserAuthForm } from "@/components/auth/UserAuthForm";
import { authApi } from "@/constants/urls";
import {
  AuthType,
  IUserDetails,
  OnUserLoginAction,
  UserLogin,
} from "@/types/common";
import { postApi } from "@/utils/api.utils";
import { checkIfUserLoggedInAuthPage } from "@/utils/auth.utils";
import { GetServerSidePropsContext } from "next/types";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await checkIfUserLoggedInAuthPage(ctx);
};

const Login = () => {
  const onLoginButtonClick: OnUserLoginAction = async ({
    email,
    password,
  }: UserLogin) => {
    await postApi<IUserDetails>(authApi.signIn, {
      emailId: email,
      password,
    });
  };
  return (
    <UserAuthForm authType={AuthType.LOGIN} userAction={onLoginButtonClick} />
  );
};

export default Login;
