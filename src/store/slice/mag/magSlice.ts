import {IArticlesDatas, ICategoriesDatas, IMagDatas} from "./type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {magInitialState} from "./initialState";

export const magSlice = createSlice({
  name: "mag",
  initialState: magInitialState,
  reducers: {
    setArticlesDatas: (state, action: PayloadAction<IArticlesDatas>) => {
      state.articlesDatas = action.payload;
    },
    setMagCategoriesDatas: (state, action: PayloadAction<ICategoriesDatas>) => {
      state.categoriesDatas = action.payload;
    },
    setMagDatas: (state, action: PayloadAction<IMagDatas>) => {
      state.magDatas = action.payload;
    },
    updateFirstCasa: state => {
      state.storiesDatas.isFirstCasa = false;
    },
    updateFirstFriend: state => {
      state.storiesDatas.isFirstFriend = false;
    },
    updateFirstPepite: state => {
      state.storiesDatas.isFirstPepite = false;
    },
    updateFirstBiblio: state => {
      state.storiesDatas.isFirstBiblio = false;
    },
  },
});

export const {
  setArticlesDatas,
  setMagCategoriesDatas,
  setMagDatas,
  updateFirstPepite,
  updateFirstFriend,
  updateFirstBiblio,
  updateFirstCasa,
} = magSlice.actions;

export default magSlice.reducer;
