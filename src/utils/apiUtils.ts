export const jsonOrThrow = async (res: Response) => {
  console.log("JSON OR THROW");
  // if (!res.ok) throw new Error(res.statusText);
  // console.log("RES is OK");
  const json = await res.json();

  if (json.error || json.message)
    throw new Error(json.error || json.message || "Unexpected error");

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
