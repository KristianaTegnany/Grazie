import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { userInitialState } from 'store/slice/user/initialState';
import { authInitialState } from 'store/slice/auth/initialState';
import { appInitialState } from 'store/slice/app/initialState';
import ServiceResume from 'screen/User/Services/ServiceItem/Step/ServiceResume';
import * as serviceResumeImpl from 'screen/User/Services/ServiceItem/Step/serviceResumeImpl';
import { UserService } from 'services/applicatif/user/userService';
import Toast from 'react-native-toast-message';
import * as navigationImpl from 'services/utils/navigation';

jest.useFakeTimers()
test('test serviceresume', async () => {
  (useSelector as jest.Mock).mockImplementation((cb) => cb({
    appReducer: appInitialState,
    authReducer: authInitialState,
    userReducer: userInitialState,
  }))

  const navigate = jest.spyOn(navigationImpl, 'navigateScreenImpl')

  const showToast = jest.spyOn(Toast, 'show')
  const addOrder = jest.spyOn(serviceResumeImpl, 'addOrderImpl')
  //const updateOrder = jest.spyOn(serviceResumeImpl, 'updateOrderImpl')
  const addOrderService = jest.spyOn(UserService, 'addOrder').mockResolvedValue({
    success: true,
    message: 'success',
    order_id: '1',
    price: {
      label: '90E',
    },
    payment_intent: {
      customer_id: '1',
      ephemeral_key: '1',
      payment_intent: {
        id: '1',
        client_secret: '1'
      },
      setup_intent: '1'
    },
  })

  await waitFor(() => render(
    <NavigationContainer>
      <ServiceResume />
    </NavigationContainer>));

  expect(addOrder).toHaveBeenCalled()
  expect(addOrderService).toHaveBeenCalled()
  const btnAdd = screen.getByText('90E')
  expect(btnAdd).toBeVisible()
  await act(async () => await fireEvent(btnAdd, 'press'))
  await act(async () => await jest.runOnlyPendingTimers())
  expect(addOrder).toHaveBeenCalled()
  expect(showToast).toHaveBeenCalledWith({ text1: 'Succès', text2: '', type: 'success' })
  expect(navigate).toHaveBeenCalled()
});
