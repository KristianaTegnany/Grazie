/** @type {import('ts-jest').JestConfigWithTsJest} */

import '@testing-library/jest-native/extend-expect';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock'; // or use require
import Redux from 'react-redux';
//import Apollo from 'services/utils/apollo';
import { addressInitialState } from 'store/slice/address/initialState';
import { appInitialState } from 'store/slice/app/initialState';
import { authInitialState } from 'store/slice/auth/initialState';
import { chatInitialState } from 'store/slice/chat/initialState';
import { favoriteInitialState } from 'store/slice/favorite/initialState';
import { inspirationInitialState } from 'store/slice/inspiration/initialState';
import { magInitialState } from 'store/slice/mag/initialState';
import { mapInitialState } from 'store/slice/map/initialState';
import { userInitialState } from 'store/slice/user/initialState';

jest.mock('react-native-vector-icons/Entypo', () => 'Icon')
jest.mock('react-native-vector-icons/Feather', () => 'Icon')
jest.mock('react-native-vector-icons/AntDesign', () => 'Icon')
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon')
jest.mock('react-native-vector-icons/FontAwesome5', () => 'Icon')
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon')
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon')

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('react-native-device-info', () => mockRNDeviceInfo);

jest.mock('react-native-calendars', () => { return { Calendar: () => null, LocaleConfig: { locales: {} } }; });

jest.mock('react-native-shared-element', () => ({})
);

jest.mock('react-native-purchases', () => ({
    LOG_LEVEL: {},
        configure: jest.fn(),
        setLogLevel: jest.fn(),
        setup: jest.fn(),
        addPurchaserInfoUpdateListener: jest.fn(),
        removePurchaserInfoUpdateListener: jest.fn(),
        getCustomerInfo: jest.fn().mockResolvedValue({
            activeSubscriptions: ['premium_1_month', 'premium_6_month', 'premium_12_month']
        }),
        getOfferings: jest.fn().mockResolvedValueOnce({
            all: {
                premium_offering: {
                    availablePackages: {
                        premium_1_month: {},
                        premium_6_month: {},
                        premium_12_month: {},
                        pro12months: {}
                    }
                }
            }
        }),
        purchasePackage: jest.fn().mockResolvedValue({
            activeSubscriptions: ['premium_1_month', 'premium_6_month', 'premium_12_month']
        }),
        restoreTransactions: jest.fn(),
}))

jest.mock('redux')
jest.mock('redux-persist')
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  Provider: jest.fn(),
  useSelector: jest.fn(),
  useDispatch: () => jest.fn()
}));

jest.mock('@stripe/stripe-react-native', () => ({
    initStripe: jest.fn(),
    StripeProvider: jest.fn(({children}) => children),
    presentPaymentSheet: jest.fn().mockResolvedValue(true),
    initPaymentSheet: jest.fn().mockResolvedValue(true),
}));

jest.mock('react-native-image-crop-picker',()=>{
    return{
        openCamera:jest.fn(),
        openPicker:jest.fn()
    }
})

jest.mock('react-native-modal-datetime-picker', () => jest.fn())

// Mock global store
jest.mock('store/store', () => ({
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
}))

jest.mock('@react-navigation/native', () => ({
        ...jest.requireActual('@react-navigation/native'),
      useNavigation: () => ({
        navigate: jest.fn(),
      }),
}));

// mock useSelector with default values
jest.spyOn(Redux, 'useSelector').mockImplementation((cb) => cb({
    appReducer: appInitialState,
    authReducer: authInitialState,
    userReducer: userInitialState,
    magReducer: magInitialState,
    mapReducer: mapInitialState,
    chatReducer: chatInitialState,
    favoriteReducer: favoriteInitialState,
    inspirationReducer: inspirationInitialState,
    addressReducer: addressInitialState,
}))

jest.mock('hooks/useAppNavigator', () => ({
    __esModule: true,
    default: () => ({
      ...jest.requireActual('hooks/useAppNavigator').default(),
      canGoBack: jest.fn().mockReturnValue(true),
      getParams: () => ({
        title: 'title',
        type: 'SC'
      }),
      dispatch: jest.fn(),
  
    }),
}));

jest.mock('@react-native-firebase/messaging', () => ({
    __esModule: true,
    default: () => ({
        hasPermission: jest.fn(() => Promise.resolve(true)),
        subscribeToTopic: jest.fn(),
        unsubscribeFromTopic: jest.fn(),
        requestPermission: jest.fn(() => Promise.resolve(true)),
        getToken: jest.fn(() => Promise.resolve('myMockToken')),
        setAutoInitEnabled: jest.fn(),
        isDeviceRegisteredForRemoteMessages: true,
        registerDeviceForRemoteMessages: jest.fn()
    })
}));

jest.mock('@notifee/react-native', () => require('@notifee/react-native/jest-mock'))

jest.mock('react-native-safe-area-context')//, () => require('react-native-safe-area-context/jest/mock'))

jest.mock('react-native-code-push', () => {
    const cp = () => app => app;
    Object.assign(cp, {
      InstallMode: {},
      CheckFrequency: {},
      SyncStatus: {},
      UpdateState: {},
      DeploymentStatus: {},
      DEFAULT_UPDATE_DIALOG: {},
  
      allowRestart: jest.fn(),
      checkForUpdate: jest.fn(() => Promise.resolve(null)),
      disallowRestart: jest.fn(),
      getCurrentPackage: jest.fn(() => Promise.resolve(null)),
      getUpdateMetadata: jest.fn(() => Promise.resolve(null)),
      notifyAppReady: jest.fn(() => Promise.resolve()),
      restartApp: jest.fn(),
      sync: jest.fn(() => Promise.resolve(1)),
      clearUpdates: jest.fn(),
    });
    return cp;
  });
 
  jest.mock('@apollo/client', () => ({
     ...jest.requireActual('@apollo/client'),
      ApolloClient: jest.fn(() => ({
        query: jest.fn(),
      })),
  }))

  //jest.spyOn(Apollo, 'client', 'get').mockReturnValue(true)