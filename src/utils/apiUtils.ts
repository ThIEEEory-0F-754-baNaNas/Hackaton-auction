export const jsonOrThrow = async (res: Response) => {
  console.log("JSON OR THROW");
  const json = await res.json();

  if (json.error || json.message) {
    console.log("JSON ERROR", json);
    throw new Error(json.message || json.error || "Unexpected error");
  }

  console.log("JSON", json);

  return json;
};

export const getTokenOrThrow = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized");
  return token;
};

export const getTokenOrEmpty = () => {
  return localStorage.getItem("token") || "";
};

export const getBearerToken = () => {
  return `Bearer ${getTokenOrThrow()}`;
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};
