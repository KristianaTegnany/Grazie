import useAppNavigator from 'hooks/useAppNavigator';
import useStatusBar from 'hooks/useStatusBar';
import { useUser } from 'hooks/useUser';
import {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import routeName from 'routes/routeName';
import Apollo from 'services/utils/apollo';
import {query_favorite_detail} from 'services/utils/apollo/query/favorite';
import {IArticle} from 'store/slice/mag/type';

export default function useDetailCtr() {
  useStatusBar('dark-content');
  const navigator = useAppNavigator();
  const  { allowedRegions, hasPro } = useUser();

  const {list: param} = navigator.getParams<{list: any}>();

  const [cards, setCards] = useState<any[]>([]);
  const [canFetchMore, setCanFetchMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const goBack = () => {
    navigator.goBack();
  };

  const refresh = async (hasOffset?: boolean) => {
    if (hasOffset) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    const response = await Apollo.query(query_favorite_detail, {
      id: param.id,
      offset: hasOffset ? cards.length || 0 : 0,
    });
    if (response?.error) {
      Toast.show({text2: response.error.message, type: 'error'});
    } else if (response?.data?.favorites) {
      if (response.data.favorites.items) {
        if (
          parseInt(response.data.favorites.total) ===
          cards.length + response.data.favorites.items.length
        ) {
          setCanFetchMore(false);
        }
        const newCards = hasOffset
          ? [...cards, ...response.data.favorites.items]
          : response.data.favorites.items;
        setCards(newCards);
      }
    }
    if (hasOffset) {
      setLoadingMore(false);
    } else {
      setLoading(false);
    }
  };

  const fetchMoreDetails = async () => {
    if (!loading && !loadingMore && canFetchMore) {
      refresh(true);
    }
  };

  useEffect(() => {
    refresh();
  }, [param]);

  const goToFicheArticle = (article: IArticle) => {
    navigator.navigateScreen(
      article.type === 'fiche_destination'
        ? routeName.tab.inspiration.destination
        : article.type === 'fiche_partenaires'
        ? routeName.tab.address.card
        : routeName.tab.mag.article,
      {
        article,
        detail: article,
      },
    );
  };

  return {
    allowedRegions,
    hasPro,
    cards,
    loading,
    loadingMore,
    param,
    fetchMoreDetails,
    goBack,
    goToFicheArticle,
    refresh,
  };
}
