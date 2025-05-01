import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/recipes",
});

api.interceptors.response.use(
  function (response) {
    return response.data.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
