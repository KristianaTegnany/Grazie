import {IMapDatas} from "./type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {mapInitialState} from "./initialState";

export const mapSlice = createSlice({
  name: "map",
  initialState: mapInitialState,
  reducers: {
    setMapDatas: (state, action: PayloadAction<IMapDatas>) => {
      state.mapDatas = action.payload;
    },
    updateFirstMap: state => {
      state.isFirstMap = false;
    },
  },
});

export const {setMapDatas, updateFirstMap} = mapSlice.actions;

export default mapSlice.reducer;
