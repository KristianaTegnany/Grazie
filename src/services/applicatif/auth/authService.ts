import {url} from 'services/utils/url';
import API from 'services/utils/api';
import AuthInfo, {IDevice, INewResponse, IResponse} from './type';
import SecureStorage from '@react-native-async-storage/async-storage';
import {asyncStorage} from 'services/utils/constants';
import store from 'store/store';

export class AuthService {
  static async login(
    login: string,
    password: string,
    device: IDevice,
  ): Promise<AuthInfo & IResponse> {
    const isItalian = store.getState().appReducer.appDatas.isItalian;

    return API.post(url.auth.login, {
      login: login.trim(),
      password: password.trim(),
      device,
      langcode: isItalian ? 'it' : 'fr',
    });
  }

  static async logout(): Promise<AuthInfo & IResponse> {
    const refreshToken = await SecureStorage.getItem(asyncStorage.app_refresh_token)
      
    return API.post(url.auth.logout, {
      refresh_token: refreshToken
    });
  }

  static registerNew(
    email: string,
    password: string,
    notification: boolean | undefined,
    newsletter: boolean | undefined,
  ): Promise<INewResponse> {
    const isItalian = store.getState().appReducer.appDatas.isItalian;

    return API.post(url.auth.registerNew, {
      email: email.trim(),
      password: password.trim(),
      notify_email: newsletter || false,
      notify_allow_all: notification || false,
      langcode: isItalian ? 'it' : 'fr',
    });
  }

  static registerValidate(
    email: string,
    uuid: string,
    code: string,
  ): Promise<IResponse> {
    return API.post(url.auth.registerValidate, {
      email: email.trim(),
      uuid,
      code,
    });
  }

  static registerCodeReset(email: string, uuid: string): Promise<IResponse> {
    return API.post(url.auth.registerCodeReset, {
      email: email.trim(),
      uuid,
    });
  }

  static async registerAccount(
    last_name: string,
    first_name: string,
    is_pro: boolean,
    civility: string,
    activity: string,
    profile_types: string[],
    whishes: string[],
    username: string,
    godfather_email: string,
  ): Promise<IResponse> {
    return API.post(url.auth.registerAccount, {
      last_name: last_name.trim(),
      first_name: first_name.trim(),
      is_pro,
      civility,
      activity,
      profile_types,
      whishes,
      username: username.trim(),
      godfather_email,
    });
  }
}
