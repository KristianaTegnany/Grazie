type AuthInfo = {
  current_user: {
    uid: string;
    uuid?: string;
    name: string;
    roles: string[];
  } | null;
  csrf_token: string;
  logout_token: string;
  access_token: string;
  refresh_token: string;
};

export type IResponse = {
  message: string;
  codeError: number;
  success: boolean;
};

export type INewResponse = IResponse & {
  uuid: string;
};

export type IDevice = {
  push_token: string;
  system_name: string;
  system_version: string;
  model: string;
  type: string;
  app_version: string;
};

// Controller

export type PasswordCredential = {
  email: string;
};

export type PasswordSetCredential = {
  password: string;
};

export type UserCredential = {
  email: string;
  password: string;
};

export type UserInfoRegister = {
  email: string;
  password: string;
  newsletter?: boolean;
  notification?: boolean;
};

export type UserNameRegister = {
  family: string;
  first: string;
  surname: string;
  godfather: string | undefined;
};

export type UserPersonalInfo = {
  first_name: string;
  email?: string;
  mobile_phone?: string;
  godfather?: string;
  birthday?: string;
  last_name: string;
  country_code?: string;
  zip_code?: string;
  street?: string;
  city?: string;
};

export type NewPasswordInfo = {
  password: string;
  confirm_password: string;
};

// End Controller

export default AuthInfo;
