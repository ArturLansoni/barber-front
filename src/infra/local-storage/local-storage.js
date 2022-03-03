export const setAccessToken = (accessToken) => {
  localStorage.setItem("@barber:access-token", accessToken);
};

export const getAccessToken = () => {
  return localStorage.getItem("@barber:access-token");
};

export const clearLocalStorage = () => {
  localStorage.removeItem("@barber:access-token");
};
