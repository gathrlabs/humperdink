import axios from "axios";
import { getToken, saveToken } from "./AuthService";
import store from "../store";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  config.headers.Authorization = token;

  return config;
});

instance.interceptors.response.use(
  (response) => {
    saveToken(response.headers.authorization);
    return response;
  },
  function (error) {
    if (
      error.response &&
      [401, 419].includes(error.response.status) &&
      store.getters["auth/authUser"] &&
      !store.getters["auth/guest"]
    ) {
      store.dispatch("auth/logout");
    }
    console.log(error.response.headers.authorization);
    saveToken(error.response.headers.authorization);
    return Promise.reject(error);
  }
);

export default instance;
