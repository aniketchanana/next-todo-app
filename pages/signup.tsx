import { signUpUser } from "@/api/auth.apiCalls";
import { UserAuthForm } from "@/components/auth/UserAuthForm";
import { FormInput } from "@/components/common/FormInput";
import { AuthType } from "@/types/user.types";

const Login = () => {
  const renderFields = ({ handleBlur, handleChange, errors, touched }) => {
    const fields = [
      {
        name: "name",
        type: "text",
        placeholder: "aniket",
        handleBlur,
        handleChange,
        errorMessage:
          (errors["name"] && touched["name"] && errors["name"]) || "",
      },
      {
        name: "email",
        type: "email",
        placeholder: "tonystark@superhero.com",
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
      {
        name: "confirmPassword",
        type: "password",
        placeholder: "* * * *",
        handleBlur: handleBlur,
        handleChange: handleChange,
        errorMessage:
          (errors["confirmPassword"] &&
            touched["confirmPassword"] &&
            errors["confirmPassword"]) ||
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
      authType={AuthType.SIGNUP}
      userAction={signUpUser}
      renderFields={renderFields}
    />
  );
};

export default Login;
