import {APPLE_RC_KEY, GOOGLE_RC_KEY} from '../../env';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import Purchases, {LOG_LEVEL, PurchasesOfferings} from 'react-native-purchases';
import {useSelector} from 'react-redux';
import { LoggerService } from 'services/applicatif/auth/loggerService';
import {rootState} from 'store/reducer';

export const usePurchase = (offering: boolean = false) => {
  const id = useSelector(
    (state: rootState) => state.userReducer.authInfo.current_user?.uid,
  );

  const [offerings, setOfferings] = useState<PurchasesOfferings>();

  const init = async () => {
    if (Platform.OS === 'android') {
      await Purchases.configure({
        apiKey: GOOGLE_RC_KEY,
        appUserID: id,
      });
    } else {
      await Purchases.configure({
        apiKey: APPLE_RC_KEY,
        appUserID: id,
      });
    }

    // Use more logging during debug if want!
    Purchases.setLogLevel(LOG_LEVEL.DEBUG);
  };

  const getOffering = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      setOfferings(offerings);
    } catch (e: any) {
      console.log(e)
      LoggerService.logger({
        user_id: id,
        action: "get_offerings",
        error: JSON.stringify(e)
      })
    }
  };

  const purchase = async (pkg: any) => {
    try {
      await Purchases.purchasePackage(pkg);
      /*if (
        typeof purchaseMade.customerInfo.entitlements.active.pro !== "undefined"
      ) {
      }*/
    } catch (e: any) {
      /*(!e.userCancelled || e.code === "1")*/
      console.log(JSON.stringify(e));
    }
  };

  const getCustomerInfo = () => {
    return Purchases.getCustomerInfo()
  }

  useEffect(() => {
    if (id) {
      init().then(() => {
        if (offering) {
          getOffering();
        }
      });
    }
  }, [id]);

  return {
    offerings,
    getCustomerInfo,
    purchase,
  };
};
