import axios from "axios";

import { config } from "../config";

const instance2 = axios.create({
  baseURL: config.BACKEND_URL2 + "/api/" + config.APP_VERSION,
});

instance2.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(error?.response?.data?.error || "Something went wrong.")
);

export default instance2;
