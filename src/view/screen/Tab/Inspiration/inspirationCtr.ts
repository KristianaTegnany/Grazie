import useAppNavigator from 'hooks/useAppNavigator';
import routeName from 'routes/routeName';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from 'store/reducer';
import {updateFirstInspiration} from 'store/slice/inspiration/inspirationSlice';
import {useState} from 'react';
import Apollo from 'services/utils/apollo';
import {query_inspiration_by_region} from 'services/utils/apollo/query';
import Toast from 'react-native-toast-message';
import { useUser } from 'hooks/useUser';

export default function useInspirationCtr() {
  const navigator = useAppNavigator();
  const dispatch = useDispatch();
  const {isPro} = useUser();

  const {
    inspirationDatas: {
      translation: {
        forPros,
        inspiration,
        byRegion,
        bySeason,
        byDesire,
        byLengthOfStay,
      },
      config: {
        inspiration: {
          headerBg,
          headerDescription,
          inspirationTutoImg,
          inspirationTutoDescription,
          inspirationTutoBtn,
        },
      },
      taxonomy: {regions, seasons, inspirationPro, desires, durations},
    },
    isFirstInspiration,
  } = useSelector((state: rootState) => state.inspirationReducer);

  const [loadingRegion, setLoadingRegion] = useState(false);
  
  const navigateToDetail = (index: number, id: string) => {
    navigator.navigateScreen(routeName.tab.inspiration.detail, {
      index,
      id: parseInt(id),
    });
  }

  const navigateToDestination = (detail: any) => {
    setLoadingRegion(true);
    Apollo.query(query_inspiration_by_region, {
      regions: [parseInt(detail.id)],
    })
      .then(response => {
        if (response.error) {
          Toast.show({text2: response.error.message, type: 'error'});
        } else if (response.data?.inspirations?.items) {
          if (response.data.inspirations.items.length === 1) {
            navigator.navigateScreen(routeName.tab.inspiration.destination, {
              detail: response.data.inspirations.items[0],
            });
          } else {
            navigateToDetail(3, detail.id);
          }
        }
      })
      .finally(() => setLoadingRegion(false));
  };

  const closeTuto = () => {
    dispatch(updateFirstInspiration());
  };

  return {
    inspiration,
    byRegion,
    bySeason,
    byDesire,
    byLengthOfStay,
    forPros,
    headerBg,
    headerDescription,
    inspirationTutoImg,
    inspirationTutoDescription,
    inspirationTutoBtn,
    isFirstInspiration,
    isPro,
    regions,
    loadingRegion,
    seasons,
    inspirationPro,
    desires: desires.filter(desire => !desire.isPro),
    durations,

    closeTuto,
    navigateToDestination,
    navigateToDetail,
  };
}
