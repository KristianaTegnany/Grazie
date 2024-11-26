import {
  ApolloClient,
  DocumentNode,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {setAuthDatas, setNoAuthDatas} from 'store/slice/auth/authSlice';
import {IAuthDatas, INoAuthDatas} from 'store/slice/auth/type';
import store from 'store/store';
import {
  query_account,
  query_addresses_datas,
  query_articles,
  query_article_favorite,
  query_auth,
  query_bottom_nav,
  query_burger_menu,
  query_cgv,
  query_cookies,
  query_favorite,
  query_favorite_list,
  query_inspiration_datas,
  query_mag,
  query_mag_categories,
  query_map,
  query_membership_datas,
  query_no_auth,
  query_notification,
  query_travel,
  query_travel_list,
  query_who_gigi,
  query_address_favorite,
  query_search,
  query_map_favorite,
  query_map_address,
  query_shared,
  query_subscriptions,
  query_service_datas,
  query_privacy,
  query_callslots,
  query_orders,
  query_order,
  query_subscription_detail,
} from './query';
import {
  setBottomNavDatas,
  setBurgerMenuDatas,
  setCgvDatas,
  setCookiesDatas,
  setMembershipDatas,
  setNotificationDatas,
  setPrivacyDatas,
  setSharedDatas,
  setSubscriptionsBO,
  setWhoGigiDatas,
  updateIsItalian,
} from 'store/slice/app/appSlice';
import {
  IBottomNavDatas,
  IBurgerMenuDatas,
  ICgvDatas,
  ICookiesDatas,
  IMembershipDatas,
  INotificationDatas,
  IPrivacyDatas,
  ISharedDatas,
  IWhoGigiDatas,
} from 'store/slice/app/type';
import {setMagCategoriesDatas, setMagDatas} from 'store/slice/mag/magSlice';
import {ICategoriesDatas, IMagDatas} from 'store/slice/mag/type';
import {asyncStorage} from '../constants';
import SecureStorage from '@react-native-async-storage/async-storage';
import {setFavoriteDatas} from 'store/slice/favorite/favoriteSlice';
import {IFavoriteDatas} from 'store/slice/favorite/type';
import {
  logout,
  setPersoInfosDatas,
  setServiceDatas,
  setTravelDatas,
  setTravels,
  setUser,
} from 'store/slice/user/userSlice';
import UserInfo from 'services/applicatif/user/type';
import {
  query_account_subscription,
  query_countries,
  query_perso_infos,
} from './query/user';
import {ITravel, PersoInfosDatas, TravelDatas} from 'store/slice/user/type';
import {IInspirationDatas} from 'store/slice/inspiration/type';
import {setInspirationDatas} from 'store/slice/inspiration/inspirationSlice';
import {setAddressDatas} from 'store/slice/address/addressSlice';
import {IAddressDatas} from 'store/slice/address/type';
import {url} from '../url';
import {setMapDatas} from 'store/slice/map/mapSlice';
import {IMapDatas} from 'store/slice/map/type';
import dayjs from 'dayjs';
import query_maj from './query/maj';
import { RefreshService } from 'services/applicatif/auth/refreshService';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        config: {
          merge: true,
        },
        taxonomy: {
          merge: true,
        },
        translation: {
          merge: true,
        },
        TaxonomyTerm: {
          merge: true,
        },
      },
    },
  },
});

const authLink = setContext((_, {headers}) => {
  return SecureStorage.getItem(asyncStorage.app_token).then(token => {
    return {
      headers: {
        ...headers,
        ...(token ? {authorization: `Bearer ${token}`} : {}),
      },
    };
  })
});

let client = new ApolloClient({
    queryDeduplication: false,
    link: authLink.concat(
      new HttpLink({
        uri: `${url.baseUrl}${url.graphql}`,
      }),
    ),
    cache: cache,
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  });

function clearCache (){
  client.resetStore()
}
  
function changeLang(it: boolean = false) {
  client = new ApolloClient({
    queryDeduplication: false,
    link: authLink.concat(
      new HttpLink({
        uri: `${url.baseUrl}${url.graphql}${it ? '?language=it' : ''}`,
      }),
    ),
    cache: cache,
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  });
  dayjs.locale(it ? 'it' : 'fr');
  store.dispatch(updateIsItalian(it));
}

async function query(
  apollo_query: DocumentNode,
  variables?: any,
): Promise<{data?: any; error?: any} | any> {
  try {
    //console.log(print(apollo_query))
    const response = await client.query({
      query: apollo_query,
      variables,
      //notifyOnNetworkStatusChange: true,
      //returnPartialData: true,
    });

    if (response?.data && 'user' in response.data && !response.data.user) {
      return RefreshService.refreshToken().then(data => {
        if (data) {
          return query(apollo_query, variables);
        } else if(data === false) {
          store.dispatch(logout());
          return;
        }
      });
    } else {
      return response;
    }
  } catch (e: any) {

  console.log(JSON.stringify(e))
    return {error: e};
  }
}

async function getAllPreloadDatas() {
  await getMembershipDatas();
  await getSubscriptionsBO();
  await getPersoInfosDatas();

  getBottomNavDatas();
  getMagDatas();
  getMagCategoriesDatas();
  getSharedDatas();
  getBurgerMenuDatas();
  getServiceDatas();
  getInspirationDatas();
  getAddressDatas();
  getMapDatas();
  getFavoriteLists();
  getFavoriteDatas();
  getWhoGigiDatas();
  getCgvDatas();
  getPrivacyDatas();
  //getCookiesDatas();
}

async function getAuthDatas() {
  const response = await query(query_auth);
  if (response?.data) {
    store.dispatch(setAuthDatas(response.data as IAuthDatas));
  }
}

async function getNoAuthDatas() {
  const response = await query(query_no_auth);
  if (response?.data) {
    store.dispatch(setNoAuthDatas(response.data as INoAuthDatas));
  }
  else return response?.error
}

async function getSharedDatas() {
  const response = await query(query_shared);
  if (response?.data) {
    store.dispatch(setSharedDatas(response.data as ISharedDatas));
  }
}

async function getBottomNavDatas() {
  const response = await query(query_bottom_nav);
  if (response?.data) {
    store.dispatch(setBottomNavDatas(response.data as IBottomNavDatas));
  }
}

async function getArticles(category?: number, offset?: number) {
  const response = await query(query_articles, {category, offset});
  if (response?.data) {
    return response.data;
  }
  return response?.error;
}

async function getArticleFavorite(id?: string) {
  const response = await query(query_article_favorite, {id});
  if (response?.data) {
    return response.data;
  }
  return response?.error;
}

async function getAddressFavorite(id?: string) {
  const response = await query(query_address_favorite, {id});
  if (response?.data) {
    return response.data;
  }
  return response?.error;
}

async function getMagCategoriesDatas() {
  const response = await query(query_mag_categories);
  if (response?.data) {
    store.dispatch(setMagCategoriesDatas(response.data as ICategoriesDatas));
  }
}

async function getMagDatas() {
  const response = await query(query_mag);
  if (response?.data) {
    store.dispatch(setMagDatas(response.data as IMagDatas));
  }
}

async function getMapDatas() {
  const response = await query(query_map);
  if (response?.data) {
    store.dispatch(setMapDatas(response.data as IMapDatas));
  }
}

async function getBurgerMenuDatas() {
  const response = await query(query_burger_menu);
  if (response?.data) {
    store.dispatch(setBurgerMenuDatas(response.data as IBurgerMenuDatas));
  }
}

async function getFavoriteDatas() {
  const response = await query(query_favorite);
  if (response?.data) {
    store.dispatch(setFavoriteDatas(response.data as IFavoriteDatas));
  }
}

async function getFavoriteLists(offset?: number) {
  const response = await query(query_favorite_list, {offset});
  if (response?.data) {
    return response.data;
  } else {
    return response?.error;
  }
}

async function getAccount() {
  const response = await query(query_account);
  if (response?.data) {
    store.dispatch(setUser(response.data.user as UserInfo));
    return response.data.user;
  } else {
    return response?.error;
  }
}

async function getSubscription(isRecurrent: boolean = false) : Promise<boolean> {
  const response = await query(query_account_subscription);
  if (response?.data?.user && store.getState().userReducer.userInfo?.id) {
    if (
      JSON.stringify(response.data.user.subscriptions?.map((sub: any) => sub.dates.end)) !==
        JSON.stringify(store.getState().userReducer.userInfo.subscriptions?.map((sub: any) => sub.dates.end))
    ) {
      //const data  = await AuthService.refreshToken()
      //if (data) {
      const account = await getAccount()
      if(account){
        return true
      }
      //}
    } else if(isRecurrent) {
      await  new Promise(resolve => setTimeout(resolve, 3000));
      return getSubscription(isRecurrent);
    } else return false;
  }
  return false;
}

async function getPersoInfosDatas() {
  const response = await query(query_perso_infos);
  if (response?.data) {
    store.dispatch(setPersoInfosDatas(response.data as PersoInfosDatas));
  }
}

async function getCountries() {
  const response = await query(query_countries);
  if (response?.data) {
    return response.data;
  } else {
    return response?.error;
  }
}

async function getNoficationDatas() {
  const response = await query(query_notification);
  if (response?.data) {
    store.dispatch(setNotificationDatas(response.data as INotificationDatas));
  }
}

async function getWhoGigiDatas() {
  const response = await query(query_who_gigi);
  if (response?.data) {
    store.dispatch(setWhoGigiDatas(response.data as IWhoGigiDatas));
  }
}

async function getCgvDatas() {
  const response = await query(query_cgv);
  if (response?.data) {
    store.dispatch(setCgvDatas(response.data as ICgvDatas));
  }
}

async function getPrivacyDatas() {
  const response = await query(query_privacy);
  if (response?.data) {
    store.dispatch(setPrivacyDatas(response.data as IPrivacyDatas));
  }
}

async function getCookiesDatas() {
  const response = await query(query_cookies);
  if (response?.data) {
    store.dispatch(setCookiesDatas(response.data as ICookiesDatas));
  }
}

async function getInspirationDatas() {
  const response = await query(query_inspiration_datas);
  if (response?.data) {
    store.dispatch(setInspirationDatas(response.data as IInspirationDatas));
  }
}

async function getAddressDatas() {
  const response = await query(query_addresses_datas);
  if (response?.data) {
    store.dispatch(setAddressDatas(response.data as IAddressDatas));
  }
}

async function getTravelDatas() {
  const response = await query(query_travel);
  if (response?.data) {
    store.dispatch(setTravelDatas(response.data as TravelDatas));
  }
}

async function getTravels() {
  const response = await query(query_travel_list);
  if (response?.data && response.data.travels) {
    store.dispatch(
      setTravels(response.data.travels as {total: number; items: ITravel[]}),
    );
  }
}

async function getMembershipDatas() {
  const response = await query(query_membership_datas);
  if (response?.data) {
    store.dispatch(setMembershipDatas(response.data as IMembershipDatas));
  }
}

async function getSubscriptionsBO() {
  const response = await query(query_subscriptions);
  if (response?.data?.subscriptionProducts?.items) {
    store.dispatch(
      setSubscriptionsBO(response.data.subscriptionProducts.items),
    );
  }
}

async function getSubscriptionDetail(id: string) {
  const response = await query(query_subscription_detail, {id});
  if (response?.data) {
    return response.data;
  }
  return response?.error;
}

async function search(keywords: string, offset?: number) {
  const response = await query(query_search, {
    keywords,
    offset,
  });
  if (response?.data) {
    return response.data;
  } else {
    return response?.error;
  }
}

async function getMapAddress(id: string) {
  const response = await query(query_map_address, {id});
  if (response?.data) {
    return response.data;
  } else {
    return response?.error;
  }
}

async function getMapFavorites() {
  const response = await query(query_map_favorite);
  if (response?.data) {
    return response.data;
  } else {
    return response?.error;
  }
}

async function getServiceOrders() {
  const response = await query(query_orders);
  if (response?.data) {
    return response.data;
  } else {
    return response?.error;
  }
}

async function getServiceOrder(id: number) {
  const response = await query(query_order, {id});
  if (response?.data) {
    return response.data;
  } else {
    return response?.error;
  }
}

async function getServiceDatas() {
  const response = await query(query_service_datas);
  if (response?.data) {
    store.dispatch(setServiceDatas(response.data));
  }
}

async function getCallslots(from: string, to: string) {
  const response = await query(query_callslots, {
    from,
    to,
  });
  if (response?.data) {
    return response.data;
  } else {
    return response?.error;
  }
}

async function checkIfOutdated(appVersion: string, systemName: string) {
  const response = await query(query_maj, {
    appVersion,
    systemName,
  });
  if (response?.data) {
    return response.data;
  } else {
    return response?.error;
  }
}

export default {
  changeLang,
  checkIfOutdated,
  clearCache,
  getAccount,
  getAddressDatas,
  getAddressFavorite,
  getAllPreloadDatas,
  getArticleFavorite,
  getArticles,
  getAuthDatas,
  getBottomNavDatas,
  getBurgerMenuDatas,
  getCallslots,
  getCgvDatas,
  getCookiesDatas,
  getCountries,
  getFavoriteDatas,
  getFavoriteLists,
  getInspirationDatas,
  getMagCategoriesDatas,
  getMagDatas,
  getMapAddress,
  getMapDatas,
  getMapFavorites,
  getMembershipDatas,
  getNoAuthDatas,
  getNoficationDatas,
  getPersoInfosDatas,
  getPrivacyDatas,
  getServiceDatas,
  getServiceOrder,
  getServiceOrders,
  getSharedDatas,
  getSubscription,
  getSubscriptionsBO,
  getSubscriptionDetail,
  getTravelDatas,
  getTravels,
  getWhoGigiDatas,
  query,
  search,
}