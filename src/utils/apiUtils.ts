export const jsonOrThrow = (res: Response) => {
  console.log("JSON OR THROW");
  if (!res.ok) throw new Error(res.statusText);
  console.log("RES is OK");
  const json = res.json();

  if (json.error || json.message)
    throw new Error(json.error || json.message || "Unexpected error");

  console.log("JSON", json);

  return json;
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized");
  return token;
};

export const getBearerToken = () => {
  return `Bearer ${getToken()}`;
};
