import { IUserDetails, UserLogin, UserSignUp } from "@/types/common";
import { getApi } from "./api.utils";
import { authApi } from "@/constants/urls";
import { isEmpty } from "lodash";
import { authRoutes, mainRoutes } from "@/constants/routes";
import nookies from "nookies";
import { GetServerSidePropsContext } from "next";

export const validateLogin = (values: UserLogin) => {
  const errors: any = {};
  if (!values.email) {
    errors.email = "Email is required field";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required field";
  }
  return errors;
};
export const validateSignUp = (values: UserSignUp) => {
  const errors: any = {};
  if (!values.name) {
    errors.name = "Please enter your name";
  }
  if (!values.email) {
    errors.email = "Email is required field";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required field";
  } else if (values.password.length < 8) {
    errors.password = "Minimum 8 characters are required in password";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password before proceeding";
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password fields are not matching";
  }

  return errors;
};

export const getUserDetails = async (token: string) => {
  const response = await getApi<IUserDetails>(authApi.isValidSession, {
    token,
  });

  return response.data;
};

export const checkIfUserLoggedInInternalPage = async (
  ctx: GetServerSidePropsContext
) => {
  const cookies = nookies.get(ctx);
  const token = cookies.token;
  console.log(token);
  try {
    const userDetails = await getUserDetails(token);
    if (token && !isEmpty(userDetails)) {
      console.log("Done proper authentication");
      return {
        props: {
          userDetails,
        },
      };
    }
  } catch {}
  return {
    redirect: {
      permanent: false,
      destination: authRoutes.login(),
    },
  };
};

export const checkIfUserLoggedInAuthPage = async (
  ctx: GetServerSidePropsContext
) => {
  const cookies = nookies.get(ctx);
  const token = cookies.token;

  try {
    const userDetails = await getUserDetails(token);
    if (token && !isEmpty(userDetails)) {
      return {
        redirect: {
          permanent: false,
          destination: mainRoutes.root(),
        },
      };
    }
  } catch {}
  return {
    props: {},
  };
};
