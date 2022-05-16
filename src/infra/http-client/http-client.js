import axios from "axios";
import { API_URL } from "../constants";
import { getAccessToken } from "../local-storage/local-storage";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers["access-token"] = accessToken;
  }

  return config;
});

export default api;
