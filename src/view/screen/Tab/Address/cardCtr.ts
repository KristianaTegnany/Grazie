import useAppNavigator from 'hooks/useAppNavigator';
import {useEffect, useRef, useState} from 'react';
import Apollo from 'services/utils/apollo';
import Toast from 'react-native-toast-message';
import {query_addresses_card} from 'services/utils/apollo/query';
import routeName from 'routes/routeName';
import {ScrollView} from 'react-native';
import { useUser } from 'hooks/useUser';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';

export default function useCardCtr() {
  const { isPro } = useUser();
  const navigator = useAppNavigator();
  const ref = useRef<ScrollView>(null);

  const params = navigator.getParams<{detail: any}>();
  const appParams: any = useSelector((state: rootState) => state.appReducer.params);
  const {
    details,
      addressesSuggestionsTitle,
      addressesSuggestionsSubTitle,
  } = useSelector((state: rootState) => state.addressReducer.addressDatas.translation);

  const detail = params?.detail || appParams?.detail
  const [card, setCard] = useState<any>();
  
  const refresh = async () => {
    if(detail.content){
      setCard(detail)
    }
    else {
      const response = await Apollo.query(query_addresses_card, {
        id: typeof detail.id === 'string'? parseInt(detail.id) : detail.id,
      });
      if (response?.error) {
        Toast.show({text2: response.error.message, type: 'error'});
      } else if (response?.data?.address) {
        setCard(response.data.address);
      } else {
        setCard(null);
      }
    }
  };

  const navigateToAddress = (item: any) => {
    navigator.navigateScreen(routeName.tab.address.card, {
      detail: item,
    });
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTo({y: 0, animated: true});
      }
    }, 500);
  };

  const favoriteCallback = () => {
    refresh();
  };

  useEffect(() => {
    refresh();
  }, [detail?.id]);


  return {
    card,
    detail,
    isPro,
    isReadOnly: !params?.detail,
    ref,
    details,
    addressesSuggestionsTitle,
    addressesSuggestionsSubTitle,

    favoriteCallback,
    navigateToAddress,
  };
}
