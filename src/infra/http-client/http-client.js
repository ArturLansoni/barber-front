import axios from "axios";
import { getAccessToken } from "../local-storage/local-storage";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

api.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers["access-token"] = accessToken;
  }

  return config;
});

export default api;
