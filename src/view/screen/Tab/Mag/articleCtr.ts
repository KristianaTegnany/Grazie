import useAppNavigator from 'hooks/useAppNavigator';
import { useUser } from 'hooks/useUser';
import {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import routeName from 'routes/routeName';
import Apollo from 'services/utils/apollo';
import {query_article} from 'services/utils/apollo/query';
import {rootState} from 'store/reducer';
import {IArticle} from 'store/slice/mag/type';

export default function useArticleCtr() {
  const navigator = useAppNavigator();
  const ref = useRef<ScrollView>(null);

  const { hasMag } = useUser();

  const isSubscribed = hasMag
  
  const {article: param} = navigator.getParams<{article: any}>();

  const {
    translation: {
      toContact,
      publishedOn,
      ingredients,
      inKitchen,
      italy,
      fattoMano,
      gigiGreen,
    },
  } = useSelector((state: rootState) => state.magReducer.magDatas);

  const [article, setArticle] = useState<any>();
  const [isPrivate, setIsPrivate] = useState(false);

  const refresh = async () => {
    const response = await Apollo.query(query_article, {
      id: param.id,
    });
    if (response?.error) {
      setArticle(null)
      Toast.show({text2: response.error.message, type: 'error'});
    } else if (response?.data) {
      setArticle(response.data.article);
    }
  };

  const goToArticle = (article: IArticle) => {
    navigator.navigateScreen(routeName.tab.mag.article, {
      article,
    });
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTo({y: 0, animated: true});
      }
    }, 500);
  };

  useEffect(() => {
    if(article){
      setIsPrivate(article.isPublic != true && !isSubscribed);
    }
  }, [article, isSubscribed])

  useEffect(() => {
    refresh();
  }, [param?.id]);

  return {
    fattoMano: fattoMano.toUpperCase(),
    gigiGreen: gigiGreen.toUpperCase(),
    ingredients,
    inKitchen,
    isPrivate,
    isSubscribed,
    italy,
    param,
    article,
    publishedOn,
    ref,
    toContact,
    goToArticle,
    refresh,
  };
}
