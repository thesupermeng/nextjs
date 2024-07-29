export const isExpired = (time = 0) => {
  return Date.now() > new Date(time).getTime();
};
