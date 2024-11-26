import React, { useEffect, useState } from 'react';
import AuthRoute from './AuthRoute';
import { useSelector } from 'react-redux';
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

export default function AppRoute() {

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

  usePurchase();

  const beforeGoingToStore = () => {
    setShowUpdate(data => ({ ...data, show: false }))
    goToStore()
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
    </>
  )
}
