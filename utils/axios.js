import axios from "axios";

import { config } from "../config";

const instance = axios.create({
  baseURL: config.BACKEND_URL + "/api/" + config.APP_VERSION,
});

instance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(error?.response?.data?.error || "Something went wrong.")
);

export default instance;
