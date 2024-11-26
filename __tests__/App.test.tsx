import 'react-native';
import React from 'react';

import { render, screen, waitFor } from '@testing-library/react-native';
import SubscriptionsListScreen from 'screen/User/Membership/SubscriptionsList';
import { NavigationContainer } from '@react-navigation/native';
import Redux from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';

test('test subscription', async () => {
  jest.spyOn(Redux, 'useSelector').mockImplementation((cb) => cb({
    appReducer: {
      appDatas: {
        menuShown: false,
      },
      burgerMenuDatas: {
        translation: {
          proMessaging: ''
        }
      },
      subscriptionsBO: [
        {
          uid: 'premium_1_month',
          displayFullPrice: '',
          displayOldPrice: '',
          displayPrice: '',
          titleListItem: '1 MOIS',
        },
        {
          uid: 'premium_6_month',
          displayFullPrice: '',
          displayOldPrice: '',
          displayPrice: '',
          titleListItem: '6 MOIS',
        },
        {
          uid: 'premium_12_month',
          displayFullPrice: '',
          displayOldPrice: '',
          displayPrice: '',
          titleListItem: '12 MOIS',
        }
      ],
      membershipDatas: {
        translation: {
          subscriptionProductsTitle: '',
          subscriptionProductsChangeTitle: '',
          subscriptionProductsChooseText: 'test subscription',
          subscriptionProductsChooseButtonLabel: '',
          subscriptionProductsProTitle: '',
          subscriptionProductsProSubtitle: '',
          subscriptionProductsPaymentTerms: '',
          continue: '',
          goBack: '',
          promoCode: '',
          restorePurchase: '',
          useTheCode: '',
        }
      }
    }, userReducer: { authInfo: { current_user: { uid: 39 } }, userInfo: { subscription: {} } }
  }))

  await waitFor(() => {
    render(
      <SafeAreaProvider>
        <NavigationContainer>
          <SubscriptionsListScreen />
        </NavigationContainer>
      </SafeAreaProvider>)
  })

  expect(screen.getByText('1 MOIS')).toBeOnTheScreen()
  screen.unmount()
});
