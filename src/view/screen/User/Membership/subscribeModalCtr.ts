import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {rootState} from 'store/reducer';
import Purchases from 'react-native-purchases';
import {Platform} from 'react-native';
import {usePurchase} from 'hooks/usePurchase';
import Apollo from 'services/utils/apollo';
import { LoggerService } from 'services/applicatif/auth/loggerService';
import { IS_PROD } from '../../../../../env';
import useStatusBar from 'hooks/useStatusBar';
import { openURL } from 'screen/Others/whoGigi';
import { useUser } from 'hooks/useUser';
import useAppNavigator from 'hooks/useAppNavigator';

export const SUB_RC_BO: {[key: string]: string} = IS_PROD? {
  'premium:premium-1-month': 'premium_1_month',
  'premium:premium-6-months': 'premium_6_months',
  'premium:premium-12-months': 'premium_12_months',
  'premium:pro12months': 'pro12months',
  premium_1_month: 'premium_1_month',
  premium_6_months: 'premium_6_months',
  premium_12_months: 'premium_12_months',
  pro12months: 'pro12months',
} : {
  'gigi_abonnements:premium1month': 'premium_1_month',
  'gigi_abonnements:premium6months': 'premium_6_months',
  'gigi_abonnements:premium12months': 'premium_12_months',
  'gigi_abonnements:pro-12-months': 'pro12months',
  premium1month: 'premium_1_month',
  premium6months: 'premium_6_months',
  premium12months: 'premium_12_months',
  pro12m: 'pro12months',
};

export const SUB_BO_RC: {[key: string]: string} = IS_PROD? {
  premium_1_month:
    Platform.select({
      ios: 'premium_1_month',
      android: 'premium:premium-1-month',
    }) || '',
  premium_6_months:
    Platform.select({
      ios: 'premium_6_months',
      android: 'premium:premium-6-months',
    }) || '',
  premium_12_months:
    Platform.select({
      ios: 'premium_12_months',
      android: 'premium:premium-12-months',
    }) || '',
  pro12months:
    Platform.select({
      ios: 'pro12months',
      android: 'premium:pro12months',
    }) || '',
} : {
  premium_1_month:
    Platform.select({
      ios: 'premium1month',
      android: 'gigi_abonnements:premium1month',
    }) || '',
  premium_6_months:
    Platform.select({
      ios: 'premium6months',
      android: 'gigi_abonnements:premium6months',
    }) || '',
  premium_12_months:
    Platform.select({
      ios: 'premium12months',
      android: 'gigi_abonnements:premium12months',
    }) || '',
  pro12months:
    Platform.select({
      ios: 'pro12m',
      android: 'gigi_abonnements:pro-12-months',
    }) || '',
};

const useSubscribeCtr = (setModal: ()=> void, afterClosedAuto?: ()=> void) => {
  useStatusBar('dark-content')
  const { carnets, hasMag, isAllRegions, isMag, isPro, fetchSubscriptions } = useUser()
  
  const [loading, setLoading] = useState(false);
  const [modalCgv, setModalCgv] = useState(false);
  const [product, setProduct] = useState<any>()

  const {offerings} = usePurchase(true);
  const {isFocused} = useAppNavigator()

  const id = useSelector(
    (state: rootState) => state.userReducer.authInfo.current_user?.uid,
  );

  const subscription = useSelector(
    (state: rootState) => state.userReducer.userInfo.subscription,
  );

  const subscriptionsBO = useSelector(
    (state: rootState) => state.appReducer.subscriptionsBO,
  );

  const {
    translation: {
      subscriptionProductsPaymentTerms,
      restorePurchase : restorePurchaseText,
    },
    /*config: {
      subcriptionProduct: {thumbnail, footerImage},
    },*/
  } = useSelector((state: rootState) => state.appReducer.membershipDatas);

  const {
    headerBg,
} = useSelector((s: rootState) => s.appReducer.whoGigiDatas.config.whoisgigi);

  const termsConditions = useSelector((s: rootState) => s.appReducer.burgerMenuDatas.translation.termsConditions);

  const {
    becomeMemberToContinueReading,
    chooseThisFormula, 
    chooseMembershipDuration,

    gigiSubscriptionsPlans,
    gigiSubscriptionsPlansDescription,

    gigisMag,
    italianNewsAndInspirations,
    inspiration,
    findTheDestinationThatSuitsYourProject,
    promoCode,
    theAddressBook,
    targetedAddressesToYourProfile,
    theInteractiveMap,
    aTravelAssistantIndicatingYourFavorites,
    subscribeToGigiMag,
    or
  } = useSelector((state: rootState) => state.appReducer.membershipDatas.translation);
  

  const {
    gigiNotebooks,
    allSecretsAddressesByDestination,
  } = useSelector((state: rootState) => state.addressReducer.addressDatas.translation);

  const purchase = async (pkg: any) => {
    try {
      setLoading(true);
      LoggerService.logger({
        user_id: id,
        action: "purchase_package",
        //current_product: currentSubUid,
        product: pkg.product?.identifier,
      })
      const {customerInfo} = await Purchases.purchasePackage(pkg);
      LoggerService.logger({
        user_id: id,
        action: "purchase_package",
        //current_product: currentSubUid,
        active_subscriptions: JSON.stringify(customerInfo.activeSubscriptions),
      })
      //console.log(JSON.stringify(customerInfo.activeSubscriptions))
      if (customerInfo.activeSubscriptions.length > 0) {
        const res = await Apollo.getSubscription(true);
        if(res) {
          setLoading(false)
          closeModal(true)
        }
      }
    } catch (e: any) {
      LoggerService.logger({
        user_id: id,
        action: "purchase_package",
        //current_product: currentSubUid,
        error: JSON.stringify(e)
      })
      setLoading(false);
    } finally {
      if (subscription) {
        setLoading(false);
      }
    }
  };

  const restorePurchase = () => {
      setLoading(true);
      LoggerService.logger({
        user_id: id,
        action: "restore_purchase",
        //current_product: currentSubUid
      });
      Purchases.restorePurchases().then(customerInfo => {
        //Alert.alert('customerInfo', JSON.stringify(customerInfo));
        if (customerInfo?.activeSubscriptions.length > 0) {
          /*if (!subscription) {
            setLoading(true);
          }*/
          Apollo.getSubscription(); // true?
        }
      }).catch((e) => {
        LoggerService.logger({
          user_id: id,
          action: "restore_purchase",
          error: JSON.stringify(e)
        })
      }).finally(() => setLoading(false));
  };

  const showCgv = () => setModalCgv(true);
  const hideCgv = () => setModalCgv(false);
  
  const closeModal = (auto?: boolean) => {
    setModal()
    if (auto && afterClosedAuto) {
        afterClosedAuto()
    }
  }

  const codeRedeem = () => {
      openURL(
        'https://apps.apple.com/redeem/?ctx=offercodes&id=1659486956'
      );
  };

  const goToDetail = (sub: any) => {
    setProduct(sub)
  }

  const closeDetail = () => {
    setProduct(undefined)
    fetchSubscriptions()
  }

  useEffect(() => {
    if(isFocused){
      fetchSubscriptions()
    }
  }, [isFocused])

  return {
    loading,
    offerings,
    restorePurchaseText,
    chooseMembershipDuration,
    chooseThisFormula,
    subscriptionProductsPaymentTerms,

    becomeMemberToContinueReading,

    gigiNotebooks,
    allSecretsAddressesByDestination,

    gigiSubscriptionsPlans,
    gigiSubscriptionsPlansDescription,

    gigisMag,
    italianNewsAndInspirations,
    inspiration,
    findTheDestinationThatSuitsYourProject,
    promoCode,
    theAddressBook,
    targetedAddressesToYourProfile,
    termsConditions,
    theInteractiveMap,
    aTravelAssistantIndicatingYourFavorites,

    headerBg,

    carnets,
    isAndroid: Platform.OS === "android",
    hasMag,
    isAllRegions,
    isMag,
    isPro,
    modalCgv,
    product,
    subscribeToGigiMag,
    or,
    subscriptionsBO,
    closeDetail,
    closeModal,
    codeRedeem,
    goToDetail,
    hideCgv,
    showCgv,
    purchase,
    restorePurchase,
  };
};

export default useSubscribeCtr;
