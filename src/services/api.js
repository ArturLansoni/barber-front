import { httpClient } from "../infra";

const handleResponse = (response) => {
  const successStatusCode = [200, 201, 204];
  if (successStatusCode.includes(response.status)) return response.data.data;
  return null;
};

export const loginBarber = async ({ email = "", password = "" }) => {
  const response = await httpClient.post("/barber/login", { email, password });
  return handleResponse(response);
};

export const findCurrentBarber = async () => {
  const response = await httpClient.get("/barber/me");
  return handleResponse(response);
};
