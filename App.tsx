/* eslint-disable react-hooks/exhaustive-deps */
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import AppRoute from 'routes/AppRoute';
import SplashScreen from 'react-native-splash-screen';
import store, { persistor } from 'store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { Platform, StatusBar } from 'react-native';
import MapBox from '@rnmapbox/maps';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalProvider } from '@gorhom/portal';
import dayjs from 'dayjs';

import { MAP_BOX_TOKEN, STRIPE_PUBLISHABLE_KEY } from './env';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { initStripe } from '@stripe/stripe-react-native';
import { navigationRef } from 'routes/Navigation';
import { toastConfig } from 'services/utils/toast';

MapBox.setAccessToken(MAP_BOX_TOKEN);

require('dayjs/locale/it')
require('dayjs/locale/fr')

const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat)
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

StatusBar.setBarStyle('light-content');

if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('rgba(0,0,0,0)');
  StatusBar.setTranslucent(true);
}

const App = () => {

  useEffect(() => {

    initStripe({
      publishableKey: STRIPE_PUBLISHABLE_KEY
    })
    const unsubscribeForeground = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        //console.log('click', JSON.stringify(detail))
      }
    });
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      const { notification, pressAction } = detail;
      // Check if the user pressed the "Mark as read" action
      if (type === EventType.PRESS) {
        // Remove the notification
        await notifee.cancelNotification(notification!.id!);
      }
    });

    appInit()

    return () => {
      unsubscribeForeground()
    };
  }, []);

  const appInit = async () => {
    await notifee.requestPermission();
    await notifee.createChannel({
      id: 'grazie', name: 'grazie', importance: AndroidImportance.HIGH,
      vibration: true,
    });
    await messaging().setAutoInitEnabled(true)
    //const hasPermission = await messaging().requestPermission()
    //if (hasPermission) {
    if (!messaging().isDeviceRegisteredForRemoteMessages)
      await messaging().registerDeviceForRemoteMessages()

    SplashScreen.hide();

  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PersistGate persistor={persistor}>
          <NavigationContainer ref={navigationRef}>
            <PortalProvider>
              <AppRoute />
            </PortalProvider>
          </NavigationContainer>
        </PersistGate>
      </SafeAreaProvider>
      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;
