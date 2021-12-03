import axios from "axios";
import store from "@/store";

export const authClient = axios.create({
  baseURL: process.env.VUE_APP_API_AUTH_URL,
  withCredentials: true,
});

/*
 * Add a response interceptor
 */
authClient.interceptors.response.use(
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
    return Promise.reject(error);
  }
);

const userClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

userClient.interceptors.request.use((config) => {
  const token = getToken();
  config.headers.Authorization = token;

  return config;
});

/*
 * Add a response interceptor
 */
userClient.interceptors.response.use(
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
    saveToken(error.response.headers.authorization);
    return Promise.reject(error);
  }
);

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export default {
  async login(payload) {
    return authClient.post("/auth/login", payload);
  },
  getAuthUser() {
    return userClient.get("/auth/user");
  },
};
