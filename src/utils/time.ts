export const isExpired = (endTime: string) => {
  const now = new Date().getTime();
  const end = new Date(endTime).getTime();
  return now > end;
};

export const isActive = (startTime: string, endTime: string) => {
  const now = new Date().getTime();
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  return now > start && now < end;
};
