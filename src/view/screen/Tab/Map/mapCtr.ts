import useAppNavigator from 'hooks/useAppNavigator';
import {useEffect, useRef, useState} from 'react';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import routeName from 'routes/routeName';
import {rootState} from 'store/reducer';
import {updateFirstMap} from 'store/slice/map/mapSlice';
import {IGroupItem} from '../widget/TabFilter';
import {Platform} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {MapService} from 'services/applicatif/map/mapService';
import {IMapPoint} from 'services/applicatif/map/type';
import Apollo from 'services/utils/apollo';
import {parse} from 'graphql';
import useStatusBar from 'hooks/useStatusBar';
import { useUser } from 'hooks/useUser';

let watchId: number, lastPositionUpdate: number;

export default function useMapCtr() {
  useStatusBar('dark-content');
  const {allowedRegions, isAllRegions, isMap } = useUser();
      
  const navigator = useAppNavigator();
  const dispatch = useDispatch();
  const camera = useRef<any>(null); // CameraRef?
  const map = useRef<any>(null);

  const {
    mapDatas: {
      config: {
        map: {thumbnail, textHtml},
      },
      translation: {
        myMapTutoTitle,
        myMapTutoButtonLabel,
        filters,
        filterFavorites,
        filterAdressCategories,
        filterSuggestions,
      },
    },
    isFirstMap,
  } = useSelector((state: rootState) => state.mapReducer);

  const {regions, adresscategories} = useSelector(
    (state: rootState) => state.addressReducer.addressDatas.taxonomy,
  );

  const {items: travels} = useSelector(
    (state: rootState) => state.userReducer.travels,
  );

  const isAndroid = Platform.OS === 'android';
  const [loading, setLoading] = useState(false);
  const [isGranted, setIsGranted] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [points, setPoints] = useState<IMapPoint[]>([]);
  const [pointsImmutable, setPointsImmutable] = useState<IMapPoint[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<string | undefined>();
  const [showFilter, setShowFilter] = useState(false);
  const [userLocation, setUserLocation] = useState<
    {lat: number; long: number} | undefined
  >();

  const [filterDatas, setFilterDatas] = useState<IGroupItem[]>([
    {title: filterSuggestions, items: [], isSelected: false},
    {title: filterFavorites, items: [], isSelected: false},
    {title: filterAdressCategories, items: adresscategories},
  ]);

  const [privateModal, setPrivateModal] = useState(false);
  
  useEffect(() => {
    if(navigator.isFocused && !isFirstMap){
      if(!isMap){
        setPrivateModal(true);
      }
      else setPrivateModal(false);
    }
  }, [navigator.isFocused, isMap, isFirstMap])

  useEffect(() => {
    async function refresh() {
      if (filterDatas.length > 0) {
        const checkedCategory = filterDatas[2].items
          .filter(item => item.checked)
          .map(item => parseInt(item.id));
        const isSuggestion = filterDatas[0].isSelected;
        const isFavorite = filterDatas[1].isSelected;

        let newPoints: IMapPoint[] =
          checkedCategory.length > 0
            ? pointsImmutable.filter(point =>
                checkedCategory.includes(parseInt(point.categoryId)),
              )
            : pointsImmutable;

        if (isFavorite || isSuggestion) {
          const suggestions = isSuggestion ? await getSuggestions() : [];
          const favoritesIds = isFavorite ? favorites : [];

          newPoints = newPoints
            .filter(point =>
              [...suggestions, ...favoritesIds].includes(point.id),
            )
            .map(point => {
              return favoritesIds.includes(point.id)
                ? {...point, isFavorite: true}
                : {...point, isSuggestion: true};
            });
        }
        setPoints(newPoints);
      }
    }
    if(isMap){
      refresh();
    }
  }, [isMap, pointsImmutable, filterDatas, favorites /*, userLocation*/]);

  const closeFilter = () => setShowFilter(false);
  const openFilter = () => setShowFilter(true);

  const openTravel = () =>
    navigator.navigateScreen(routeName.user.base, {
      screen: routeName.user.travel.home,
    });

  const closeTuto = () => {
    dispatch(updateFirstMap());
  };

  const navigateToMag = () => {
    navigator.navigateScreen(routeName.tab.mag.home);
  };

  const dismissPrivateModal = (auto?: boolean) => {
    setPrivateModal(false);
    if(!auto)
    navigateToMag();
  }

  const navigateToAddress = (detail: any) => {
    navigator.navigateScreen(routeName.tab.address.card, {detail});
  };

  const onMarkerPress = (id: string) => {
    resetSelectedMarker();
    setTimeout(() => setSelectedMarker(id), 100);
  };

  const resetSelectedMarker = () => {
    if (selectedMarker) {
      setSelectedMarker(undefined);
    }
  };

  async function hasLocationPermission() {
    if (!isAndroid || (Platform.OS === 'android' && Platform.Version < 23)) {
      return true;
    }
    let res = false;
    try {
      res = await MapboxGL.requestAndroidLocationPermissions();
    } catch (e) {}
    return res;
  }

  const updateUserLocation = (
    location: MapboxGL.Location | Geolocation.GeoPosition,
  ) => {
    if ( location.coords.latitude && location.coords.longitude  && (
      !lastPositionUpdate ||
      new Date().getTime() - lastPositionUpdate >= 3000)
    ) {
      setUserLocation({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      });
      lastPositionUpdate = new Date().getTime();
    }
  };

  const getSuggestions = async () => {
    if (regions?.length > 0) {
      let q = '{';
      for (let i = 0; i < regions.length; i++) {
        q += `address${i}: addresses(regions:[${regions[i].id}], isFavorite:false, onlyTopScore: true, limit: 40){
          items{
            id
          }
        }`;
      }
      q += '}';
      const query = parse(q);
      const response = await Apollo.query(query);

      if (response?.data) {
        const res = Object.keys(response.data)
          .map(key => {
            return response.data[key].items?.map(
              (item: {id: string}) => item.id,
            );
          })
          .flat(1);
        return res;
      }
    }
    return [];
  };

  const refreshFavorites = () => {
    Apollo.getMapFavorites().then(res => {
      if (res.favorites?.items?.length !== favorites.length) {
        setFavorites(res.favorites.items.map((item: {id: string}) => item.id));
      }
    });
  };

  useEffect(() => {
    if (navigator.isFocused) {
      if(isMap){
        Apollo.getTravelDatas();
        refreshFavorites();
      }
    }
  }, [navigator.isFocused, isMap]);

  useEffect(() => {
    setLoading(true);
    if(isMap){
      MapService.getPoints().then(res => {
        if (res.success) {
          const items = res.items.filter(item => parseFloat(item.longitude) && parseFloat(item.latitude))
          setPointsImmutable(items);
          //setPoints(items);
        } else {
          Toast.show({text2: res.message, type: 'error'});
        }
      }).finally(function() {
        setLoading(false);
      })
    }
    return () => Geolocation.clearWatch(watchId);
  }, [isMap]);


  useEffect(() => {
    if (isAndroid) {
      watchId = Geolocation.watchPosition(
        position => updateUserLocation(position),
        _ => {
        },
        {
          accuracy: {android: 'high'},
          enableHighAccuracy: true,
          forceRequestLocation: true,
          interval: 3000,
          distanceFilter: 100,
        },
      );
    }
  }, []);

  useEffect(() => {
    if (!isFirstMap && isMap) {
      hasLocationPermission().then(granted => setIsGranted(granted));
    }
  }, [isFirstMap, isMap]);

  return {
    thumbnail,
    textHtml,
    myMapTutoTitle,
    myMapTutoButtonLabel,
    filters,

    adresscategories,
    allowedRegions,
    camera,
    filterDatas,
    isAllRegions,
    isAndroid,
    isFirstMap,
    isGranted,
    map,
    noTravel: travels.length === 0,
    points,
    selectedMarker,
    userLocation,
    
    closeFilter,
    closeTuto,
    loading,
    privateModal,
    dismissPrivateModal,
    navigateToAddress,
    onMarkerPress,
    openFilter,
    openTravel,
    refreshFavorites,
    resetSelectedMarker,
    setFilterDatas,
    showFilter,
    updateUserLocation,
  };
}
