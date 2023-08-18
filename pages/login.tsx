import { UserAuthForm } from "@/components/auth/UserAuthForm";
import { authEndPoints } from "@/constants/endPoints";
import {
  AuthType,
  IUserDetails,
  OnUserLoginAction,
  UserLogin,
} from "@/types/user.types";
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
    await postApi<IUserDetails>(authEndPoints.signIn, {
      emailId: email,
      password,
    });
  };
  return (
    <UserAuthForm authType={AuthType.LOGIN} userAction={onLoginButtonClick} />
  );
};

export default Login;
