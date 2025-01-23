import useAppNavigator from 'hooks/useAppNavigator';
import {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {rootState} from 'store/reducer';
import Apollo from 'services/utils/apollo';
import Toast from 'react-native-toast-message';
import {FlatList as RNFlatList} from 'react-native';
import {query_inspiration_detail} from 'services/utils/apollo/query';
import {IGroupItem} from '../widget/TabFilter';

export default function useDetailCtr() {
  const navigator = useAppNavigator();
  const param = navigator.getParams<{id: number; index: number}>();

  const filterRef = useRef<RNFlatList>(null);

  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [details, setDetails] = useState<any>();
  const [error, setError] = useState(false);

  const closeFilter = () => setShowFilter(false);
  const openFilter = () => setShowFilter(true);

  const {
    translation: {
      forPros,
      filterSeason,
      filterRegion,
      filterDesires,
      filterDuration,
    },
    taxonomy: {regions, seasons, inspirationPro, desires, durations},
  } = useSelector(
    (state: rootState) => state.inspirationReducer.inspirationDatas,
  );

  const roles = useSelector(
    (state: rootState) => state.userReducer.userInfo.roles,
  );

  const isPro =
    roles?.length > 1 &&
    roles.filter(role => role.id.includes('pro')).length > 0;

  const [filterDatas, setFilterDatas] = useState<IGroupItem[]>([]);

  const refresh = async (
    regions?: number[],
    seasons?: number[],
    desires?: number[],
    durations?: number[],
    showLoading?: boolean,
  ) => {

    console.log('refresh')
    setError(false);
    if (showLoading) {
      setLoading(true);
    }

    const response = await Apollo.query(query_inspiration_detail, {
      regions,
      inspirations: isPro ? desires : [],
      seasons,
      desires: isPro ? [] : desires,
      durations,
    });
    if (response.error) {
      setError(true);
      Toast.show({text2: response.error.message, type: 'error'});
    } else if (response.data?.inspirations?.items) {
      setDetails(response.data.inspirations.items);
    }
    setLoading(false);
  };

  const favoriteCallback = (id: string) => {
    const newDetails = details;
    const index = newDetails.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      newDetails[index] = {
        ...newDetails[index],
        isFavorite: !newDetails[index].isFavorite,
      };
      setDetails(Object.assign([], newDetails));
    }
  };

  useEffect(() => {
    refresh(
      param.index === 3 ? [param.id] : [],
      param.index === 0 ? [param.id] : [],
      param.index === 1 ? [param.id] : [],
      param.index === 2 ? [param.id] : [],
      true,
    );
    setFilterDatas(
      (isPro
        ? [
            {title: filterRegion, items: regions},
            {title: filterSeason, items: seasons},
            {title: forPros, items: inspirationPro},
            {title: filterDuration, items: durations},
          ]
        : [
            {title: filterSeason, items: seasons},
            {
              title: filterDesires,
              items: desires.filter(desire => !desire.isPro),
            },
            {title: filterDuration, items: durations},
          ]
      ).map((data, i) => {
        return i ===
          (param.index === 3 ? 0 : isPro ? param.index + 1 : param.index)
          ? {
              ...data,
              items: data.items.map(item => {
                return {
                  ...item,
                  checked: parseInt(item.id) === param.id,
                };
              }),
            }
          : data;
      }),
    );
    setTimeout(() => {
      filterRef.current?.scrollToIndex({
        index: param.index === 3 ? 0 : isPro ? param.index + 1 : param.index,
        animated: true,
      });
    }, 500);
  }, [param]);

  useEffect(() => {
    if (filterDatas.length > 0) {
      refresh(
        param.index === 3? [param.index] : (isPro
          ? filterDatas[0].items
              .filter(item => item.checked)
              .map(item => parseInt(item.id))
          : []),
        filterDatas[isPro ? 1 : 0].items
          .filter(item => item.checked)
          .map(item => parseInt(item.id)),
        filterDatas[isPro ? 2 : 1].items
          .filter(item => item.checked)
          .map(item => parseInt(item.id)),
        filterDatas[isPro ? 3 : 2].items
          .filter(item => item.checked)
          .map(item => parseInt(item.id)),
        true,
      );
    }
  }, [filterDatas.length]);

  useEffect(() => {
    if (navigator.isFocused && filterDatas.length > 0) {
      refresh(
        param.index === 3? [param.index] : (isPro
          ? filterDatas[0].items
              .filter(item => item.checked)
              .map(item => parseInt(item.id))
          : []),
        filterDatas[isPro ? 1 : 0].items
          .filter(item => item.checked)
          .map(item => parseInt(item.id)),
        filterDatas[isPro ? 2 : 1].items
          .filter(item => item.checked)
          .map(item => parseInt(item.id)),
        filterDatas[isPro ? 3 : 2].items
          .filter(item => item.checked)
          .map(item => parseInt(item.id)),
      );
    }
  }, [navigator.isFocused]);

  return {
    details,
    error,
    filterDatas,
    filterRef,
    loading,
    showFilter,

    closeFilter,
    favoriteCallback,
    openFilter,
    setFilterDatas,
  };
}
