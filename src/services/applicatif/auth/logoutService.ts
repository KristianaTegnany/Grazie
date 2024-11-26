import {url} from 'services/utils/url';
import AuthInfo, {IResponse} from './type';
import SecureStorage from '@react-native-async-storage/async-storage';
import {asyncStorage} from 'services/utils/constants';
import AuthAPI from './api';

export class LogoutService {
  static async logout(): Promise<AuthInfo & IResponse> {
    const refreshToken = await SecureStorage.getItem(asyncStorage.app_refresh_token)
      
    return AuthAPI.post(url.auth.logout, {
      refresh_token: refreshToken
    });
  }
}
