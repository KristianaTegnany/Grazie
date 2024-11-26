import useAppNavigator from 'hooks/useAppNavigator';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import SecureStorage from '@react-native-async-storage/async-storage';
import {
  getSystemName,
  getSystemVersion,
  getDeviceId,
  getDeviceType,
  getVersion,
} from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import routeName from 'routes/routeName';
import {AuthService} from 'services/applicatif/auth/authService';
import {rootState} from 'store/reducer';
import {setAuth} from 'store/slice/user/userSlice';
import {UserService} from 'services/applicatif/user/userService';
import {asyncStorage} from 'services/utils/constants';
import UserInfo from 'services/applicatif/user/type';
import { LoggerService } from 'services/applicatif/auth/loggerService';

export default function useCodeCtr() {
  const navigator = useAppNavigator();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const uuid = useSelector(
    (state: rootState) => state.userReducer.authInfo.current_user?.uuid,
  );
  const {email, password, temp_email} = useSelector(
    (state: rootState) => state.userReducer.userInfo,
  );

  const onValidate = async (
    code: string,
    setModal: null | ((isModal: boolean) => void) = null,
    isModal: boolean = false,
    isEmail: boolean = false,
  ) => {
    if (code && uuid) {
      if (isEmail) {
        setLoading(true);
        UserService.updateAccount({
          uuid,
          email: temp_email,
          code,
        } as UserInfo)
          .then(async result => {
            Toast.show({
              type: result.success ? 'success' : 'error',
              text2: result.message,
            });

            const login_info = await SecureStorage.getItem(
              asyncStorage.login_info,
            );

            if (temp_email && result.success && login_info) {
              const loginData = JSON.parse(login_info);
              AuthService.login(
                temp_email,
                loginData.password,
                loginData.device,
              ).then(async user => {
                SecureStorage.setItem(asyncStorage.app_token, user.access_token);
                dispatch(setAuth(user));
                if (setModal) {
                  setModal(false);
                }
                setLoading(false);
              });
            } else {
              setLoading(false);
            }
          })
          .catch(e => {
            //console.log(e);
            setLoading(false);
          });
      } else if (isModal) {
        setLoading(true);
        AuthService.registerValidate(email, uuid, code)
          .then(async result => {
            Toast.show({
              type: result.success ? 'success' : 'error',
              text2: result.message,
            });

            let push_token = ''
            try{
              push_token = await messaging().getToken();
            } catch(e){
              LoggerService.logger({
                user_email: email,
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

            if (result.success) {
              AuthService.login(email, password!, device).then(async user => {
                SecureStorage.setItem(asyncStorage.app_token, user.access_token);
                SecureStorage.setItem(asyncStorage.already_sign_in, 'true');
                dispatch(setAuth(user));
                /*await preload.getAuthPreload();*/
                if (setModal) {
                  setModal(false);
                }
                setLoading(false);
                navigator.navigateScreen(routeName.auth.registerName);
              });
            } else {
              setLoading(false);
            }
          })
          .catch(e => {
            //console.log(e);
            setLoading(false);
          });
      } else {
        goToNewpassword(code);
      }
    }
  };

  const resendCode = async (isModal: boolean = false) => {
    setLoading(true);
    if (!isModal) {
      UserService.passwordRecovery(email).then(result => {
        Toast.show({
          type: result.success ? 'success' : 'error',
          text2: result.message,
        });
      }).finally(() => setLoading(false));
    } else if (uuid) {
      AuthService.registerCodeReset(email, uuid).then(result => {
        Toast.show({
          type: result.success ? 'success' : 'error',
          text2: result.message,
        });
      }).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  };

  const goToNewpassword = (code: string) => {
    navigator.navigateScreen(routeName.auth.newPassword, {code});
  };

  return {
    loading,
    onValidate,
    resendCode,
    goToNewpassword,
  };
}
