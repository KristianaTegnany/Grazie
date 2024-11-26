import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {Platform, StatusBar, StatusBarStyle} from 'react-native';

const useStatusBar = (style?: StatusBarStyle, animated: boolean = true) => {
  useFocusEffect(
    useCallback(() => {
      if (style) {
        StatusBar.setBarStyle(style, animated);
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor('rgba(0,0,0,0)');
          StatusBar.setTranslucent(true);
        }
      }
    }, [style, animated]),
  );

  const changeStatusBar = (style: StatusBarStyle) => {
    StatusBar.setBarStyle(style, animated);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setTranslucent(true);
    }
  };

  return {
    changeStatusBar,
  };
};

export default useStatusBar;
