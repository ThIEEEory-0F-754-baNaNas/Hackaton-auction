export type User = {
  id: string;
  avatar: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

export const getUser = async (token: string): Promise<User | null> => {
  try {
    const response = await fetch("http://localhost:3000/auth/whoami", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    if (json.statusCode === 401) return null;
    return json;
  } catch (error) {
    console.error(error);
  }
  return null;
};

type SignUpData = {
  avatar: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

export const signUp = async (data: SignUpData): Promise<User | null> => {
  try {
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.statusCode === 401 || json.error) return null;
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const signIn = async (
  email: string | undefined,
  password: string | undefined
): Promise<{ token: string } | null> => {
  if (!email || !password) return null;

  try {
    const response = await fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (json.statusCode === 401 || json.error) return null;
    return json;
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const addDeposit = async (amount: number): Promise<boolean> => {
  try {
    const response = await fetch("http://localhost:3000/user/deposit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ amount }),
    });
    const json = await response.json();
    if (json.statusCode === 401 || json.error) return false;
    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
};
