import useAppNavigator from 'hooks/useAppNavigator';
import routeName from 'routes/routeName';
import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {rootState} from 'store/reducer';
import {IArticle} from 'store/slice/mag/type';
import Apollo from 'services/utils/apollo';
import { useUser } from 'hooks/useUser';
import Toast from 'react-native-toast-message';
import useStatusBar from 'hooks/useStatusBar';

export default function useMagCtr() {
  useStatusBar('dark-content')
  const navigator = useAppNavigator();
  const {hasMag} = useUser();
  
  const {
    magDatas: {
      translation: {theMag, italy},
      config: {
        mag: {
          articlesTitle,
          headerBg,
          headerDescription,
          gigiGreenTitle,
          gigiGreenDescription,
          fattoManoTitle,
          fattoManoDescription,
        },
      },
    },
  } = useSelector((state: rootState) => state.magReducer);

  const [privateModal, setPrivateModal] = useState(false);
  const [lastVisitedId, setLastVisitedId] = useState('');
  const [category, setCategory] = useState(0);
  const [datas, setDatas] = useState<{
    articles: IArticle[];
    loading: boolean;
    loadingMore: boolean;
  }>({
    articles: [],
    loading: true,
    loadingMore: false,
  });
  const [canFetchMore, setCanFetchMore] = useState(true);

  const goToArticle = (article: IArticle) => {
    navigator.navigateScreen(routeName.tab.mag.article, {
      article,
    });
    setLastVisitedId(article.id);
  };

  const getLastVisited = useCallback(async () => {
    if (lastVisitedId && datas.articles?.find(article => article.id === lastVisitedId)?.isFavorite == false) {
      const res = await Apollo.getArticleFavorite(lastVisitedId);
      if (res?.article?.isFavorite == true) {
        updateArticleFavorite(lastVisitedId, true);
        setLastVisitedId('');
      }
    }
  }, [lastVisitedId]);

  const updateArticlesFavorite = () => {
    datas.articles?.filter(article => article.isFavorite).map( async (article) => {
      const res = await Apollo.getArticleFavorite(article.id);
      if (res?.article?.isFavorite == false) {
        updateArticleFavorite(article.id, false);
      }
    })
  }

  const updateArticleFavorite = (id: string, isFavorite?: boolean) => {
    const newArticles = datas.articles;
    const index = newArticles.findIndex(item => item.id === id);
    if (index !== -1) {
      newArticles[index] = {
        ...newArticles[index],
        isFavorite:
          isFavorite === undefined
            ? !newArticles[index].isFavorite
            : isFavorite,
      };
      setDatas(datas => {
        return {...datas, articles: newArticles};
      });
    }
  };

  const fetchArticles = async (hasOffset: boolean, isSilent: boolean = false) => {
    if(!isSilent && datas.articles.length === 0)
    setDatas(datas => ({
        ...datas,
        loading: datas.loading || !hasOffset,
        loadingMore: hasOffset,
      }));

    const res = await Apollo.getArticles(
      category,
      hasOffset ? datas.articles.length : undefined,
    );
    if(res?.message){
      if(!isSilent && datas.articles.length === 0)
      setDatas(datas => ({
        ...datas,
        loading: false,
        loadingMore: false,
      }))
      Toast.show({text2: res.message, type: 'error'})
    }
    else if (res?.articles?.items) {
      const newLength = hasOffset
          ? datas.articles.length + res.articles.items.length
          : res.articles.items.length,
        total = parseInt(res.articles.total);
      if (!hasOffset && !canFetchMore) {
        setCanFetchMore(total > newLength);
      } else if (canFetchMore && total === newLength) {
        setCanFetchMore(false);
      }
      const newArticles: IArticle[] = hasOffset
        ? [...datas.articles, ...res.articles.items]
        : res.articles.items;
      setDatas({loading: false, loadingMore: false, articles: newArticles});
    }
    else if(!isSilent && datas.articles.length === 0)
      setDatas(datas => ({...datas, loading: false, loadingMore: false}))
  };

  const fetchMoreArticles = () => {
    if (!datas.loading && !datas.loadingMore && canFetchMore) {
      fetchArticles(true);
    }
  };

  useEffect(() => {
    fetchArticles(false)
  }, [category])

  useEffect(() => {
    fetchArticles(datas.articles.length > 0)
  }, [])

  useEffect(() => {
    if (navigator.isFocused) {
      fetchArticles(datas.articles.length > 0)
      getLastVisited();
      updateArticlesFavorite();
    }
  }, [navigator.isFocused, getLastVisited]);

  const closePrivateModal = () => setPrivateModal(false)
  const openPrivateModal = () => setPrivateModal(true)

  return {
    articlesTitle,
    theMag,
    headerBg,
    headerDescription,
    datas,
    gigiGreenTitle,
    gigiGreenDescription,
    fattoManoTitle,
    fattoManoDescription,
    italy,

    category,
    isSubscribed: hasMag,
    privateModal,
    closePrivateModal,
    fetchMoreArticles,
    goToArticle,
    openPrivateModal,
    setCategory,
    updateArticleFavorite,
  };
}
