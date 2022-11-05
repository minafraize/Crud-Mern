import axios from "axios";

// ----------------------------------------------------------------------

axios.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token")
    config.headers["Authorization"] = "bearer " + token;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};