import {
  AuthType,
  OnUserLoginAction,
  OnUserSignUpAction,
  UserLogin,
  UserLoginValidation,
  UserSignUp,
  UserSignUpValidation,
} from "@/types/user.types";
import { Box, HStack, Heading, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import { validateLogin, validateSignUp } from "@/utils/auth.utils";
import Link from "next/link";
import { authRoutes, mainRoutes } from "@/constants/routes";
import { useRouter } from "next/router";
import { Button } from "../common/Button";
import { FormInput } from "../common/FormInput";
import { useCustomToast } from "@/customHooks/useCustomToast";

interface IUserAuthForm {
  authType: AuthType;
  userAction: OnUserLoginAction | OnUserSignUpAction;
}

export const UserAuthForm: React.FC<IUserAuthForm> = ({
  authType,
  userAction,
}) => {
  const toast = useCustomToast();
  const router = useRouter();
  const validateForm = {
    [AuthType.LOGIN]: validateLogin,
    [AuthType.SIGNUP]: validateSignUp,
  };
  const initialValues = {
    [AuthType.LOGIN]: { email: "", password: "" },
    [AuthType.SIGNUP]: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  };

  const getFields = ({ handleBlur, handleChange, errors, touched }) => {
    if (authType === AuthType.LOGIN) {
      return (
        <>
          <FormInput
            name="email"
            type="email"
            placeholder="aniket.chanana@velotio.com"
            handleBlur={handleBlur}
            handleChange={handleChange}
            errorMessage={
              (errors["email"] && touched["email"] && errors["email"]) || ""
            }
          />
          <FormInput
            name="password"
            type="password"
            placeholder="* * * *"
            handleBlur={handleBlur}
            handleChange={handleChange}
            errorMessage={
              (errors["password"] &&
                touched["password"] &&
                errors["password"]) ||
              ""
            }
          />
        </>
      );
    }

    return (
      <>
        <FormInput
          name="name"
          type="text"
          placeholder="aniket"
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={
            (errors["name"] && touched["name"] && errors["name"]) || ""
          }
        />
        <FormInput
          name="email"
          type="email"
          placeholder="aniket.chanana@velotio.com"
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={
            (errors["email"] && touched["email"] && errors["email"]) || ""
          }
        />
        <FormInput
          name="password"
          type="password"
          placeholder="* * * *"
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={
            (errors["password"] && touched["password"] && errors["password"]) ||
            ""
          }
        />
        <FormInput
          name="confirmPassword"
          type="password"
          placeholder="* * * *"
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={
            (errors["confirmPassword"] &&
              touched["confirmPassword"] &&
              errors["confirmPassword"]) ||
            ""
          }
        />
      </>
    );
  };
  const onFormSubmit = async (
    values: UserLogin | UserSignUp,
    { setSubmitting }
  ) => {
    try {
      await userAction({ ...values } as any);
      router.push(mainRoutes.root());
    } catch (e: any) {
      toast({
        ...e.response.data,
        status: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <VStack w={"full"} h="full" alignItems={"center"} justifyContent={"center"}>
      <Box w="30%">
        <Heading mb={6}>
          {authType === AuthType.LOGIN ? "Welcome back!" : "Enter your details"}
        </Heading>
        <Formik
          initialValues={initialValues[authType]}
          validate={
            validateForm[authType] as UserLoginValidation | UserSignUpValidation
          }
          onSubmit={onFormSubmit}
        >
          {({ handleSubmit, isSubmitting, ...rest }) => {
            return (
              <form onSubmit={handleSubmit}>
                <VStack alignItems={"flex-start"}>
                  <VStack gap={2} w="full">
                    {getFields({ ...rest })}
                  </VStack>
                  <HStack
                    justifyContent={"space-between"}
                    w="full"
                    alignItems={"center"}
                  >
                    <Button type="submit" isLoading={isSubmitting}>
                      {authType === AuthType.LOGIN ? "Login" : "Signup"}
                    </Button>
                    <Link
                      href={
                        authType === AuthType.SIGNUP
                          ? authRoutes.login()
                          : authRoutes.signup()
                      }
                    >
                      <Button variant={"link"}>
                        {authType === AuthType.LOGIN ? "SignUp" : "LogIn"}
                      </Button>
                    </Link>
                  </HStack>
                </VStack>
              </form>
            );
          }}
        </Formik>
      </Box>
    </VStack>
  );
};
