import { UserAuthForm } from "@/components/auth/UserAuthForm";
import { authApi } from "@/constants/urls";
import {
  AuthType,
  IUserDetails,
  OnUserSignUpAction,
  UserSignUp,
} from "@/types/common";
import { postApi } from "@/utils/api.utils";

const Login = () => {
  const onSignUpButtonClick: OnUserSignUpAction = async ({
    email,
    password,
    name,
  }: UserSignUp) => {
    await postApi<IUserDetails>(authApi.signUp, {
      userDetails: {
        emailId: email,
        password,
        name,
      },
    });
  };
  return (
    <UserAuthForm authType={AuthType.SIGNUP} userAction={onSignUpButtonClick} />
  );
};

export default Login;
