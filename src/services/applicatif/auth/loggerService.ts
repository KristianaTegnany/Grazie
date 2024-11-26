import { getDeviceId, getDeviceType, getSystemName, getSystemVersion, getVersion,  } from 'react-native-device-info';

import {url} from 'services/utils/url';
import store from 'store/store';
import AuthAPI from './api';
import { IResponse } from './type';

export class LoggerService {
  static async logger(
    data: any,
  ): Promise<IResponse> {
    const allData = {
      ...data,
      system_name: getSystemName(),
      system_version: getSystemVersion(),
      model: getDeviceId(),
      type: getDeviceType(),
      app_version: getVersion(),
      lang: store.getState().appReducer.appDatas.isItalian? 'IT' : 'FR'
    }
    return AuthAPI.post(url.user.logger, allData);
  }
}
