import { UserAuthForm } from "@/components/auth/UserAuthForm";
import { authEndPoints } from "@/constants/endPoints";
import {
  AuthType,
  IUserDetails,
  OnUserSignUpAction,
  UserSignUp,
} from "@/types/user.types";
import { postApi } from "@/utils/api.utils";

const Login = () => {
  const onSignUpButtonClick: OnUserSignUpAction = async ({
    email,
    password,
    name,
  }: UserSignUp) => {
    await postApi<IUserDetails>(authEndPoints.signUp, {
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
