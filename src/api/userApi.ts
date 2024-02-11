import { getBearerToken, jsonOrThrow, setToken } from "../utils/apiUtils";
import config from "./config";

const baseURL = config.baseURL;

export type User =
  | {
      id: string;
      avatar: string;
      firstname: string;
      lastname: string;
      username: string;
      email: string;
      password: string;
      balance: number;

      isNotOk: false;
    }
  | {
      isNotOk: true;
      isLoading: boolean;
      error: unknown;
    };

export const getUser = async (): Promise<User> => {
  const response = await fetch(`${baseURL}/auth/whoami`, {
    headers: { Authorization: getBearerToken() },
  });
  const json = await jsonOrThrow(response);
  return { ...json, isNotOk: false };
};

type SignUpData = {
  avatar?: File[] | [];
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

export const signUp = async (data: SignUpData): Promise<User> => {
  const formData = new FormData();
  if (data.avatar && data.avatar[0]) {
    formData.append('avatarFile', data.avatar[0]);
  }
  formData.append('firstname', data.firstname);
  formData.append('lastname', data.lastname);
  formData.append('username', data.username);
  formData.append('email', data.email);
  formData.append('password', data.password);
  
  const response = await fetch(`${baseURL}/auth/signup`, {
    method: "POST",
    body: formData,
  });
  const json = await jsonOrThrow(response);
  return { ...json, isNotOk: false };
};

export const signIn = async (
  email: string | undefined,
  password: string | undefined
): Promise<User> => {
  if (!email || !password) throw new Error("Email and password are required");

  const response = await fetch(`${baseURL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const result: { token: string } = await jsonOrThrow(response);
  setToken(result.token);
  return await getUser();
};

export const addDeposit = async (amount: number): Promise<User> => {
  const response = await fetch(`${baseURL}/user/deposit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getBearerToken(),
    },
    body: JSON.stringify({ amount }),
  });
  const json = jsonOrThrow(response);
  return { ...json, isNotOk: false };
};

export const updateProfileAvatar = async (
  avatar: File[],
): Promise<boolean> => {
  if (!avatar[0]) throw new Error("No avatar provided");
  const formData = new FormData();
  formData.append("avatarFile", avatar[0]);

  const response = await fetch(`${baseURL}/user/avatar`, {
    method: "PATCH",
    headers: {
      Authorization: getBearerToken(),
    },
    body: formData,
  });
  const json = await jsonOrThrow(response);
  return json;
};
