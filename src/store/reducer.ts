import authReducer from "./slice/auth/authSlice";
import userReducer from "./slice/user/userSlice";
import appReducer from "./slice/app/appSlice";
import magReducer from "./slice/mag/magSlice";
import mapReducer from "./slice/map/mapSlice";
import chatReducer from "./slice/chat/chatSlice";
import favoriteReducer from "./slice/favorite/favoriteSlice";
import inspirationReducer from "./slice/inspiration/inspirationSlice";
import addressReducer from "./slice/address/addressSlice";

import {combineReducers} from "redux";

import AuthStateType from "./slice/auth/type";
import UserStateType from "./slice/user/type";
import AppStateType from "./slice/app/type";
import MagStateType from "./slice/mag/type";
import MapStateType from "./slice/map/type";
import ChatStateType from "./slice/chat/type";
import FavoriteStateType from "./slice/favorite/type";
import InspirationStateType from "./slice/inspiration/type";
import AddressStateType from "./slice/address/type";

const appReducers = combineReducers({
  log: _ => {
    return {};
  },
  authReducer,
  userReducer,
  appReducer,
  magReducer,
  mapReducer,
  chatReducer,
  favoriteReducer,
  inspirationReducer,
  addressReducer,
});

export type rootState = {
  authReducer: AuthStateType;
  userReducer: UserStateType;
  appReducer: AppStateType;
  magReducer: MagStateType;
  mapReducer: MapStateType;
  chatReducer: ChatStateType;
  favoriteReducer: FavoriteStateType;
  inspirationReducer: InspirationStateType;
  addressReducer: AddressStateType;
};

export default appReducers;
