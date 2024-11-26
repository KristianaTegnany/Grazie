import useAppNavigator from 'hooks/useAppNavigator';
import routeName from 'routes/routeName';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from 'store/reducer';
import {updateFirstAddress} from 'store/slice/address/addressSlice';
import { useUser } from 'hooks/useUser';
import Carousel from 'widget/Carousel/SnapCarousel';

export default function useAddressCtr() {
  const navigator = useAppNavigator();
  const dispatch = useDispatch();
  
  const { carnets, fetchSubscriptions, isAllRegions, subscriptions } = useUser()
    const { isFocused } = useAppNavigator()

    const [product, setProduct] = useState<any>()
    const [step, setStep] = useState(0)

    let _carousel = useRef<Carousel>(null);

  const {
    translation: {
      addressesTutoTitle,
      addressesTutoButtonLabel,

      myNotebooks,
      noNotebookLabel,
      noNotebookDescription,
      gigiNotebooks,
      allSecretsAddressesByDestination,
      exploreYourDestinationNotebooks
    },
    config: {
      address: {tutoImage, tutoDescription},
    },
  } = useSelector((state: rootState) => state.addressReducer.addressDatas);

  const { theNotebookOf } = useSelector((state: rootState) => state.appReducer.membershipDatas.translation);
    
  const subscriptionsBO = useSelector(
    (state: rootState) => state.appReducer.subscriptionsBO,
  );

  const isFirstAddress = useSelector(
    (state: rootState) => state.addressReducer.isFirstAddress,
  );

  const closeTuto = () => {
    dispatch(updateFirstAddress());
  };

  const navigateToDetail = (regionId: string, title: string, explore: string, filterAllUri: string) => {
    navigator.navigateScreen(routeName.tab.address.detail, {
      id: regionId,
      title,
      explore,
      filterAllUri,
    });
  }

  const goToDetail = (sub: any) => {
    setProduct(sub)
  }


  const closeDetail = () => {
    fetchSubscriptions()
    setProduct(undefined)
}

useEffect(() => {
    if (isFocused) {
        fetchSubscriptions()
    }
}, [isFocused])

  return {
    _carousel, addressesTutoButtonLabel, addressesTutoTitle,
    myNotebooks,
    noNotebookLabel,
    noNotebookDescription,
    gigiNotebooks,
    allSecretsAddressesByDestination,
    exploreYourDestinationNotebooks,
    theNotebookOf,

    carnets,
    isAllRegions,

    product, isFirstAddress, step, subscriptions, subscriptionsBO, tutoDescription, tutoImage, closeDetail, closeTuto, goToDetail, navigateToDetail, setStep
  };
}
