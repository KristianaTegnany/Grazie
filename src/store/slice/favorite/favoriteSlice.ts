import {IFavoriteDatas, IFavoriteList} from "./type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {favoriteInitialState} from "./initialState";

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: favoriteInitialState,
  reducers: {
    setFavoriteDatas: (state, action: PayloadAction<IFavoriteDatas>) => {
      state.favoriteDatas = action.payload;
    },
    setFavoriteLists: (state, action: PayloadAction<IFavoriteList>) => {
      state.favoritesLists = action.payload;
    },
    updateFirstFavorite: state => {
      state.isFirstFavorite = false;
    },
  },
});

export const {setFavoriteDatas, setFavoriteLists, updateFirstFavorite} =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
