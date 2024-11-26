import axios from "axios";
import { url } from "services/utils/url";

const AuthAPI = axios.create({
    baseURL: url.baseUrl,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: false,
});

AuthAPI.interceptors.response.use(
  async function (response) {
    return response.data;
  },
  function (error) {
    let result: any;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      result = error.response.data.message;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser
      // and an instance of http.ClientRequest in node.js
      result = error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      result = error.message;
    }
    return Promise.reject(result);
  },
);

export default AuthAPI;