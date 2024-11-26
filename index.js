/**
 * @format
 */

import {AppRegistry, Text, TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import store from 'store/store';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { setNewMessage } from 'store/slice/chat/chatSlice';
import { LocaleConfig } from 'react-native-calendars';
import { resetTabNavigation } from 'routes/Navigation';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

LocaleConfig.locales.fr = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Avr', 'Mai', 'Jui', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
  dayNames: ['Dimanche', 'Lunedì', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
};

LocaleConfig.locales.it = {
  monthNames: [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre'
  ],
  monthNamesShort: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
  dayNames: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
};

async function onBackgroundMessageReceived(remoteMessage) {
    
  if (remoteMessage.data){
    if(remoteMessage.data.click_action === 'revenuecat_subscription_updated') {
      /*AuthService.refreshToken().then(res => {
        if (res) {
          Apollo.getAccount().then(account => console.log(JSON.stringify(account.subscription?.subscriptionProduct?.uid)))
        }
      })*/
    }
    else if (remoteMessage.data.click_action === 'home') {
      //Go to home tab
      resetTabNavigation()
    }
    else if(remoteMessage.data.click_action === 'messenger_new_message') {
      //Update Chat
      store.dispatch(setNewMessage(true));
    }
  }
}

async function onMessageReceived(remoteMessage) {
    
  if(remoteMessage.notification){
    await notifee.displayNotification({
      id: remoteMessage.messageId,
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body || '',
      android: {
        channelId: 'grazie',
        importance: AndroidImportance.HIGH,
        smallIcon: 'ic',
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  
  onBackgroundMessageReceived(remoteMessage);
}

messaging().setBackgroundMessageHandler(onBackgroundMessageReceived);
messaging().onMessage(onMessageReceived);

AppRegistry.registerComponent(appName, () => App);
