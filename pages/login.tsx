import { LoginUser } from "@/api/auth.apiCalls";
import { UserAuthForm } from "@/components/auth/UserAuthForm";
import { FormInput } from "@/components/common/FormInput";
import { AuthType } from "@/types/user.types";
import { checkIfUserLoggedInAuthPage } from "@/utils/auth.utils";
import { GetServerSidePropsContext } from "next/types";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await checkIfUserLoggedInAuthPage(ctx);
};

const Login = () => {
  const renderFields = ({ handleBlur, handleChange, errors, touched }) => {
    const fields = [
      {
        name: "email",
        type: "email",
        placeholder: "aniket.chanana@velotio.com",
        handleBlur: handleBlur,
        handleChange: handleChange,
        errorMessage:
          (errors["email"] && touched["email"] && errors["email"]) || "",
      },
      {
        name: "password",
        type: "password",
        placeholder: "* * * *",
        handleBlur: handleBlur,
        handleChange: handleChange,
        errorMessage:
          (errors["password"] && touched["password"] && errors["password"]) ||
          "",
      },
    ];
    return (
      <>
        {fields.map((props) => (
          <FormInput key={props.name} {...props} />
        ))}
      </>
    );
  };
  return (
    <UserAuthForm
      authType={AuthType.LOGIN}
      userAction={LoginUser}
      renderFields={renderFields}
    />
  );
};

export default Login;
