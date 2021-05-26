export const setAccessToken = (accessToken) => {
  return localStorage.setItem("@barber:access-token", accessToken);
};

export const getAccessToken = () => {
  return localStorage.getItem("@barber:access-token");
};
