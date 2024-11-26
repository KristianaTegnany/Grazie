import notifee, {AuthorizationStatus} from "@notifee/react-native";
import {useIsFocused} from "@react-navigation/native";

import {useEffect, useRef, useState} from "react";
import {Linking, NativeEventSubscription, Platform} from "react-native";
import {AppState} from "react-native";
import {useSelector} from "react-redux";
import {rootState} from "store/reducer";

let isFirst = true,
  isRunning = false;

const usePermission = () => {
  const isPermissionFetching = useRef(false);
  const isFocused = useIsFocused();
  const [authorized, setAuthorized] = useState<boolean>(true);

  const {enableNotifications, enableNotificationsDescription, goToSettings} =
    useSelector(
      (state: rootState) => state?.appReducer.notificationDatas.translation,
    );

  const openPermissionSettings = async () => {
    if (Platform.OS === "ios") {
      await Linking.openSettings();
    } else {
      await notifee.openNotificationSettings();
    }
  };

  async function checkAppStatePermissions() {
    if (!isRunning) {
      //console.log("handle");

      isRunning = true;
      isFirst = false;
      let hasPermissions = false;

      if (Platform.OS === "ios") {
        const settings = await notifee.requestPermission();
        hasPermissions = Boolean(
          settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
            settings.authorizationStatus === AuthorizationStatus.PROVISIONAL,
        );
      } else {
        isPermissionFetching.current = true;
        const settings =
          Platform.OS === "android" && Platform.Version >= 33
            ? await notifee.requestPermission()
            : await notifee.getNotificationSettings();
        isPermissionFetching.current = false;

        hasPermissions =
          settings.authorizationStatus === AuthorizationStatus.AUTHORIZED;
      }

      setAuthorized(hasPermissions);
      isRunning = false;
    }
  }

  const focusEvent = Platform.OS === "android" ? "focus" : "change";

  const handleAppStateChange = (nextAppState?: string) => {
    if (isFocused) {
      if (Platform.OS === "android") {
        if (isFirst && !isPermissionFetching.current) {
          checkAppStatePermissions();
        }
      } else if (nextAppState === "active") {
        checkAppStatePermissions();
      } else {
        isFirst = true;
      }
    }
  };

  const handleBlurChange = () => {
    if (!isPermissionFetching.current) {
      isFirst = true;
    }
  };

  useEffect(() => {
    const subscribe = AppState.addEventListener(
      focusEvent,
      handleAppStateChange,
    );

    let subscribeBlur: NativeEventSubscription;
    if (Platform.OS === "android") {
      subscribeBlur = AppState.addEventListener("blur", handleBlurChange);
    }

    return () => {
      subscribe.remove();
      if (subscribeBlur) {
        subscribeBlur.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (Platform.OS === "android") {
      if (isFocused) {
        checkAppStatePermissions();
      } else {
        isFirst = true;
      }
    } else if (isFocused) {
      checkAppStatePermissions();
    }
  }, [isFocused]);

  return {
    authorized,
    enableNotifications,
    enableNotificationsDescription,
    goToSettings,

    openPermissionSettings,
  };
};

export default usePermission;
