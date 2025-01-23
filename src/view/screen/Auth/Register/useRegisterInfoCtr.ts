import useAppNavigator from 'hooks/useAppNavigator';
import routeName from 'routes/routeName';
import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {AuthService} from 'services/applicatif/auth/authService';
import Toast from 'react-native-toast-message';
import {UserNameRegister} from 'services/applicatif/auth/type';
import Apollo from 'services/utils/apollo';
import {UserService} from 'services/applicatif/user/userService';
import {useSelector} from 'react-redux';
import {rootState} from 'store/reducer';
import { navigateLink } from 'routes/Navigation';

type IProps = {
  first: string;
  family: string;
  surname: string;
  godfather: string;
  civility: string;
  isPro: boolean;
  activity?: string;
};

type IProps2 = IProps & {
  profileTypes: string[];
};

type IProps3 = IProps2 & {
  whishes: string[];
};

export default function useRegisterInfoCtr() {
  const [loading, setLoading] = useState(false);
  const navigator = useAppNavigator();

  const {
    cannotBeYourOwnGodfatherErrorMessage, godfatherNotExist, nicknameAlreadyExist} = useSelector(
    (state: rootState) => state.authReducer.authDatas.translation,
  );

  const email = useSelector(
    (state: rootState) => state.userReducer.userInfo.email,
  );

  const redirectTo = useSelector(
    (state: rootState) => state.appReducer.redirectTo
  );

  const [civility, setCivility] = useState<string>();
  const {handleSubmit, control, watch} = useForm<UserNameRegister>();

  const goToStep2 = (data: IProps) =>
    navigator.navigateScreen(routeName.auth.registerStep2, data);

  const goToStep3 = (data: IProps2) =>
    navigator.navigateScreen(routeName.auth.registerStep3, data);

  const showError = (e: string) => {
    Toast.show({
      type: 'error',
      text2: e,
    });
    setLoading(false);
  };

  const goBack = () => {
    navigator.navigateScreen(routeName.auth.login);
    navigator.reset({
      index: 0,
      routes: [{name: routeName.auth.login as never}],
    });
  }

  const goToHome = (data: IProps3) => {
    setLoading(true);
    AuthService.registerAccount(
      data.family,
      data.first,
      data.isPro,
      data.civility,
      data.activity!,
      data.profileTypes,
      data.whishes,
      data.surname,
      data.godfather,
    )
      .then(result => {
        if (result.success) {
          Apollo.getAccount()
            .then(async () => {
              await Apollo.getAllPreloadDatas();

              setLoading(false);

              if(redirectTo){
                navigateLink(redirectTo, true)
              }
              /*navigator.reset({
                index: 0,
                routes: [{name: routeName.auth.registerSubscription as never}],
              });
              navigator.navigateScreen(routeName.auth.registerSubscription);*/
            })
            .catch(e => {
              showError(e);
            });
        } else {
          showError(result.message);
        }
      })
      .catch(e => {
        showError(e);
      });
  };

  const onSubmit = async (data: UserNameRegister) => {
    setLoading(true);
    UserService.findAccount({username: data.surname}).then(async res => {
      if (!res.success) {
        if (data.godfather) {
          if(data.godfather === email){
            Toast.show({text2: cannotBeYourOwnGodfatherErrorMessage, type: 'error'});
            setLoading(false);
            return;
          }
          else {
            const res = await UserService.findAccount({email: data.godfather});
            if (!res.success) {
              Toast.show({text2: godfatherNotExist, type: 'error'});
              setLoading(false);
              return;
            }
          }
        }
        navigator.navigateScreen(routeName.auth.registerPro, {
          family: data.family,
          first: data.first,
          surname: data.surname,
          godfather: data.godfather,
          civility: civility,
        });
        setLoading(false);
      } else {
        Toast.show({text2: nicknameAlreadyExist, type: 'error'});
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    Apollo.getAuthDatas();
  }, []);

  return {
    civility,
    setCivility,
    goBack,
    goToStep2,
    goToStep3,
    goToHome,
    handleSubmit,
    watch,
    onSubmit,
    control,
    loading,
    navigator,
  };
}
