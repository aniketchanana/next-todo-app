import { signUpUser } from "@/api/auth.apiCalls";
import { UserAuthForm } from "@/components/auth/UserAuthForm";
import { AuthType } from "@/types/user.types";

const Login = () => {
  return <UserAuthForm authType={AuthType.SIGNUP} userAction={signUpUser} />;
};

export default Login;
