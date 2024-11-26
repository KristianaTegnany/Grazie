import 'react-native';
import React from 'react';


import { render, screen, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Redux from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import InfoPersoScreen from 'screen/User/InfoPerso';
import { userInitialState } from 'store/slice/user/initialState';
import { authInitialState } from 'store/slice/auth/initialState';
import { appInitialState } from 'store/slice/app/initialState';

test('test infoperso', async () => {
  jest.spyOn(Redux, 'useSelector').mockImplementation((cb) => cb({
    appReducer: appInitialState,
    authReducer: authInitialState,
    userReducer: { authInfo: { current_user: { uid: 39 } }, userInfo: { subscription: {} }, persoInfosDatas: userInitialState.persoInfosDatas }
  }))

  await waitFor(async () => {
    await render(
      <SafeAreaProvider>
        <NavigationContainer>
          <InfoPersoScreen />
        </NavigationContainer>
      </SafeAreaProvider>)
  })

  screen.unmount()
});
