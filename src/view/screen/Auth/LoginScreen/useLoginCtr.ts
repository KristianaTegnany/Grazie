import useAppNavigator from 'hooks/useAppNavigator';
import routeName from 'routes/routeName';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setAuth} from 'store/slice/user/userSlice';
import Toast from 'react-native-toast-message';
import SecureStorage from '@react-native-async-storage/async-storage';
import {
  getSystemName,
  getSystemVersion,
  getDeviceId,
  getDeviceType,
  getVersion,
} from 'react-native-device-info';

import {asyncStorage} from 'services/utils/constants';
import {AuthService} from 'services/applicatif/auth/authService';
import {UserCredential} from 'services/applicatif/auth/type';
import Apollo from 'services/utils/apollo';
import messaging from '@react-native-firebase/messaging';
import { LoggerService } from 'services/applicatif/auth/loggerService';
import { rootState } from 'store/reducer';
import { navigateLink } from 'routes/Navigation';

export default function useLoginCtr() {
  const navigator = useAppNavigator();
  const dispatch = useDispatch();
  const redirectTo = useSelector(
    (state: rootState) => state.appReducer.redirectTo
  );

  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    watch,
    formState: {errors},
  } = useForm<UserCredential>();

  const createAccount = () => navigator.navigateScreen(routeName.auth.signup);

  const hideLoading = () => {
    //if (navigator.isFocused) {
    setLoading(false);
    //}
  };

  const onSubmit = async (data: UserCredential) => {
    setLoading(true);
    let push_token = '';
    try{
      push_token = await messaging().getToken();
    } catch(e){
      LoggerService.logger({
        user_email: data.email.toLocaleLowerCase(),
        action: "no_push_token",
      })
    }

    const device = {
      push_token,
      system_name: getSystemName(),
      system_version: getSystemVersion(),
      model: getDeviceId(),
      type: getDeviceType(),
      app_version: getVersion(),
    };

    AuthService.login(data.email.toLocaleLowerCase(), data.password, device)
      .then(async result => {
        if ('success' in result && !result.success) {
          Toast.show({type: 'error', text2: result.message});
          hideLoading();
        } else if (result.access_token) {
          await SecureStorage.setItem(asyncStorage.login_info, JSON.stringify({
            email: data.email.toLocaleLowerCase().trim(),
            device
          }))

          await SecureStorage.setItem(asyncStorage.app_refresh_token, result.refresh_token)

          SecureStorage.setItem(
            asyncStorage.app_token,
            result.access_token
          ).then(() => {
            Apollo.getAccount().then(async account => {
              dispatch(setAuth(result));
              await Apollo.getAllPreloadDatas();
              
              if (!account.lastName) {
                navigator.navigateScreen(routeName.auth.registerName);
              }
              else if(redirectTo) {
                navigateLink(redirectTo, true);
              }

              hideLoading();
            }).catch(function() {
              hideLoading();
            });
          }).catch(function() {
            hideLoading();
          });

          SecureStorage.setItem(asyncStorage.already_sign_in, 'true');
        } else {
          hideLoading();
        }
      })
      .catch(function (error) {
        Toast.show({type: 'error', text2: error});
        hideLoading();
      });
  };

  const goToForgotPassword = () => {
    navigator.navigateScreen(routeName.auth.forgotPassword);
  };

  const goBack = () => {
    navigator.navigateScreen(routeName.auth.registerOrSignin);
    navigator.reset({
      index: 0,
      routes: [{name: routeName.auth.registerOrSignin as never}],
    });
  }

  return {
    createAccount,
    handleSubmit,
    errors,
    watch,
    onSubmit,
    control,
    loading,
    goBack,
    goToForgotPassword,
  };
}
