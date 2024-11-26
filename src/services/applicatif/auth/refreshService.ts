import {url} from 'services/utils/url';
import AuthInfo, {IDevice, IResponse} from './type';
import SecureStorage from '@react-native-async-storage/async-storage';
import {asyncStorage} from 'services/utils/constants';
import messaging from '@react-native-firebase/messaging';
import { getDeviceId, getDeviceType, getSystemName, getSystemVersion, getVersion } from 'react-native-device-info';
import dayjs, { Dayjs } from 'dayjs';
import AuthAPI from './api';
import { LoggerService } from './loggerService';

export class RefreshService {
  static lastRefreshTokenTime: Dayjs | null | undefined = null

  static async refresh(
    token: string,
    email: string,
    device: IDevice
  ): Promise<AuthInfo & IResponse> {
    
    let push_token = ''
    try{
      push_token = await messaging().getToken();
    } catch(e){
      LoggerService.logger({
        user_email: email,
        action: "no_push_token",
      })
    }

    const new_device = {
      push_token,
      system_name: getSystemName(),
      system_version: getSystemVersion(),
      model: getDeviceId(),
      type: getDeviceType(),
      app_version: getVersion(),
    };
    return AuthAPI.post(url.auth.refreshToken, {
      refresh_token: token,
      device: new_device.system_name? new_device : device,
    });
  }

  static async refreshToken(): Promise<boolean|undefined> {
    if(RefreshService.lastRefreshTokenTime === undefined){
      return undefined
    }
    else if(RefreshService.lastRefreshTokenTime === null || dayjs().diff(RefreshService.lastRefreshTokenTime, 'seconds') > 5){
      RefreshService.lastRefreshTokenTime = dayjs()
      const login_info = await SecureStorage.getItem(asyncStorage.login_info);
      if (login_info) {
        const data = JSON.parse(login_info);
        const token = await SecureStorage.getItem(asyncStorage.app_refresh_token);
        if(token){
          const res = await RefreshService.refresh(
            token,
            data.email,
            data.device,
          );
          if('refresh_token' in res){
            await SecureStorage.setItem(asyncStorage.app_token, res.access_token)
            await SecureStorage.setItem(asyncStorage.app_refresh_token, res.refresh_token)
            RefreshService.lastRefreshTokenTime = null
            return true
          }
          else return false
        }
      }
      RefreshService.lastRefreshTokenTime = undefined
      return false;
    }
    await new Promise(resolve => setTimeout(resolve, 5000)) // wait for 5s
    return true;
  }
}
