import axios from "axios";

const { REACT_APP_API_URL } = process.env;
const axiosCreate = axios.create({ baseURL: REACT_APP_API_URL });

axiosCreate.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", error);
  }

  return Promise.reject(error);
});

const methods = {
  get: axiosCreate.get,
  post: axiosCreate.post,
  put: axiosCreate.put,
  delete: axiosCreate.delete,
};

export default methods;

