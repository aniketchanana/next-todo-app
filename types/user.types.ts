export type UserLogin = {
  email: string;
  password: string;
};

export interface IUserDetails {
  uuid: string;
  name: string;
  emailId: string;
  token: string;
}
export type UserLoginValidation = () => UserLogin;
export type UserSignUpValidation = () => UserSignUp;

export type OnUserLoginAction = (data: UserLogin) => Promise<void>;
export type OnUserSignUpAction = (data: UserSignUp) => Promise<void>;
export type UserSignUp = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export enum AuthType {
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
}
