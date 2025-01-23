import React, { useEffect, useState } from 'react';
import AuthRoute from './AuthRoute';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import TabRoute from './TabRoute';
import MenuModal from 'screen/Tab/widget/MenuModal';
import Apollo from 'services/utils/apollo';
import dayjs from 'dayjs';
import { usePurchase } from 'hooks/usePurchase';
import useStoreUpdate from 'hooks/useStoreUpdate';
import { useAppState } from '@react-native-community/hooks';
import { Button, Text, View } from 'widget/Native';
import CenterModal from 'screen/Tab/widget/CenterModal';
import { Linking } from 'react-native';
import { navigateLink, navigationRef } from './Navigation';
import SecureStorage from '@react-native-async-storage/async-storage';
import { asyncStorage } from 'services/utils/constants';
import { setRedirect, updateCarnet, updateMagSubscribe, updatePrivate, updateSubscribe } from 'store/slice/app/appSlice';
import routeName from './routeName';
import SubscribeModal from 'screen/User/Membership/SubscribeModal';
import SubscribeMagModal from 'screen/User/Membership/SubscribeMagModal';
import SubscriptionDetailModal from 'screen/User/Membership/SubscriptionDetailModal';
import PrivateModal from 'screen/User/Membership/widget/PrivateModal';

export default function AppRoute() {
  const dispatch = useDispatch()
  const { checkForStoreUpdate, goToStore } = useStoreUpdate();
  const appState = useAppState()

  const [showUpdate, setShowUpdate] = useState<{ show: boolean, goToStore: () => void }>({
    show: false,
    goToStore: () => { }
  })

  const subscription = useSelector(
    (state: rootState) => state.userReducer.userInfo.subscription,
  );

  const id = useSelector(
    (state: rootState) => state.userReducer.authInfo.current_user?.uid,
  );

  const lastName = useSelector(
    (state: rootState) => state.userReducer.userInfo.lastName,
  );

  const it = useSelector((state: rootState) => state.appReducer.appDatas.isItalian)

  const {
    updateAvailable,
    updateMandatoryAvailable,
    updateMandatoryAvailableBtn,
  } = useSelector((s: rootState) => s.authReducer.noAuthDatas.translation);

  const redirectTo = useSelector((state: rootState) => state.appReducer.redirectTo)

  const subscribeShown = useSelector((state: rootState) => state.appReducer.appDatas.subscribeShown)
  const subscribeMagShown = useSelector((state: rootState) => state.appReducer.appDatas.subscribeMagShown)
  const carnetData = useSelector((state: rootState) => state.appReducer.appDatas.carnetData)
  const privateShown = useSelector((state: rootState) => state.appReducer.appDatas.privateShown)

  usePurchase();

  const beforeGoingToStore = () => {
    setShowUpdate(data => ({ ...data, show: false }))
    goToStore()
  }

  const closeSubscribeModal = () => dispatch(updateSubscribe(false));
  const closeSubscribeMagModal = () => dispatch(updateMagSubscribe(false));
  const closeCarnetModal = () => dispatch(updateCarnet(null));
  const closePrivateModal = () => dispatch(updatePrivate(false));

  const callback = () => {
    if(redirectTo){
      navigateLink(redirectTo, true)
    }
  }

  useEffect(() => {
    dayjs.locale(it ? 'it' : 'fr');
  }, [it])

  useEffect(() => {
    if (appState === 'active') {
      checkForStoreUpdate().then(shouldUpdate => {
        if (shouldUpdate) {
          if (updateAvailable && updateMandatoryAvailable) {
            setShowUpdate({
              show: true,
              goToStore
            })
          }
          else Apollo.getNoAuthDatas()
        }
      })
    }
  }, [appState])

  const handleDeepLink = async ({ url } : { url: string }) => {
    const path = url.replace('grazie://', '');
    const data = await SecureStorage.getItem(asyncStorage.app_refresh_token);
    if (data == null) {
      dispatch(setRedirect(path))
      //@ts-ignore
      navigationRef.navigate(routeName.auth.registerOrSignin);
    }
    else navigateLink(path);
  }

  useEffect(() => {
    Linking.addEventListener('url', handleDeepLink);

    return () => {
      Linking.removeAllListeners('url');
    };
  }, [])

  return (
    <>
      {!(lastName && id) &&
        <AuthRoute />
      }
      {lastName && id &&
        <>
          <TabRoute />
          <MenuModal />
        </>
      }
      <CenterModal modal={showUpdate.show} notDismissibled titleMarginT={0} title={updateAvailable} bottom={<View>
        <Text center size={14}>{updateMandatoryAvailable}</Text>
        <Button sm onPress={beforeGoingToStore} text={updateMandatoryAvailableBtn} marginT={20} marginB={10} paddingH={20} />
      </View>} />
      <SubscribeModal modal={subscribeShown} setModal={closeSubscribeModal} />
      <SubscribeMagModal modal={subscribeMagShown} setModal={closeSubscribeMagModal} afterClosedAuto={callback} />
      <SubscriptionDetailModal modal={carnetData !== null} product={carnetData} setModal={closeCarnetModal} callback={callback} />
      <PrivateModal modal={privateShown} closeModal={closePrivateModal} callback={callback}/>
    </>
  )
}
