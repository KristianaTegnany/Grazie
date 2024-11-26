import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routeName from './routeName';
import LoginScreen from 'screen/Auth/LoginScreen';
import SignUpScreen from 'screen/Auth/Register/SignUpScreen';
import RegisterStep2 from 'screen/Auth/Register/RegisterStep2';
import RegisterStep3 from 'screen/Auth/Register/RegisterStep3';
import ForgotPasswordScreen from 'screen/Auth/ForgotPasswordScreen';
import CodeScreen from 'screen/Auth/ForgotPasswordScreen/CodeScreen';
import NewPasswordScreen from 'screen/Auth/ForgotPasswordScreen/NewPasswordScreen';
import RegisterOrSignInScreen from 'screen/Auth/RegisterOrSignInScreen';
import SignUpName from 'screen/Auth/Register/SignUpScreen/SignUpName';
import SignUpPro from 'screen/Auth/Register/SignUpScreen/SignUpPro';
import { getDeviceLang } from 'services/utils/defaultLocale';
import SplashScreen from 'screen/OnBoarding/SplashScreen';
import Welcome from 'screen/OnBoarding/Welcome';
import OnboardingScreen from 'screen/OnBoarding/OnboardingScreen';
import LocaleScreen from 'screen/OnBoarding/LocaleScreen';
import Apollo from 'services/utils/apollo';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import CgvScreen from 'screen/Others/cgv';
import PrivacyScreen from 'screen/Others/privacy';
import { Platform } from 'react-native';

const NoAuthStack = createNativeStackNavigator();

export default function AuthRoute() {
  const [initialRoute, setInitialRoute] = useState<string>(
    routeName.onboarding.locale
  );
  const { isLocale, isSplash, isOnBoarding, isWelcome } = useSelector(
    (state: rootState) => state.appReducer.appDatas,
  );

  const id = useSelector(
    (state: rootState) => state.userReducer.authInfo.current_user?.uid,
  );

  const lastName = useSelector(
    (state: rootState) => state.userReducer.userInfo.lastName,
  );

  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (id && !lastName) {
        setInitialRoute(routeName.auth.registerName);
      }
      else {

        if (isWelcome) {
          setInitialRoute(routeName.auth.registerOrSignin);
        }
        else if (isOnBoarding) {
          setInitialRoute(routeName.auth.welcome);
        }
        else if (isSplash) {
          setInitialRoute(routeName.onboarding.screen1);
        }
        else if (isLocale) {
          setInitialRoute(routeName.onboarding.spash);
        }
        else {
          const deviceLocale = getDeviceLang().substring(0, 2);
          const allowedLocale = ['fr', 'it'];
          if (allowedLocale.includes(deviceLocale)) {
            Apollo.changeLang(deviceLocale === 'it')
            Apollo.getNoAuthDatas()
          }
        }
      }

      setRender(true);
    })();
  }, []);

  return render ? (
    <NoAuthStack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === 'android' ? 'none' : 'fade',
        //animationDuration: 1000,
      }}>
      <NoAuthStack.Screen
        name={routeName.onboarding.locale}
        component={LocaleScreen}
      />
      <NoAuthStack.Screen
        name={routeName.onboarding.spash}
        component={SplashScreen}
      />
      <NoAuthStack.Screen
        name={routeName.onboarding.screen1}
        component={OnboardingScreen}
      />
      <NoAuthStack.Screen
        name={routeName.auth.registerOrSignin}
        component={RegisterOrSignInScreen}
      />
      <NoAuthStack.Screen
        name={routeName.auth.login}
        component={LoginScreen}
      />
      <NoAuthStack.Screen
        name={routeName.auth.signup}
        component={SignUpScreen}
      />
      <NoAuthStack.Screen
        name={routeName.auth.registerName}
        component={SignUpName}
      />
      <NoAuthStack.Screen
        name={routeName.auth.registerPro}
        component={SignUpPro}
      />
      <NoAuthStack.Screen
        name={routeName.auth.registerStep2}
        component={RegisterStep2}
      />
      <NoAuthStack.Screen
        name={routeName.auth.registerStep3}
        component={RegisterStep3}
      />
      <NoAuthStack.Screen name={routeName.auth.welcome} component={Welcome} />
      <NoAuthStack.Screen
        name={routeName.auth.forgotPassword}
        component={ForgotPasswordScreen}
      />
      <NoAuthStack.Screen name={routeName.auth.code} component={CodeScreen} />
      <NoAuthStack.Screen
        name={routeName.auth.newPassword}
        component={NewPasswordScreen}
      />
      <NoAuthStack.Screen
        name={routeName.auth.cgv}
        component={CgvScreen}
      />
      <NoAuthStack.Screen
        name={routeName.auth.privacy}
        component={PrivacyScreen}
      />
    </NoAuthStack.Navigator>
  ) : (
    <></>
  );
}
