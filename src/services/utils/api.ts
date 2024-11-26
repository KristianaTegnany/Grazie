import SecureStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {asyncStorage} from './constants';
import {url} from './url';
import store from 'store/store';
import {logout} from 'store/slice/user/userSlice';
import Toast from 'react-native-toast-message';
import { RefreshService } from 'services/applicatif/auth/refreshService';

const API = axios.create({
  baseURL: url.baseUrl,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
  /*validateStatus: function (status) {
    return status < 500;
  },*/
});

API.interceptors.request.use(
  async (config: any) => {
    const notAllowedUrl = [
      url.auth.login,
      url.preload.auth,
      url.preload.noAuth,
      url.user.passwordRecovery,
      url.user.passwordSet,
      url.auth.registerNew,
      url.auth.registerValidate,
    ];
    if (!notAllowedUrl?.includes(config.url)) {
      const token = await SecureStorage.getItem(asyncStorage.app_token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      delete config.headers.Authorization;
    }
    const isItalian = store.getState().appReducer.appDatas.isItalian;
    if (isItalian) {
      config.url += '?language=it';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  async function (response) {
    if (
      ![url.auth.login, url.auth.logout].includes(response.config.url?.split('?language=it')[0] || '') &&
      'codeError' in response.data &&
      response.data.codeError === 401
    ) {
      const data = await RefreshService.refreshToken();
      if (data) {
        return API.request(response.config);
      } else if(data === false) {
        Toast.show({type: 'error', text2: response.data.message});
        store.dispatch(logout());
      }
    } else {
      return response.data;
    }
  },
  function (error) {
    //console.log("error", JSON.stringify(error));
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

export default API;
