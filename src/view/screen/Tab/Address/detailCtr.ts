import useAppNavigator from 'hooks/useAppNavigator';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {rootState} from 'store/reducer';
import Apollo from 'services/utils/apollo';
import Toast from 'react-native-toast-message';
import {query_addresses_detail} from 'services/utils/apollo/query';
import {IGroupItem} from '../widget/TabFilter';
import routeName from 'routes/routeName';

export default function useDetailCtr() {
  const navigator = useAppNavigator();

  const param = navigator.getParams<{
    id: string;
    explore: string;
    title: string;
    filterAllUri: string;
  }>();

  const [lastVisitedId, setLastVisitedId] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [canFetchMore, setCanFetchMore] = useState(true);

  const [showFilter, setShowFilter] = useState(false);
  const [details, setDetails] = useState<any>();
  const [category, setCategory] = useState(0);
  const [selectedPartner, setSelectedPartner] = useState('');

  const closeFilter = () => setShowFilter(false);
  const openFilter = () => setShowFilter(true);

  const updateSelectedPartner = (partner: string) => {
    if (selectedPartner !== partner) {
      setSelectedPartner(partner);
    } else {
      setSelectedPartner('');
    }
  };

  const {
    translation: {addressesListTitle, filter, filterDesires, filterSeason,},
    taxonomy: {adresscategories, seasons, desires},
  } = useSelector((state: rootState) => state.addressReducer.addressDatas);


  const [filterDatas, setFilterDatas] = useState<IGroupItem[]>(
    [
      {
        title: filterDesires,
        items: desires,
      },
      {title: filterSeason, items: seasons},
    ]
  );

  const goToCard = (item: any) => {
    navigator.navigateScreen(routeName.tab.address.card, {
      detail: item,
    });
    setLastVisitedId(item.id);
  };

  const refresh = async (offset?: number, showLoading?: boolean) => {
    if (showLoading) {
      setLoading(true);
    } else if (offset) {
      setLoadingMore(true);
    }

    const response = await Apollo.query(query_addresses_detail, {
      regions: [parseInt(param.id)],
      desires: filterDatas[0].items
        .filter(item => item.checked)
        .map(item => parseInt(item.id)),
      seasons: filterDatas[1].items
        .filter(item => item.checked)
        .map(item => parseInt(item.id)),
      categories: category === 0 ? [] : [category],
      offset,
      partnerTypes: selectedPartner ? [parseInt(selectedPartner)] : [],
    });
    
    if (response?.error) {
      Toast.show({text2: response.error.message, type: 'error'});
    } else if (response?.data?.addresses?.items) {
      const newLength = offset
          ? details.length + response.data.addresses.items.length
          : response.data.addresses.items.length,
        total = parseInt(response.data.addresses.total);
      if (!offset && !canFetchMore) {
        setCanFetchMore(total > newLength);
      } else if (canFetchMore && total === newLength) {
        setCanFetchMore(false);
      }

      if (
        canFetchMore &&
        details &&
        parseInt(response.data.addresses.total) ===
          details.length + response.data.addresses.items.length
      ) {
        setCanFetchMore(false);
      }

      setDetails(
        offset
          ? [...details, ...response.data.addresses.items]
          : response.data.addresses.items,
      );
    }
    setLoading(false);
    setLoadingMore(false);
  };

  const getLastVisited = async () => {
    if (lastVisitedId) {
      const res = await Apollo.getAddressFavorite(lastVisitedId);
      if (res?.address) {
        updateCardFavorite(lastVisitedId, res.address.isFavorite);
      }
    }
  };

  const updateCardFavorite = (id: string, isFavorite?: boolean) => {
    const newDetails = details;
    const index = newDetails.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      newDetails[index] = {
        ...newDetails[index],
        isFavorite:
          isFavorite === undefined ? !newDetails[index].isFavorite : isFavorite,
      };
      setDetails(Object.assign([], newDetails));
    }
  };

  const fetchMoreDetails = async () => {
    if (!loading && !loadingMore && canFetchMore) {
      refresh((details || []).length);
    }
  };

  useEffect(() => {
    if (navigator.isFocused) {
      getLastVisited();
    }
  }, [navigator.isFocused]);

  useEffect(() => {
    if (selectedPartner) {
      setSelectedPartner('');
    }
  }, [category]);

  useEffect(() => {
    if (filterDatas.length > 0) {
      refresh(undefined, true);
    }
  }, [filterDatas, category, selectedPartner]);

  return {
    addressesListTitle,
    category,
    details,
    filterDatas,
    loading,
    loadingMore,
    partnerTypes: adresscategories?.filter(
      categ => parseInt(categ.id) === category,
    )[0]?.partnerTypes,
    selectedPartner,
    showFilter,
    title: param.title,
    explore: param.explore,
    filter,
    filterAllUri: param.filterAllUri,

    closeFilter,
    fetchMoreDetails,
    goToCard,
    openFilter,
    setCategory,
    setFilterDatas,
    updateCardFavorite,
    updateSelectedPartner,
  };
}
