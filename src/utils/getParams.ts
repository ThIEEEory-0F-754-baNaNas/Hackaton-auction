export const getParams = (search: string) => {
  const parsed = new URLSearchParams(search);
  const params: { [key: string]: string } = {};
  for (const [key, value] of parsed) {
    params[key] = value;
  }
  return params;
};
