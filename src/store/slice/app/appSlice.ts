import {
  IBottomNavDatas,
  IBurgerMenuDatas,
  ICgvDatas,
  ICookiesDatas,
  IMembershipDatas,
  INotificationDatas,
  IPrivacyDatas,
  ISharedDatas,
  IWhoGigiDatas,
} from './type';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appInitialState} from './initialState';

export const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    setBottomNavDatas: (state, action: PayloadAction<IBottomNavDatas>) => {
      state.bottomNavDatas = action.payload;
    },
    updateMenuShown: (state, action: PayloadAction<boolean | number>) => {
      state.appDatas.menuShown = action.payload;
    },
    updateIsItalian: (state, action: PayloadAction<boolean>) => {
      state.appDatas.isItalian = action.payload;
    },
    updateIsLocale: (state, action: PayloadAction<boolean>) => {
      state.appDatas.isLocale = action.payload;
    },
    updateIsSplash: (state, action: PayloadAction<boolean>) => {
      state.appDatas.isSplash = action.payload;
    },
    updateIsOnBoarding: (state, action: PayloadAction<boolean>) => {
      state.appDatas.isOnBoarding = action.payload;
    },
    updateIsWelcome: (state, action: PayloadAction<boolean>) => {
      state.appDatas.isWelcome = action.payload;
    },
    setBurgerMenuDatas: (state, action: PayloadAction<IBurgerMenuDatas>) => {
      state.burgerMenuDatas = action.payload;
    },
    setNotificationDatas: (
      state,
      action: PayloadAction<INotificationDatas>,
    ) => {
      state.notificationDatas = action.payload;
    },
    setWhoGigiDatas: (state, action: PayloadAction<IWhoGigiDatas>) => {
      state.whoGigiDatas = action.payload;
    },
    setCgvDatas: (state, action: PayloadAction<ICgvDatas>) => {
      state.cgvDatas = action.payload;
    },
    setPrivacyDatas: (state, action: PayloadAction<IPrivacyDatas>) => {
      state.privacyDatas = action.payload;
    },
    setCookiesDatas: (state, action: PayloadAction<ICookiesDatas>) => {
      state.cookiesDatas = action.payload;
    },
    setMembershipDatas: (state, action: PayloadAction<IMembershipDatas>) => {
      state.membershipDatas = action.payload;
    },
    setSharedDatas: (state, action: PayloadAction<ISharedDatas>) => {
      state.sharedDatas = action.payload;
    },
    setSubscriptionsBO: (state, action: PayloadAction<any>) => {
      state.subscriptionsBO = action.payload;
    },
    setParams: (state, action: PayloadAction<any>) => {
      state.params = action.payload;
    },
    resetParams: (state) => {
      state.params = {}
    },
    setRedirect: (state, action: PayloadAction<string>) => {
      state.redirectTo = action.payload;
    },
    resetRedirect: (state) => {
      state.redirectTo = null
    },
    updateSubscribe: (state, action: PayloadAction<boolean>) => {
      state.appDatas.subscribeShown = action.payload;
    },
    updateMagSubscribe: (state, action: PayloadAction<boolean>) => {
      state.appDatas.subscribeMagShown = action.payload;
    },
    updateCarnet: (state, action: PayloadAction<any>) => {
      state.appDatas.carnetData = action.payload;
    },
    updatePrivate: (state, action: PayloadAction<boolean>) => {
      state.appDatas.privateShown = action.payload;
    },
  },
});

export const {
  setBottomNavDatas,
  updateMenuShown,
  updateIsItalian,
  updateIsLocale,
  updateIsSplash,
  updateIsOnBoarding,
  updateIsWelcome,
  setBurgerMenuDatas,
  setNotificationDatas,
  setWhoGigiDatas,
  setCgvDatas,
  setPrivacyDatas,
  setCookiesDatas,
  setMembershipDatas,
  setSharedDatas,
  setSubscriptionsBO,
  setParams,
  resetParams,
  setRedirect,
  resetRedirect,
  updateSubscribe,
  updateMagSubscribe,
  updateCarnet,
  updatePrivate
} = appSlice.actions;

export default appSlice.reducer;
