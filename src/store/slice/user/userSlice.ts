import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {userInitialState} from './initialState';
import UserInfo from 'services/applicatif/user/type';
import {
  ITravel,
  PersoInfosDatas,
  ServiceDatas,
  ServiceSteps,
  TravelDatas,
} from 'store/slice/user/type';
import SecureStorage from '@react-native-async-storage/async-storage';
import {asyncStorage} from 'services/utils/constants';
import AuthInfo from 'services/applicatif/auth/type';
import { LogoutService } from 'services/applicatif/auth/logoutService';

const removeSecureStorage = () => {
  SecureStorage.removeItem(asyncStorage.app_token)
  SecureStorage.removeItem(asyncStorage.app_refresh_token)
  SecureStorage.removeItem(asyncStorage.login_info)
}

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    logout: (state, action: PayloadAction<boolean|undefined>) => {
      if(action.payload){
        LogoutService.logout().then(removeSecureStorage)
      }
      else {
        removeSecureStorage()
      }
      state.userInfo = userInitialState.userInfo;
      state.authInfo = userInitialState.authInfo;
    },
    setAuth: (state, action: PayloadAction<AuthInfo>) => {
      state.authInfo = {
        ...state.authInfo,
        ...action?.payload,
      };
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = {
        ...state.userInfo,
        ...action?.payload,
      };
    },
    setProfileTag: (
      state,
      action: PayloadAction<Array<{id: number; text: string}>>,
    ) => {
      state.tag.profile = action.payload;
    },
    setUserLists: (state, action: PayloadAction<Array<any>>) => {
      state.userLists.push(action.payload);
    },
    setPersoInfosDatas: (state, action: PayloadAction<PersoInfosDatas>) => {
      state.persoInfosDatas = action.payload;
    },
    setTravelDatas: (state, action: PayloadAction<TravelDatas>) => {
      state.travelDatas = action.payload;
    },
    setServiceDatas: (state, action: PayloadAction<ServiceDatas>) => {
      state.serviceDatas = action.payload;
    },
    setServiceSteps: (state, action: PayloadAction<ServiceSteps>) => {
      state.serviceSteps = {
        ...state.serviceSteps,
        ...action?.payload,
      };
    },
    resetServiceSteps: state => {
      state.serviceSteps = userInitialState.serviceSteps;
    },
    setTravels: (
      state,
      action: PayloadAction<{total: number; items: ITravel[]}>,
    ) => {
      state.travels = action.payload;
    },
  },
});

export const {
  logout,
  setAuth,
  setUser,
  setPersoInfosDatas,
  setProfileTag,
  setUserLists,
  setTravelDatas,
  setTravels,
  setServiceDatas,
  setServiceSteps,
  resetServiceSteps,
} = userSlice.actions;

export default userSlice.reducer;
