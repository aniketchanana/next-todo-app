import { authEndPoints } from "@/constants/endPoints";
import {
  IUserDetails,
  OnUserLoginAction,
  OnUserSignUpAction,
  UserLogin,
  UserSignUp,
} from "@/types/user.types";
import { getApi, postApi } from "@/utils/api.utils";

export const getUserDetails = async (token: string) => {
  const response = await getApi<IUserDetails>(authEndPoints.isValidSession, {
    token,
  });

  return response.data;
};

export const LoginUser: OnUserLoginAction = async ({
  email,
  password,
}: UserLogin) => {
  await postApi<IUserDetails>(authEndPoints.signIn, {
    emailId: email,
    password,
  });
};

export const signUpUser: OnUserSignUpAction = async ({
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
