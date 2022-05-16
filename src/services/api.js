import { toast } from "react-toastify";
import { httpClient } from "../infra";

const handleResponse = (response) => {
  if (!response || response?.error) {
    toast.error(response?.error?.message || "Ops, tente novamente mais tarde!");
    return null;
  }
  const successStatusCode = [200, 201, 204];
  if (successStatusCode.includes(response.status)) return response.data.data;
  return null;
};

const handleError = (error) => {
  if (error.response) {
    return {
      error: {
        message: error.response.data.error,
        status: error.response.status,
      },
    };
  }
};

export const login = async ({ email = "", password = "" }) => {
  const response = await httpClient
    .post("/login", { email, password })
    .catch(handleError);
  return handleResponse(response);
};

export const findCurrentUser = async () => {
  const response = await httpClient.get("/me").catch(handleError);
  return handleResponse(response);
};

export const createBarber = async (barber) => {
  const response = await httpClient.post("/barber", barber).catch(handleError);
  return handleResponse(response);
};

export const findCurrentBarberServices = async () => {
  const response = await httpClient.get("/offers/me").catch(handleError);
  return handleResponse(response);
};

export const findBarbers = async () => {
  const response = await httpClient.get("/barber").catch(handleError);
  return handleResponse(response);
};

export const findBarberServices = async () => {
  const response = await httpClient.get("/barber").catch(handleError);
  return handleResponse(response);
};

export const createService = async (service) => {
  const response = await httpClient
    .post("/service", service)
    .catch(handleError);
  return handleResponse(response);
};

export const deleteService = async (serviceId) => {
  const response = await httpClient
    .delete(`/service/${serviceId}`)
    .catch(handleError);
  return handleResponse(response);
};

export const updateService = async (service) => {
  const response = await httpClient
    .put(`/service/${service._id}`, service)
    .catch(handleError);
  return handleResponse(response);
};
